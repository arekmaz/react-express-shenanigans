import { lazy } from "react";
import { Switch, Route, Link } from "react-router-dom";
import LazyRoute from "../LazyRoute";
import { NotesProvider } from "./NotesContext";

const LazyNote = () => {
  console.log({ target1: globalThis.TARGET });
  return globalThis.TARGET === "browser"
    ? lazy(() => import("./Note"))
    : require("./Note").default;
};

export type Note = Record<"name" | "id" | "url", string>;

export type NotesProps = {
  notes?: Note[];
};
const defaultNotes = [];

export default function Notes({ notes = defaultNotes }: NotesProps) {
  return (
    <NotesProvider notes={notes}>
      <Switch>
        <Route exact path="/notes">
          <ul>
            {notes.map(({ id, name, url }) => (
              <li key={id}>
                <Link to={`/notes/${id}`}>{name}</Link>
              </li>
            ))}
          </ul>
          <Link to={"notes/1"}>One note page</Link>
          <button onClick={() => alert("test")}>test</button>
        </Route>
        <LazyRoute path="/notes/:noteId">
          <LazyNote />
        </LazyRoute>
        {/* <Route path="/notes/:noteId">
        {({
          match: {
            params: { noteId },
          },
        }) => {
          return (
            <div>
              <h1>
                {notes.find(({ id }) => String(id) === noteId)?.name ??
                  "Not found"}
              </h1>
              <Link to="/notes">All Notes</Link>
            </div>
          );
        }}
      </Route> */}
      </Switch>
    </NotesProvider>
  );
}
