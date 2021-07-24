// reducerは今のデータ状態とaction(アクション)を受け取って状態を更新する役割を持つ
// 具体的には、現在の状態を表すオブジェクトであるstateを第1引数に受け取り、
// アプリケーションで発生した事象を表すオブジェクトであるactionを第2引数として受け取り、
// 返り値に次の新しい状態を表すオブジェクトを返す関数として作成する

export default (state, action) => {
  switch (action.type) {
    // お気に入りリストの初期化
    case "init": {
      const { ids } = action;
      // actionに渡されたidsで初期化する
      // また、initialized:trueを設定して初期化されたことを設定しておく
      return { ids, initialized: true };
    }
    // お気に入りリストへの追加
    case "add": {
      // actionに渡された動画IDを追加する
      const { ids } = state;
      const { id } = action;
      const index = ids.indexOf(id);
      if (index !== -1) {
        // 既に存在するidならstateを変更しない
        // reducerはstateを更新しない場合、return; やreturn nullではなく今のstateを返す必要あり
        return state;
      }
      ids.push(id);
      return { ...state, ids };
    }
    // お気に入りリストから削除
    case "remove": {
      // actionに渡された動画IDを削除する
      const { ids } = state;
      const { id } = action;
      const index = ids.indexOf(id);
      if (index === -1) {
        // 存在しないidならstateを変更しない
        return state;
      }
      ids.splice(index, 1);
      return { ...state, ids };
    }
    // 想定していないaction.typeが来たときは、エラーを投げるようにする
    default:
      throw new Error(`${action.type} is not defined.`);
  }
};
