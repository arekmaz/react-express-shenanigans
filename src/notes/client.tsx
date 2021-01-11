import { BrowserRouter as Router } from "react-router-dom";
import { hydrate } from "react-dom";
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
  <Router>
    <Notes {...initialProps} />
  </Router>,
  // document.querySelector("[data-reactroot]")
  document.querySelector("#root")
);
