import { useEffect, useState } from "react";

export type ComponentProps = { title: string; url: string[] };

export default function Component({ title, url }: ComponentProps) {
  const [label, setLabel] = useState("default label");
  useEffect(() => {
    import(/* webpackPrefetch: true */ "./AsyncComp").then(({ label }) =>
      setLabel(label)
    );
  }, []);

  return (
    <>
      <button onClick={() => alert(title)}>{title}</button>
      <h1>Dynamic label: {label}</h1>
      <h1>Headers sent: {url.length}</h1>
    </>
  );
}
