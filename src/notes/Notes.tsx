export type Note = Record<"name" | "id" | "url", string>;
export type NotesProps = {
  notes?: Note[];
};
const defaultNotes = [];

export default function Notes({ notes = defaultNotes }: NotesProps) {
  return (
    <>
      <ul>
        {notes.map(({ id, name, url }) => (
          <li key={id}>
            <a href={url} target="_blank">
              {name}
            </a>
          </li>
        ))}
      </ul>
      <button onClick={() => alert("test")}>test</button>
    </>
  );
}
