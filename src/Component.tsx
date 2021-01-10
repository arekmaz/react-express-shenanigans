import { useEffect, useState } from "react";

export type ComponentProps = { title: string; url: string[] };

export default function Component({ title, url }: ComponentProps) {
  const [label, setLabel] = useState("default label");
  useEffect(() => {
    import("./AsyncComp").then(({ label }) => setLabel(label));
  }, []);

  return (
    <>
      <button onClick={() => alert(title)}>{title}</button>
      <h1>Dynamic label: {label}</h1>
      <ul>
        {url.map((header) => (
          <li key={header}>{header}</li>
        ))}
      </ul>
    </>
  );
}
