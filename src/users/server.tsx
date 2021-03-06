import Component, { ComponentProps } from "../Component";
import { Request } from "express";

export default (req: Request) => {
  const props: ComponentProps = {
    title: "title prop",
    url: req.rawHeaders,
  };

  return { props, element: <Component {...props} />, title: "Users" };
};
