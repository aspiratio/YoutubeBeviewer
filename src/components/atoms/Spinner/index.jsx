import styled, { keyframes } from "styled-components";

// @keyframes は、アニメーション開始から終了するまでどのようなアニメーションをするのか指定できるCSSの文法
const loopSpinKeyFrame = keyframes`
	// 0%はアニメーション開始時 100%はアニメーション終了時
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
	`;

const size = "24px";

export default styled.span`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: ${size};
  height: ${size};
  border-radius: 50%;
  border: 8px solid #ccd5dc;
  border-right-color: transparent;
  // 定義したキーフレームはテンプレートリテラルで埋め込める
  animation: ${loopSpinKeyFrame} 1s linear infinite;
`;
