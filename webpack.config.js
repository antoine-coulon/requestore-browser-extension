const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ScriptExtPlugin = require("script-ext-html-webpack-plugin");
const { AngularCompilerPlugin } = require("@ngtools/webpack");

module.exports = {
  entry: "./src/main.ts",
  module: {
    rules: [
      { test: /\.ts$/, loader: "@ngtools/webpack" },
      { test: /\.html$/, loader: "html-loader" },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    filename: "angular.js",
    path: __dirname + "/dist",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + "/src/index.html",
      output: __dirname + "/dist",
      inject: "head",
    }),
    new ScriptExtPlugin({
      defaultAttribute: "defer",
    }),
    new AngularCompilerPlugin({
      tsConfigPath: "./tsconfig.json",
      entryModule: "./src/app/app.module#AppModule",
      sourceMap: true,
    }),
    new CopyWebpackPlugin(
      {
        patterns: [
          { from: 'devtools/devtools.html' },
          { from: 'devtools/devtools.js' },
          { from: 'manifest.json' }
        ]
      }
    )
  ],
  devServer: {
    contentBase: path.join(__dirname, "public"),
    port: 9000,
  },
};
