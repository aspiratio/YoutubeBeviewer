import webpack from "webpack";
import path from "path";

export default (env, args) => {
  const isProduction = args.mode === "production";
  const devtool = !isProduction && "inline-source-map";
  const rules = [
    {
      test: /\.jsx?$/,
      use: ["babel-loader"],
    },
  ];

  return {
    devtool,
    entry: "./src/entries/app.jsx",
    output: {
      path: path.join(__dirname, "./public/js/"),
      filename: "app.js",
    },
    module: { rules },
    resolve: {
      modules: ["node_modules"],
      // 絶対パスの./src/を省略するための記述
      alias: {
        "~": path.join(__dirname, "./src/"),
      },
      extensions: [".js", ".jsx"],
    },
  };
};
