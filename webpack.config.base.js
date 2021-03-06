const { resolve, join } = require("path");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const moduleNames = require("./moduleNames");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

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
    chunkFilename: "public/chunks/[name]_[fullhash].js",
  },
  optimization: {
    emitOnErrors: false,
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
      { test: /\.ejs$/, loader: "ejs-webpack-loader" },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  plugins: [
    ...moduleNames.map(
      ({ name, template }) =>
        new HTMLWebpackPlugin({
          template: `${template}`,
          filename: join("templates", `${name}.ejs`),
          chunks: [name],
          base: "/public",
        })
    ),
    new FaviconsWebpackPlugin({
      logo: resolve(__dirname, "favicon.svg"),
      outputPath: "public/favicons",
      devMode: "webapp", // optional can be 'webapp' or 'light' - 'light' by default
      cache: true,
      publicPath: "/public/",
      prefix: "favicons",
    }),
    new webpack.BannerPlugin({ banner: "this is a random banner" }),
    new CompressionPlugin({
      include: /public/,
      exclude: /\.png$/,
    }),
    new ForkTsCheckerWebpackPlugin(),
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
          filename: join(name, "server_[fullhash].js"),
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
    path: join(outputFolderPath, "server"),
    filename: "index.js",
    chunkFilename: "chunks/[name]_[fullhash].js",
  },
  optimization: {
    emitOnErrors: false,
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
  externals: [require("webpack-node-externals")()],
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new webpack.BannerPlugin({ banner: "this is a random banner" }),
  ],
};

module.exports = [clientConfig, serverConfig];
