import { useEffect, useState } from "react";
import { isBrowser } from "@/lib/utils";

type Subscriber = () => void;

const subscribers = new Set<Subscriber>();

type ResponsiveConfig = Record<string, number>;
type ResponsiveInfo = Record<string, boolean>;

let info: ResponsiveInfo;

let responsiveConfig: ResponsiveConfig = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536
};

const handleResize = () => {
  const oldInfo = info;
  calculate();
  if (oldInfo === info) return;
  for (const subscriber of subscribers) {
    subscriber();
  }
};

let listening = false;

const calculate = () => {
  const width = window.innerWidth;
  const newInfo = {} as ResponsiveInfo;
  let shouldUpdate = false;
  for (const key of Object.keys(responsiveConfig)) {
    newInfo[key] = width >= responsiveConfig[key];
    if (newInfo[key] !== info[key]) {
      shouldUpdate = true;
    }
  }
  if (shouldUpdate) {
    info = newInfo;
  }
};

export const configResponsive = (config: ResponsiveConfig) => {
  responsiveConfig = config;
  if (info) calculate();
};

const useResponsive = () => {
  if (isBrowser && !listening) {
    info = {};
    calculate();
    window.addEventListener("resize", handleResize);
    listening = true;
  }
  const [state, setState] = useState<ResponsiveInfo>(info);

  useEffect(() => {
    if (!isBrowser) return;

    if (!listening) {
      window.addEventListener("resize", handleResize);
    }

    const subscriber = () => {
      setState(info);
    };

    subscribers.add(subscriber);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        window.removeEventListener("resize", handleResize);
        listening = false;
      }
    };
  }, []);

  return state;
};

export { useResponsive };
