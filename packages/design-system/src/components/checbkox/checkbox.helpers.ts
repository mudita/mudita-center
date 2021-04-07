import { Props } from "./checkbox.component"
import { CheckboxSize } from "./checkbox.enum"
import { getSpacing, theme } from "../../theme"
import { TextVariant } from "../text"

type Size = Props["size"]

export const getCheckboxSize = (size: Size): number => {
  switch (size) {
    case CheckboxSize.Small:
      return 1.4
    case CheckboxSize.Big:
      return 2
    default:
      return 1.6
  }
}

export const getCheckboxLabelSpacing = (size: Size): string => {
  switch (size) {
    case CheckboxSize.Big:
      return getSpacing("12")({ theme })
    default:
      return getSpacing("8")({ theme })
  }
}

export const getLabelTextVariant = (size: Size): TextVariant => {
  switch (size) {
    case CheckboxSize.Big:
      return TextVariant.Basic
    default:
      return TextVariant.Small
  }
}
