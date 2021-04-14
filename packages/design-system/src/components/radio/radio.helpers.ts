import { Props } from "./radio.component"
import { RadioSize } from "./radio.enum"
import { getSpacing, theme } from "../../theme"
import { TextVariant } from "../text"

type Size = Props["size"]

export const getRadioSize = (size: Size): number => {
  switch (size) {
    case RadioSize.Small:
      return 1.4
    case RadioSize.Big:
      return 2
    default:
      return 1.6
  }
}

export const getRadioCircleSize = (size: Size): number => {
  switch (size) {
    case RadioSize.Small:
      return 0.8
    case RadioSize.Big:
      return 1.2
    default:
      return 1
  }
}

export const getRadioLabelSpacing = (size: Size): string => {
  switch (size) {
    case RadioSize.Big:
      return getSpacing("12")({ theme })
    default:
      return getSpacing("8")({ theme })
  }
}

export const getLabelTextVariant = (size: Size): TextVariant => {
  switch (size) {
    case RadioSize.Big:
      return TextVariant.Basic
    default:
      return TextVariant.Small
  }
}
