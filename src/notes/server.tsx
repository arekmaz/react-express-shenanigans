import Notes, { Note, NotesProps } from "./Notes";
import axios from "axios";
import { Request } from "express";
import { StaticRouter } from "react-router-dom";

export default async (req: Request) => {
  try {
    const { query: { user = "arekmaz" } = {} } = req;

    const repos = (
      await axios.get<Note[]>(
        `https://api.github.com/users/${user ?? "arekmaz"}/repos`
      )
    ).data;

    const props: NotesProps = {
      notes: repos,
    };

    return {
      element: (
        <StaticRouter location={req.path}>
          <Notes {...props} />
        </StaticRouter>
      ),
      props,
      title: "Notes",
    };
  } catch (e) {
    console.error(e);
    throw e;
  }
};
