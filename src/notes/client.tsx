import { hydrate, render } from "react-dom";
import Notes, { NotesProps } from "./Notes";

declare global {
  interface Window {
    __initialProps: unknown;
  }
}

const initialProps = window.__initialProps as NotesProps;
console.log({ initialProps });

// render(<Notes {...initialProps} />, document.getElementById("root"));
hydrate(
  <Notes {...initialProps} />,
  // document.querySelector("[data-reactroot]")
  document.querySelector("#root")
);
