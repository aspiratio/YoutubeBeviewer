import { useEffect } from "react";

export default (onScrollEnd) => {
  useEffect(() => {
    let cleanup;
    if (!onScrollEnd) {
      return cleanup;
    }
    // スクロール時のイベントハンドラ
    const scrollHandler = ({ target: { scrollingElement } }) => {
      // 一番下までスクロールされたかどうか判定し、一番下までスクロールされたらonScrollEndを呼び出す
      const { scrollTop, scrollHeight, clientHeight } = scrollingElement;
      if (scrollTop < scrollHeight - clientHeight) {
        // スクロールした位置が一番下でない場合は何もしない
        return;
      }
      // onScrollEnd呼び出し
      onScrollEnd();
    };
    // イベントハンドラの設定
    window.document.addEventListener("scroll", scrollHandler);
    // コンポーネントのアンマウント時に設定したイベントハンドラを削除する
    cleanup = () => {
      window.document.removeEventListener("scroll", scrollHandler);
    };
    return cleanup;
  }, [onScrollEnd]);
};
