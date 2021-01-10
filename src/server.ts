import { resolve, join } from "path";
import express, { Request, Response } from "express";

const app = express();
const publicPath = resolve(__dirname, "public");

app.set("view engine", "ejs");
app.set("views", join(__dirname, "templates"));
app.engine("ejs", require("ejs").__express);

app.use("/public", express.static(publicPath));

const { PORT = 5000 } = process.env;

function renderComponent(name: string, getProps?: (req: Request) => unknown) {
  const serverRender = require(`./${name}/server`).default;
  return (req: Request, res: Response) => {
    const props = getProps ? getProps(req) : { url: req.url };
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
    url: rawHeaders,
  }))
);

app.get(
  "/users",
  renderComponent("users", ({ rawHeaders }) => ({
    title: "Users from server",
    url: rawHeaders,
  }))
);

app.listen(PORT, () => {
  console.log(`server listening at localhost:${PORT}`);
  console.log(`public path ${publicPath}`);
});
