const webpack = require("webpack");
const path = require("path");
const ManifestPlugin = require("webpack-manifest-plugin");
const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");
const merge = require("webpack-merge");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const common = {
  entry: [
    "react-hot-loader/patch",
    "webpack-dev-server/client?http://localhost:3001",
    "webpack/hot/only-dev-server",
    path.resolve(__dirname, "client", "index.jsx")
  ],
  resolve: {
    modules: [path.resolve(__dirname, "node_modules")],
    extensions: ["*", ".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, "public"),
    publicPath: "/",
    filename: "bundle.js"
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: "development"
      }
    })
  ]
};

let config;

switch (process.env.NODE_ENV) {
  case "production":
    config = merge(
      common,
      { devtool: "source-map" },
      {
        plugins: [
          new ManifestPlugin({
            fileName: "asset-manifest.json" // Not to confuse with manifest.json
          }),
          new SWPrecacheWebpackPlugin({
            // By default, a cache-busting query parameter is appended to requests
            // used to populate the caches, to ensure the responses are fresh.
            // If a URL is already hashed by Webpack, then there is no concern
            // about it being stale, and the cache-busting can be skipped.
            dontCacheBustUrlsMatching: /\.\w{8}\./,
            filename: "service-worker.js",
            logger(message) {
              if (message.indexOf("Total precache size is") === 0) {
                // This message occurs for every build and is a bit too noisy.
                return;
              }
              console.log(message);
            },
            minify: true, // minify and uglify the script
            navigateFallback: "/index.html",
            staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/]
          }),
          new CopyWebpackPlugin([
            { from: "manifest.json" } // define the path of the files to be copied
          ])
        ]
      }
    );
    break;
  case "development":
    config = merge(
      common,
      { devtool: "eval-source-map" },
      {
        devServer: {
          port: 3001,
          contentBase: path.resolve(__dirname, "public"),
          hot: true,
          historyApiFallback: true
        }
      }
    );
    break;
}

module.exports = config;
