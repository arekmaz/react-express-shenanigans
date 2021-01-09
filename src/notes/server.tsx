import { renderToString } from "react-dom/server";
import Component, { ComponentProps } from "../Component";

export default (props: ComponentProps) => {
  return renderToString(<Component {...props} />);
};
