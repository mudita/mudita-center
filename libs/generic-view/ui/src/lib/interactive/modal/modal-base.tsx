/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, {
  FunctionComponent,
  PropsWithChildren,
  ReactElement,
  useMemo,
} from "react"
import ReactModal from "react-modal"
import { ModalLayers } from "Core/modals-manager/constants/modal-layers.enum"
import { getModalSize, ModalSize } from "./modal-helpers"

export interface ModalBaseConfig {
  width?: string | number
  padding?: string | number
  maxHeight?: string | number
}

interface Props extends PropsWithChildren {
  opened: boolean
  config?: ModalBaseConfig
  size?: ModalSize
  closeButton?: ReactElement
  overlayHidden?: boolean
}

export const ModalBase: FunctionComponent<Props> = ({
  opened,
  config,
  children,
  size = "medium",
  closeButton,
  overlayHidden,
}) => {
  const modalWidth = useMemo(() => {
    if (config?.width) {
      return typeof config.width === "number"
        ? `${config.width}px`
        : config.width
    }
    return getModalSize(size)
  }, [config?.width, size])

  const modalPadding = useMemo(() => {
    if (config?.padding) {
      return typeof config.padding === "number"
        ? `${config.padding}px`
        : config.padding
    }
    switch (size) {
      case "small":
      case "medium":
        return "2.4rem"
      case "large":
        return "4.8rem"
    }
  }, [config?.padding, size])

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
          maxHeight: config?.maxHeight || 574,
          zIndex: ModalLayers.Default,
          // @ts-ignore
          "--modal-padding": modalPadding,
          "--modal-width": modalWidth,
        },
      }}
      closeTimeoutMS={400}
    >
      {closeButton}
      {children}
    </ReactModal>
  )
}
