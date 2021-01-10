const { resolve, join } = require("path");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const moduleNames = require("./moduleNames");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const outputFolderPath = resolve(__dirname, "build");

/** @type {import('webpack').Configuration} */
const clientConfig = {
  context: __dirname,
  entry: {
    ...moduleNames.reduce((entries, { name, root }) => {
      return {
        ...entries,
        [name]: {
          import: resolve(root, "client.tsx"),
          filename: join("public", name, "index_[fullhash].js"),
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
            // comments: false,
          },
        },
      }),
    ],
    splitChunks: {
      cacheGroups: {
        commons: {
          name: "public/chunks",
          chunks: "all",
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
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
          filename: join("templates", `${name}.ejs`),
          chunks: [name],
          base: "/public",
        })
    ),
    new ForkTsCheckerWebpackPlugin(),
    new webpack.BannerPlugin({ banner: "this is a random banner" }),
  ],
};

/** @type {import('webpack').Configuration} */
const serverConfig = {
  target: "node",
  node: {
    __dirname: false,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  entry: {
    server: "./src/server.ts",
    ...moduleNames.reduce((entries, { name, root }) => {
      return {
        ...entries,
        [name]: {
          import: resolve(root, "server.tsx"),
          filename: join(name, "server.js"),
        },
      };
    }, {}),
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
    ],
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
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new webpack.BannerPlugin({ banner: "this is a random banner" }),
  ],
};

module.exports = [clientConfig, serverConfig];
