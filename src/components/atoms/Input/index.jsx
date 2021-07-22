import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Root = styled.input`
  width: 100%;
  padding: 10px 15px;
  font-size: 16px;
  border-radius: 4px;
  border: 2px solid #ddd;
  box-sizing: border-box;
  :focus {
    border-color: rgba(100, 100, 255, 0.5);
  }
  ::placeholder {
    color: #ddd;
  }
`;

// Inputは親コンポーネントからonChangeを受け取って、値が変更された時に新しい値をonChangeに渡して呼び出すよう設計
// 見た目とロジックに分けて実装

// プレゼンテーショナル・コンポーネント（見た目）
export const InputPresenter = ({
  className,
  onChange,
  defaultValue,
  placeholder,
}) => (
  <Root
    className={className}
    onChange={onChange}
    defaultValue={defaultValue}
    placeholder={placeholder}
  />
);

InputPresenter.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
};

InputPresenter.defaultProps = {
  className: "",
  onChange: null,
  defaultValue: "",
  placeholder: "",
};

// コンテナー・コンポーネント（ロジック）
export const InputContainer = ({
  className,
  onChange,
  defaultValue,
  placeholder,
  presenter,
}) => {
  const [value, setValue] = useState(defaultValue);
  return presenter({
    className,
    onChange: (e) => {
      // 入力値が変更された時のハンドラ
      const { value: newValue } = e.target;
      if (newValue === value) {
        // 値が変更されていなければ何もしない
        return;
      }
      // 新しい値をセットする
      setValue(newValue);
      // 親コンポーネントから渡されたonChangeを呼ぶ
      onChange(newValue);
    },
    defaultValue,
    placeholder,
  });
};

InputContainer.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
  presenter: PropTypes.func.isRequired,
};

InputContainer.defaultProps = {
  className: "",
  onChange: null,
  defaultValue: "",
  placeholder: "",
};

export default (props) => (
  <InputContainer presenter={InputPresenter} {...props} />
);
