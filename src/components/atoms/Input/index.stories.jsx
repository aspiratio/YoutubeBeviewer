import React from "react";
// onChangeのように何かアクションを起こすものの動作確認に使う
import { actions } from "@storybook/addon-actions";
import Input from ".";

export default { title: "atoms/Input" };

const props = {
  placeholder: "入力してください",
  // ...actions("onChange")はpropsのonChangeに動作確認のためのアクションを設定している
  ...actions("onChange"),
};

// defaultValueが設定されていないものと、されているものの2つを作成
export const input = () => <Input {...props} />;

export const defaultValue = () => <Input {...props} defaultValue="ねこ" />;
defaultValue.story = {
  name: "デフォルト値",
};
