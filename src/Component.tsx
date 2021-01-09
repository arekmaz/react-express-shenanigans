export type ComponentProps = { title: string; url: string[] };

export default function Component({ title, url }: ComponentProps) {
  return (
    <>
      <button onClick={() => alert(title)}>{title}</button>
      <ul>
        {url.map((header) => (
          <li key={header}>{header}</li>
        ))}
      </ul>
    </>
  );
}
