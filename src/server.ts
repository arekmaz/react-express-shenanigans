import { resolve, join } from "path";
import express from "express";

const app = express();
const publicPath = resolve(__dirname, "public");

app.set("view engine", "ejs");
app.set("views", join(__dirname, "public"));
app.engine("ejs", require("ejs").__express); //<-- this

app.use("/public", express.static(publicPath));

const { PORT = 5000 } = process.env;

app.get("/notes", (req, res) => {
  res.render("notes", {
    preloadedHTML: "<strong>test html</strong>",
    title: "Notes",
  });
});

app.listen(PORT, () => {
  console.log(`server listening at localhost:${PORT}`);
  console.log(`public path ${publicPath}`);
});
