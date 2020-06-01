import { css } from "styled-components"
import { TextDisplayStyle } from "Renderer/components/core/text/text.component"
import {
  ModalSize,
  TitleOrder,
} from "Renderer/components/core/modal/modal.interface"
import { Size } from "Renderer/components/core/button/button.config"

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
        width: calc(101rem - 6.4rem);
      `
    default:
      return
  }
}

export const getTitleStyle = (size: ModalSize) => {
  switch (size) {
    case ModalSize.VerySmall:
      return TextDisplayStyle.LargeBoldText
    case ModalSize.Small:
    case ModalSize.Medium:
      return TextDisplayStyle.SecondaryBoldHeading
    case ModalSize.Large:
      return TextDisplayStyle.TertiaryBoldHeading
    default:
      return
  }
}

export const getSubtitleStyle = (size: ModalSize) => {
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
          "Title Close"
          "Subtitle Close";
      `
    case TitleOrder.SubtitleFirst:
      return css`
        grid-template-areas:
          "Subtitle Close"
          "Title Close";
      `
    default:
      return
  }
}

export const getModalButtonsSize = (size: ModalSize) => {
  switch (size) {
    case ModalSize.VerySmall:
      return Size.FixedSmall
    case ModalSize.Small:
      return Size.FixedMedium
    case ModalSize.Medium:
    case ModalSize.Large:
      return Size.FixedBig
    default:
      return
  }
}

export const getButtonsPosition = (size: ModalSize) => {
  switch (size) {
    case ModalSize.VerySmall:
    case ModalSize.Small:
    case ModalSize.Medium:
      return css`
        justify-content: space-evenly;
      `
    case ModalSize.Large:
      return css`
        justify-content: flex-end;
      `
    default:
      return
  }
}
