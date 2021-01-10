import { resolve, join } from "path";
import express, { Request, Response } from "express";
import compression from "compression";
import gzipStatic from "connect-gzip-static";
import morgan from "morgan";

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

function renderComponent(name: string, getProps?: (req: Request) => unknown) {
  const serverRender = require(`./${name}/server`).default;
  return (req: Request, res: Response) => {
    const props = getProps ? getProps(req) : { url: "test" };
    res.setHeader("Cache-Control", `public, max-age=${year}`);
    res.render(name, {
      props,
      preloadedHTML: serverRender(props),
      title: "Notes",
    });
  };
}

app.get(
  "/notes",
  renderComponent("notes", ({ url, baseUrl, rawHeaders }) => ({
    title: "from server",
    url: [],
  }))
);

app.get(
  "/users",
  renderComponent("users", ({ rawHeaders }) => ({
    title: "Users from server",
    url: [],
  }))
);

app.listen(PORT, () => {
  console.log(`server listening at localhost:${PORT}`);
  console.log(`public path ${publicPath}`);
});
