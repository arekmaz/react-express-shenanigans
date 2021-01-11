declare module "connect-gzip-static" {
  function gzipStatic(path: string, options: unknown) {
    return () => {};
  }
  export default gzipStatic;
}

declare var TARGET: "browser" | "node";

// file must be a module
export {};
