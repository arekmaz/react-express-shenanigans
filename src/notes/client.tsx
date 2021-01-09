import { hydrate } from "react-dom";
import Component, { ComponentProps } from "../Component";

declare global {
  interface Window {
    __initialProps: unknown;
  }
}

const initialProps = window.__initialProps as ComponentProps;
console.log({ initialProps });

hydrate(<Component {...initialProps} />, document.getElementById("root"));
