import React from "react";
import { clsxm } from "@/lib/utils";

type HeadingProps = {
  children: React.ReactNode;
};

type H1Props = HeadingProps & React.ComponentProps<"h1">;

export const H1: React.FC<H1Props> = ({ children, className, ...rest }) => {
  return (
    <h1
      className={clsxm(
        "scroll-m-20 text-4xl font-bold tracking-tight text-black lg:text-5xl",
        className
      )}
      {...rest}
    >
      {children}
    </h1>
  );
};

type H2Props = HeadingProps & React.ComponentProps<"h2">;

export const H2: React.FC<H2Props> = ({ children, className, ...rest }) => {
  return (
    <h2
      className={clsxm(
        "scroll-m-20 pb-2 text-3xl font-bold tracking-tight text-black transition-colors first:mt-0",
        className
      )}
      {...rest}
    >
      {children}
    </h2>
  );
};

type H3Props = HeadingProps & React.ComponentProps<"h3">;

export const H3: React.FC<H3Props> = ({ children, className }) => {
  return (
    <h3
      className={clsxm("text-3xl font-bold text-black md:text-4xl", className)}
    >
      {children}
    </h3>
  );
};

type H4Props = HeadingProps & React.ComponentProps<"h4">;

export const H4: React.FC<H4Props> = ({ children, className, ...rest }) => {
  return (
    <h4
      className={clsxm("text-2xl font-bold text-black md:text-3xl", className)}
      {...rest}
    >
      {children}
    </h4>
  );
};

type H5Props = HeadingProps & React.ComponentProps<"h5">;

export const H5: React.FC<H5Props> = ({ children, className, ...rest }) => {
  return (
    <h5
      className={clsxm("text-xl font-bold text-black md:text-2xl", className)}
      {...rest}
    >
      {children}
    </h5>
  );
};

type H6Props = HeadingProps & React.ComponentProps<"h6">;

export const H6: React.FC<H6Props> = ({ children, className, ...rest }) => {
  return (
    <h6
      className={clsxm("text-lg font-bold text-black md:text-xl", className)}
      {...rest}
    >
      {children}
    </h6>
  );
};
