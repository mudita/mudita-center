import { css } from "styled-components"
import { TextDisplayStyle } from "Renderer/components/core/text/text.component"
import {
  ModalSize,
  TitleOrder,
} from "Renderer/components/core/modal/modal.component"

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

export const getTitleStyleBasedOnModalSize = (size: ModalSize) => {
  switch (size) {
    case ModalSize.VerySmall:
      return TextDisplayStyle.LargeBoldText
    case ModalSize.Small || ModalSize.Medium:
      return TextDisplayStyle.SecondaryBoldHeading
    case ModalSize.Large:
      return TextDisplayStyle.TertiaryBoldHeading
    default:
      return
  }
}

export const getSubTitleStyleBasedOnModalSize = (size: ModalSize) => {
  switch (size) {
    case ModalSize.Small:
      return TextDisplayStyle.SmallFadedText
    case ModalSize.Large:
      return TextDisplayStyle.MediumText
    default:
      return
  }
}

export const getHeaderTemplate = (order: TitleOrder) => {
  switch (order) {
    case TitleOrder.TitleFirst:
      return css`
        grid-template-areas:
          "Title CloseButton"
          "Subtitle CloseButton";
      `
    case TitleOrder.SubTitleFirst:
      return css`
        grid-template-areas:
          "Subtitle CloseButton"
          "Title CloseButton";
      `
    default:
      return
  }
}
