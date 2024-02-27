/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, {
  FunctionComponent,
  PropsWithChildren,
  ReactElement,
} from "react"
import ReactModal from "react-modal"
import { ModalLayers } from "Core/modals-manager/constants/modal-layers.enum"

interface Props extends PropsWithChildren {
  opened: boolean
  config?: {
    width?: string | number
  }
  variant?: "default" | "small"
  closeButton?: ReactElement
  overlayHidden?: boolean
}

export const ModalBase: FunctionComponent<Props> = ({
  opened,
  config,
  children,
  variant = "default",
  closeButton,
  overlayHidden,
}) => {
  return (
    <ReactModal
      className="generic-modal"
      overlayClassName={`generic-modal-overlay ${
        overlayHidden ? "hidden" : ""
      }`}
      isOpen={opened}
      style={{
        overlay: {
          zIndex: ModalLayers.Default,
        },
        content: {
          width: config?.width || (variant === "small" ? 384 : 614),
          zIndex: ModalLayers.Default,
          // @ts-ignore
          "--modal-padding": variant === "small" ? "2.4rem" : "4.8rem",
        },
      }}
      closeTimeoutMS={400}
    >
      {closeButton}
      {children}
    </ReactModal>
  )
}
