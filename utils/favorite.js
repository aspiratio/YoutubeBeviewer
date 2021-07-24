// fsはファイルを扱うためのモジュール
const fs = require("fs");

const FAVORITE_IDS_FILE = "./favoriteIds.json";

// お気に入りリストの読み込み
module.exports.readFavoriteIds = () =>
  new Promise((resolve, reject) => {
    // fs.readFile(ファイル名, 文字コード, (err, data) => {
    // ファイルの読み込みが終わったら以下の処理が実行される
    // errにはファイル読み込み時のエラーオブジェクト（エラーがなければ値なし）
    // dataにはファイル読み込み結果(文字列)
    // });
    fs.readFile(FAVORITE_IDS_FILE, "utf-8", (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      // JSON.parse()メソッド 文字列をJSONとして解析してJavaScriptで配列にしてから返す
      resolve(data ? JSON.parse(data) : []);
    });
  });

// お気に入りリストへの書き込み
module.exports.writeFavoriteIds = (favoriteIds) =>
  new Promise((resolve, reject) => {
    // fs.writeFile(ファイル名, 書き込む文字列, (err) => {
    // ファイルの読み込みが終わったら以下の処理が実行される
    // errにはファイル読み込み時のエラーオブジェクト（エラーがなければ値なし）
    // });
    // JSON.stringify()メソッド JavaScriptをJSON文字列に変換
    fs.writeFile(FAVORITE_IDS_FILE, JSON.stringify(favoriteIds), (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
