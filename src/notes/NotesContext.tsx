import { createContext, ReactNode, useContext } from "react";

const NotesContext = createContext(null);

export const NotesProvider = ({
  notes,
  children,
}: {
  notes: unknown;
  children: ReactNode;
}) => {
  return (
    <NotesContext.Provider value={notes}>{children}</NotesContext.Provider>
  );
};

export const useNotes = () => useContext(NotesContext);
