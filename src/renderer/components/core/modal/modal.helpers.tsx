import { css } from "styled-components"
import { TextDisplayStyle } from "Renderer/components/core/text/text.component"
import { ModalSize } from "Renderer/components/core/modal/modal.component"

export const getModalSize = (size: ModalSize) => {
  switch (size) {
    case ModalSize.VerySmall:
      return css`
        width: calc(27.5rem - 4rem);
      `
    case ModalSize.Small:
      return css`
        width: calc(38rem - 4rem);
      `
    case ModalSize.Medium:
      return css`
        width: calc(59rem - 4rem);
      `
    case ModalSize.Large:
      return css`
        width: calc(101rem - 4rem);
      `
    default:
      return
  }
}

export const getTitleStyleBasedOnModalSize = (
  size: ModalSize
): TextDisplayStyle => {
  switch (size) {
    case ModalSize.VerySmall:
      return TextDisplayStyle.LargeBoldText
    case ModalSize.Small || ModalSize.Medium:
      return TextDisplayStyle.SecondaryBoldHeading
    case ModalSize.Large:
      return TextDisplayStyle.TertiaryBoldHeading
    default:
      return TextDisplayStyle.TertiaryBoldHeading
  }
}

export const getSubTitleStyleBasedOnModalSize = (
  size: ModalSize
): TextDisplayStyle => {
  switch (size) {
    case ModalSize.Small:
      return TextDisplayStyle.SmallFadedText
    case ModalSize.Large:
      return TextDisplayStyle.MediumText
    default:
      return TextDisplayStyle.MediumText
  }
}
