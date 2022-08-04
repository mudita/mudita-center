/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { css } from "styled-components"
import { TextDisplayStyle } from "App/__deprecated__/renderer/components/core/text/text.component"
import {
  ModalSize,
  TitleOrder,
} from "App/__deprecated__/renderer/components/core/modal/modal.interface"
import { Size } from "App/__deprecated__/renderer/components/core/button/button.config"

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
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

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getTitleStyle = (size: ModalSize) => {
  switch (size) {
    case ModalSize.VerySmall:
      return TextDisplayStyle.Headline4
    case ModalSize.Small:
    case ModalSize.Medium:
      return TextDisplayStyle.Headline3
    case ModalSize.Large:
      return TextDisplayStyle.Headline2
    default:
      return
  }
}

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getSubtitleStyle = (size: ModalSize) => {
  switch (size) {
    case ModalSize.Small:
    case ModalSize.Medium:
      return TextDisplayStyle.Paragraph4
    case ModalSize.Large:
      return TextDisplayStyle.Paragraph3
    default:
      return
  }
}

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
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

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getModalButtonsSize = (size: ModalSize) => {
  switch (size) {
    case ModalSize.VerySmall:
      return Size.FixedSmall
    case ModalSize.Small:
      return Size.FixedSmall
    case ModalSize.Medium:
      return Size.FixedMedium
    case ModalSize.Large:
      return Size.FixedBig
    default:
      return
  }
}

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
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
