import React from "react";
import { MemoryRouter } from "react-router";
import { addDecorator } from "@storybook/react";

import { action } from "@storybook/addon-actions";
import { FavoriteProvider } from "../src/contexts/FavoriteContext";

import GlobalStyle from "../src/style/GlobalStyle";

// addDecoratorは各storyを描画する関数を受け取る関数
addDecorator((storyFn) => (
  // MemoryRouterはURLパスを使用せずにメモリ上で画面遷移状態を管理する(アドレスバーを書き換えない)
  <MemoryRouter initialEntries={["/", "posts"]}>{storyFn()}</MemoryRouter>
));

const mockApi = {
  get: async () => {
    // モック実装
    action("api.get")();
    return { data: [] };
  },
};

addDecorator((storyFn) => (
  <FavoriteProvider api={mockApi}>{storyFn()}</FavoriteProvider>
));

addDecorator((storyFn) => (
  <>
    <GlobalStyle />
    {storyFn()}
  </>
));
