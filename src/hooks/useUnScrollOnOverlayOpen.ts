import { useEffect } from "react";

const useUnScrollOnOverlayOpen = (open: boolean) => {
  useEffect(() => {
    const body = document.body;
    if (open) {
      body.style.height = "100vh";
      body.style.overflowY = "hidden";
    } else {
      const scrollY = body.style.top;
      body.style.height = "";
      body.style.overflowY = "";
      body.style.position = "";
      body.style.top = "";
      body.style.height = "";
      body.style.overflowY = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }
  }, [open]);
};

export { useUnScrollOnOverlayOpen };
