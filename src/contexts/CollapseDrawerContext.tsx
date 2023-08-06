import { createContext, useState, useEffect } from "react";
import { useResponsive } from "@/hooks";

const initialState = {
  isCollapse: false,
  collapseClick: false,
  collapseHover: false,
  onToggleCollapse: () => {},
  onHoverEnter: () => {},
  onHoverLeave: () => {}
};

const CollapseDrawerContext = createContext(initialState);

interface ICollapseDrawerProviderProps {
  children: React.ReactNode;
}

const CollapseDrawerProvider = ({ children }: ICollapseDrawerProviderProps) => {
  const responsiveConfig = useResponsive();

  const isDesktop =
    responsiveConfig.lg === true || responsiveConfig.xl === true;

  const [collapse, setCollapse] = useState({
    click: false,
    hover: false
  });

  useEffect(() => {
    if (!isDesktop) {
      setCollapse({
        click: false,
        hover: false
      });
    }
  }, [isDesktop]);

  const handleToggleCollapse = () => {
    setCollapse({ ...collapse, click: !collapse.click });
  };

  const handleHoverEnter = () => {
    if (collapse.click) {
      setCollapse({ ...collapse, hover: true });
    }
  };

  const handleHoverLeave = () => {
    setCollapse({ ...collapse, hover: false });
  };

  return (
    <CollapseDrawerContext.Provider
      value={{
        isCollapse: collapse.click && !collapse.hover,
        collapseClick: collapse.click,
        collapseHover: collapse.hover,
        onToggleCollapse: handleToggleCollapse,
        onHoverEnter: handleHoverEnter,
        onHoverLeave: handleHoverLeave
      }}
    >
      {children}
    </CollapseDrawerContext.Provider>
  );
};

export { CollapseDrawerProvider, CollapseDrawerContext };
