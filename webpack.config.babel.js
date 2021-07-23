import path from "path";
import { IgnorePlugin } from "webpack";

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
    // momentパッケージには世界中のタイムゾーンに合わせたロケール（日付や時刻の表記方法）情報が含まれる
    // デフォルトのロケールさえあればいいので、容量が大きくならないようにするため
    // momentの中のlocales以下のモジュールをビルド時に含めないようにする
    plugins: [new IgnorePlugin(/^\.\/locale$/, /dayjs$/)],
  };
};
