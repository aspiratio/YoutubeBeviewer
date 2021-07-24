import React, { createContext, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import reducer from "./reducer";

// React Contextの作成
const FavoriteContext = createContext();

const initialState = {
  favoriteIds: [],
};

// コンテキストプロバイダーコンポーネント
export const FavoriteProvider = ({ api, children }) => {
  // useReducerでreducer関数(第1引数)と初期値(第2引数)をセット、返り値はstateとdispatch
  const [state, dispatch] = useReducer(reducer, { ids: [] });
  const value = { state, dispatch };
  // useEffectを使ってコンポーネント描画時にお気に入りリストを取得
  // 取得した後にdispatchを使って初期化するアクション 取得したお気に入りリストを初期値として設定
  useEffect(() => {
    api.get().then(({ data }) => {
      dispatch({ type: "init", ids: data });
    });
  }, []);
  return (
    // コンテキストプロバイダーとしてuseReducerのstateとdispatchをコンテキストに設定
    // value={state, dispatch}
    <FavoriteContext.Provider value={value}>
      {children}
    </FavoriteContext.Provider>
  );
};

FavoriteProvider.propTypes = {
  children: PropTypes.node.isRequired,
  api: PropTypes.shape({
    get: PropTypes.func,
  }),
};

FavoriteProvider.defaultProps = {
  api: {
    get: () => axios.get("/api/favorites"),
  },
};

export default FavoriteContext;
