const webpack = require("webpack");
const { resolve, join } = require('path');
const rootPath = join(__dirname, '../')

const vendors = [
  "react",
  "react-dom",
  "mobx",
  "mobx-react",
  "react-router",
  "antd",
  "lodash",
];

module.exports = {
  entry: {
    "lib": vendors
  },
  output: {
    filename: '[name].js',
    path: resolve(rootPath, 'src'),
    library: "[name]"
  },
  plugins: [
    new webpack.DllPlugin({
      path: join(__dirname, "manifest.json"), // path是manifest文件的输出路径
      name: "[name]",
      context: __dirname
    }),

    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true
      }
    })
  ]
};