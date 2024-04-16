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
import { theme } from "generic-view/theme"
import { getModalSize, ModalSize } from "./helpers/modal-content"

export interface ModalBaseConfig {
  width?: string | number
  padding?: string | number
  maxHeight?: string | number
  gap?: string | number
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
      return theme.space.xl
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
          zIndex: ModalLayers.Default,
        },
        content: {
          zIndex: ModalLayers.Default,
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
