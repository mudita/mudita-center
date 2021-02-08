/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

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
        width: 27.5rem;
        padding: 2.4rem;
      `
    case ModalSize.Small:
      return css`
        width: 38rem;
        padding: 3.2rem 2.4rem 4.8rem 2.4rem;
      `
    case ModalSize.Medium:
      return css`
        width: 59rem;
      `
    case ModalSize.Large:
      return css`
        width: 101rem;
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
