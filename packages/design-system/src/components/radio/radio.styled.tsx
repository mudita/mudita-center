import { getColor } from "../../theme"
import styled, { css } from "styled-components"
import { Text } from "../text"
import { Props } from "./radio.component"
import {
  getRadioCircleSize,
  getRadioLabelSpacing,
  getRadioSize,
} from "./radio.helpers"
import { RadioSize } from "./radio.enum"

const radioActiveStyle = css`
  border-color: ${getColor("grey800")};
`

const circleActiveStyle = css`
  transform: scale3d(1, 1, 1);
`

const radioFocusedStyle = css`
  border-color: ${getColor("grey700")};
`

const radioDisabledStyle = css`
  border-color: ${getColor("grey400")};
`

const circleDisabledStyle = css`
  background-color: ${getColor("grey400")};
`

export const NativeInput = styled("input").attrs(() => ({
  type: "radio",
}))`
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
`

export const RadioCircle = styled("span")<Props>`
  display: block;
  position: relative;
  width: ${({ size }) => getRadioCircleSize(size)}rem;
  height: ${({ size }) => getRadioCircleSize(size)}rem;
  border-radius: inherit;
  background-color: ${getColor("grey800")};
  transform: scale3d(0, 0, 0);
  transition: transform var(--transition);
`

export const CustomInput = styled("span")<Props>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: solid 0.1rem ${getColor("grey500")};
  position: relative;
  width: ${({ size }) => getRadioSize(size)}rem;
  height: ${({ size }) => getRadioSize(size)}rem;
  border-radius: ${({ size }) => getRadioSize(size)}rem;
  transition: border-color var(--transition);
`

export const LabelText = styled(Text)<{ radioSize?: RadioSize }>`
  margin-top: 0.1rem;
  user-select: none;
  line-height: 1;
  margin-left: ${({ radioSize }) => getRadioLabelSpacing(radioSize)};
`

export const RadioWrapper = styled("label")`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  cursor: pointer;

  --transition: 0.3s ease-in-out;

  &:hover {
    ${CustomInput} {
      ${radioFocusedStyle};
    }
  }

  ${NativeInput} {
    &:focus + ${CustomInput} {
      ${radioFocusedStyle};
    }

    &:checked + ${CustomInput} {
      ${radioActiveStyle};

      ${RadioCircle} {
        ${circleActiveStyle};
      }
    }

    &:disabled + ${CustomInput} {
      ${radioDisabledStyle};

      ${RadioCircle} {
        ${circleDisabledStyle};
      }
    }

    &:disabled ~ ${LabelText} {
      color: ${getColor("grey600")};
    }
  }
`
