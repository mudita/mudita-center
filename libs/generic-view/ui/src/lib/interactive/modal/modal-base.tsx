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
import { getModalSize } from "./helpers/modal-content"
import { ModalBaseConfig, ModalConfig } from "generic-view/models"
import { ModalSize } from "generic-view/utils"
import { appTheme } from "Root/app-theme"

interface Props extends PropsWithChildren {
  opened: boolean
  config?: ModalBaseConfig
  size?: ModalSize
  closeButton?: ReactElement
  overlayHidden?: boolean
  modalLayer?: ModalConfig["modalLayer"]
}

export const ModalBase: FunctionComponent<Props> = ({
  opened,
  config,
  children,
  size = "medium",
  closeButton,
  overlayHidden,
  modalLayer = ModalLayers.Default,
}) => {
  const modalMaxHeight = useMemo(() => {
    if (config?.maxHeight === undefined) {
      return "576px"
    }
    return typeof config.maxHeight === "number"
      ? `${config.maxHeight}px`
      : config.maxHeight
  }, [config?.maxHeight])

  const modalWidth = useMemo(() => {
    if (config?.width === undefined) {
      return getModalSize(size)
    }
    return typeof config.width === "number" ? `${config.width}px` : config.width
  }, [config?.width, size])

  const modalPadding = useMemo(() => {
    if (config?.padding === undefined) {
      switch (size) {
        case "small":
        case "medium":
          return "2.4rem"
        case "large":
          return "4.8rem"
      }
    }
    return typeof config.padding === "number"
      ? `${config.padding}px`
      : config.padding
  }, [config?.padding, size])

  const modalGap = useMemo(() => {
    if (config?.gap === undefined) {
      return appTheme.generic.space.xl
    }
    return typeof config.gap === "number" ? `${config.gap}px` : config.gap
  }, [config?.gap])

  return (
    <ReactModal
      className="generic-modal"
      overlayClassName={`generic-modal-overlay ${
        overlayHidden ? "hidden" : ""
      }`}
      isOpen={opened}
      style={{
        overlay: {
          zIndex: modalLayer,
        },
        content: {
          zIndex: modalLayer,
          // @ts-ignore
          "--modal-padding": modalPadding,
          "--modal-width": modalWidth,
          "--modal-max-height": modalMaxHeight,
          "--modal-gap": modalGap,
        },
      }}
      closeTimeoutMS={400}
    >
      {closeButton}
      {children}
    </ReactModal>
  )
}
