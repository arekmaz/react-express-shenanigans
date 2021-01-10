import Notes, { Note, NotesProps } from "./Notes";
import axios from "axios";
import { Request } from "express";

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

    return { element: <Notes {...props} />, props };
  } catch (e) {
    return { element: <div>Server Error</div> };
  }
};
