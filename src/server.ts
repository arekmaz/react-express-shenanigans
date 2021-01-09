import { resolve, join } from "path";
import express from "express";

const app = express();
const publicPath = resolve(__dirname, "public");

app.set("view engine", "ejs");
app.set("views", join(__dirname, "templates"));
app.engine("ejs", require("ejs").__express); //<-- this

app.use("/public", express.static(publicPath));

const { PORT = 5000 } = process.env;

app.get("/notes", (req, res) => {
  res.render("notes", {
    preloadedHTML: "<strong>test html</strong>",
    title: "Notes",
  });
});

app.get("/users", (req, res) => {
  res.render("users", {
    preloadedHTML: "<strong>test html</strong>",
    title: "Users",
  });
});

app.listen(PORT, () => {
  console.log(`server listening at localhost:${PORT}`);
  console.log(`public path ${publicPath}`);
});
