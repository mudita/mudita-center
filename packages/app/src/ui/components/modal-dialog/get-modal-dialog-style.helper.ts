/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import muditaTheme, {
  Theme,
} from "App/__deprecated__/renderer/styles/theming/theme"
import {
  backgroundColor,
  zIndex as getZIndex,
} from "App/__deprecated__/renderer/styles/theming/theme-getters"
import { ModalProps } from "App/__deprecated__/renderer/components/core/modal/modal.component"
import { ModalSize } from "App/__deprecated__/renderer/components/core/modal/modal.interface"
import { Styles } from "react-modal"

export interface GetModalDialogStyleProps {
  size: ModalProps["size"]
  zIndex?: number
  theme?: Theme
}

const getModalSize = (size: ModalProps["size"]) => {
  switch (size) {
    case ModalSize.VerySmall:
      return {
        width: "27.5rem",
        padding: "2.4rem",
      }
    case ModalSize.Small:
      return {
        width: "38rem",
        padding: "2.4rem 2.4rem 4rem 2.4rem",
      }
    case ModalSize.Medium:
      return {
        width: "59rem",
      }
    case ModalSize.Large:
      return {
        width: "101rem",
      }
    default:
      return
  }
}

export const getModalDialogStyle = ({
  zIndex,
  size,
  theme = muditaTheme,
}: GetModalDialogStyleProps): Styles => {
  return {
    overlay: {
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      backgroundColor: backgroundColor("modalBackdrop")({ theme }),
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      zIndex: zIndex ? zIndex : getZIndex("modalBackdrop")({ theme }),
    },
    content: {
      boxSizing: "border-box",
      marginLeft: "auto",
      marginRight: "auto",
      transform: "translateY(-50%)",
      top: "50%",
      bottom: 0,
      left: 0,
      right: 0,
      height: "fit-content",
      border: "none",
      padding: "4rem 3.2rem 4.8rem 3.2rem",
      overflow: "hidden",
      ...getModalSize(size),
    },
  }
}
