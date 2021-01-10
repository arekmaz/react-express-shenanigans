import { resolve, join } from "path";
import express, { Request, Response } from "express";
import compression from "compression";
import gzipStatic from "connect-gzip-static";
import morgan from "morgan";
import { renderToString } from "react-dom/server";

const app = express();
const publicPath = resolve(__dirname, "..", "public");

app.use(morgan(process.env.NODE_ENV === "production" ? "tiny" : "dev"));

app.set("view engine", "ejs");
app.set("views", join(__dirname, "..", "templates"));
app.engine("ejs", require("ejs").__express);
const year = 31536000 * 1000;

app.use(
  "/public",
  gzipStatic(publicPath, {
    maxAge: year,
  })
);

app.use(compression());

const { PORT = 5000 } = process.env;

function renderComponent(name: string) {
  const serverRender = require(`./${name}/server`).default;
  return async (req: Request, res: Response) => {
    res.setHeader("Cache-Control", `public, max-age=${year}`);
    const { props = {}, element = "div" } = await serverRender(req);
    res.render(name, {
      props,
      preloadedHTML: renderToString(element),
      title: "Notes",
    });
  };
}

app.get("/notes", renderComponent("notes"));

app.get("/users", renderComponent("users"));

app.listen(PORT, () => {
  console.log(`server listening at localhost:${PORT}`);
  console.log(`public path ${publicPath}`);
});
