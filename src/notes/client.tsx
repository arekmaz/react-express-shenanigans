import { hydrate } from "react-dom";
import { renderToString } from "react-dom/server";
import Notes, { NotesProps } from "./Notes";

declare global {
  interface Window {
    __initialProps: unknown;
  }
}

const initialProps = window.__initialProps as NotesProps;

// render(<Notes {...initialProps} />, document.getElementById("root"));
hydrate(
  <Notes {...initialProps} />,
  // document.querySelector("[data-reactroot]")
  document.querySelector("#root")
);
