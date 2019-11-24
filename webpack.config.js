const path = require("path")
const site = require("./scripts/site")

module.exports = {
  entry: {
    main: "./theme/js/main.ts",
    bootstrap: "./theme/js/bootstrap.ts",
    sw: "./theme/js/sw.ts",
    "blog-index": "./theme/js/blog-index.ts"
  },
  output: {
    filename: "[name].js",
    publicPath: `${site.url.path}/assets/scripts/`
  },
  resolve: {
    alias: {
      _style: path.resolve(__dirname, "theme/styl/"),
      "_style-lazy": path.resolve(__dirname, "theme/styl/lazy/")
    },
    extensions: [".ts", ".tsx", ".js"],
    modules: ["node_modules"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          // appendTsSuffixTo: [/\.s[ac]ss$/]
        }
      }
    ]
  },
  mode: "production"
}
