const path = require("path")

const site = require("./scripts/site")

module.exports = {
  entry: {
    main: "./theme/js/main.ts",
    bootstrap: "./theme/js/bootstrap.ts",
    sw: "./theme/js/sw.ts"
  },
  output: {
    filename: "[name].js",
    publicPath: `${site.url.path}/assets/scripts/`
  },
  resolve: {
    alias: {
      "*lazy-style": path.resolve(__dirname, "theme/styl/lazy")
    },
    extensions: [".ts", ".tsx", ".js", ".sass", ".scss"],
    modules: ["node_modules"]
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          { loader: "style-loader", options: { injectType: "lazyStyleTag" } },
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          appendTsSuffixTo: [/\.s[ac]ss$/]
        }
      }
    ]
  },
  mode: "production"
}
