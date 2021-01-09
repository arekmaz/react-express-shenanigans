module.exports = (arg1, { mode = "production" }) => {
  if (mode === "development") {
    return require("./webpack.config.dev");
  }
  return require("./webpack.config.prod");
};
