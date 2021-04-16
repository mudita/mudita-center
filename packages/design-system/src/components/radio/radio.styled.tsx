import { getColor } from "../../theme"
import styled, { css } from "styled-components"
import { Text } from "../text"
import { Props } from "./radio.component"
import { getRadioLabelSpacing, getRadioSize } from "./radio.helpers"
import { RadioSize } from "./radio.enum"
import { Icon } from "../icon"
import { IconRadioChecked } from "../../icons"

const radioIconStyle = css`
  opacity: 0;
  visibility: hidden;
  transform: scale3d(0, 0, 0);
  transition: opacity var(--transition), visibility var(--transition),
    transform var(--transition);
`

const radioIconActiveStyle = css`
  opacity: 1;
  visibility: visible;
  transform: scale3d(1, 1, 1);
  transition: opacity var(--transition) var(--transition-delay),
    visibility var(--transition) var(--transition-delay),
    transform var(--transition);
`

const radioFocusedStyle = css`
  border-color: ${getColor("grey700")};
`

const radioActiveStyle = css`
  border-color: ${getColor("grey800")};
`

const radioDisabledStyle = css`
  color: ${getColor("grey400")};
  border-color: ${getColor("grey400")};
`

export const CheckedIcon = styled(IconRadioChecked)`
  ${radioIconStyle};
`

export const NativeInput = styled("input").attrs(() => ({
  type: "radio",
}))`
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
`

export const CustomInput = styled(Icon)<Props>`
  border: solid 0.1rem ${getColor("grey500")};
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

      ${CheckedIcon} {
        ${radioIconActiveStyle};
      }
    }

    &:disabled {
      + ${CustomInput} {
        ${radioDisabledStyle};
      }

      ~ ${LabelText} {
        color: ${getColor("grey600")};
      }
    }
  }
`
