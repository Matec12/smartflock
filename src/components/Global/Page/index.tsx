import { Helmet } from "react-helmet-async";
import React from "react";

type PageProps = {
  children: React.ReactNode;
  title: string;
};

const Page = ({ children, title }: PageProps) => (
  <>
    <Helmet>
      <title>{`SMARTFLOCK | ${title}`}</title>
    </Helmet>
    {children}
  </>
);

export { Page };
