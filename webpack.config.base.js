const { resolve, join } = require("path");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const moduleNames = require("./moduleNames");

const outputFolderPath = resolve(__dirname, "build");

/** @type {import('webpack').Configuration} */
const clientConfig = {
  context: __dirname,
  entry: {
    ...moduleNames.reduce((entries, { name, entry }) => {
      return {
        ...entries,
        [name]: {
          import: entry,
          filename: join("public", name, "index.js"),
        },
      };
    }, {}),
  },
  output: {
    path: outputFolderPath,
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          format: {
            comments: false,
          },
        },
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  plugins: [
    ...moduleNames.map(
      ({ name, template }) =>
        new HTMLWebpackPlugin({
          template: `!!raw-loader!${template}`,
          filename: join("public", name, "index.ejs"),
          chunks: [name],
          base: ".",
        })
    ),
  ],
};

/** @type {import('webpack').Configuration} */
const serverConfig = {
  target: "node",
  node: {
    __dirname: false,
  },
  entry: {
    server: "./src/server.ts",
  },
  output: {
    path: outputFolderPath,
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          format: {
            comments: false,
          },
        },
      }),
    ],
  },
};

module.exports = [clientConfig, serverConfig];
