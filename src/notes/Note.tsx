import { Link } from "react-router-dom";
import { useNotes } from "./NotesContext";

export default function Note(props) {
  const {
    match: {
      params: { noteId },
    },
  } = props;
  const notes = useNotes();

  return (
    <div>
      {/* <h1>{notes.find(({ id }) => String(id) === noteId)?.name}</h1> */}
      {/* <pre>{JSON.stringify(props, null, "  ")}</pre> */}
      {/* <Link to="/notes">Back to notes</Link> */}
    </div>
  );
}
