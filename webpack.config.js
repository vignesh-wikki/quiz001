const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: "./server.js",
  target: "node",
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "server.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  mode: "production",
};
