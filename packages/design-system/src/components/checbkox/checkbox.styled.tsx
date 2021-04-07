import { getColor } from "../../theme"
import styled, { css } from "styled-components"
import { Icon } from "../icon"
import { Text } from "../text"
import { Props } from "./checkbox.component"
import { getCheckboxLabelSpacing, getCheckboxSize } from "./checkbox.helpers"
import { IconCheckboxChecked, IconCheckboxIndeterminate } from "../../icons"
import { CheckboxSize } from "./checkbox.enum"

const checkboxIconStyle = css`
  top: 0;
  left: 0;
  position: absolute;
  visibility: hidden;
  transform: scale3d(0, 0, 0);
  transition: opacity var(--transition), visibility var(--transition),
    transform var(--transition);
`

const checkboxIconActiveStyle = css`
  opacity: 1;
  visibility: visible;
  transform: scale3d(1, 1, 1);
  transition: opacity var(--transition) var(--transition-delay),
    visibility var(--transition) var(--transition-delay),
    transform var(--transition);
`

const checkboxActiveStyle = css`
  background-color: ${getColor("grey800")};
  border-color: ${getColor("grey800")};
  transition: background-color var(--transition), border-color var(--transition);
`

const checkboxFocusedStyle = css`
  border-color: ${getColor("grey700")};
`

const checkboxDisabledStyle = css`
  background-color: ${getColor("grey300")};
`

export const CheckedIcon = styled(IconCheckboxChecked)`
  ${checkboxIconStyle};
`

export const IndeterminateIcon = styled(IconCheckboxIndeterminate)`
  ${checkboxIconStyle};
`

export const NativeInput = styled("input").attrs(() => ({
  type: "checkbox",
}))`
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
`

export const CustomInput = styled(Icon)<Props>`
  border: solid 0.1rem ${getColor("grey500")};
  border-radius: 0.2rem;
  box-sizing: border-box;
  position: relative;
  color: ${getColor("white")};
  transition: background-color var(--transition) var(--transition-delay),
    border-color var(--transition) var(--transition-delay);

  width: ${({ size }) => getCheckboxSize(size)}rem;
  height: ${({ size }) => getCheckboxSize(size)}rem;
`

export const LabelText = styled(Text)<{ checkboxSize?: CheckboxSize }>`
  margin-top: 0.1rem;
  user-select: none;
  line-height: 1;
  margin-left: ${({ checkboxSize }) => getCheckboxLabelSpacing(checkboxSize)};
`

export const CheckboxWrapper = styled("label")`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  cursor: pointer;

  --transition: 0.35s ease-in-out;
  --transition-delay: 0.15s;

  &:hover {
    ${CustomInput} {
      ${checkboxFocusedStyle};
    }
  }

  ${NativeInput} {
    &:focus + ${CustomInput} {
      ${checkboxFocusedStyle};
    }

    &:checked + ${CustomInput} {
      ${checkboxActiveStyle};

      ${CheckedIcon} {
        ${checkboxIconActiveStyle};
      }
    }

    &:indeterminate + ${CustomInput} {
      ${checkboxActiveStyle};

      ${IndeterminateIcon} {
        ${checkboxIconActiveStyle};
      }
    }

    &:disabled + ${CustomInput} {
      ${checkboxDisabledStyle};
    }
  }
`
