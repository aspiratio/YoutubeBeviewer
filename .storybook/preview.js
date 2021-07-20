import React from "react";
import { MemoryRouter } from "react-router";
import { addDecorator } from "@storybook/react";
import GlobalStyle from "../src/style/GlobalStyle";

// addDecoratorは各storyを描画する関数を受け取る関数
addDecorator((storyFn) => (
  // MemoryRouterはURLパスを使用せずにメモリ上で画面遷移状態を管理する(アドレスバーを書き換えない)
  <MemoryRouter initialEntries={["/", "posts"]}>{storyFn()}</MemoryRouter>
));

addDecorator((storyFn) => (
  <>
    <GlobalStyle />
    {storyFn()}
  </>
));
