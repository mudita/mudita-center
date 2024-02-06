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
import styled from "styled-components"
import Icon from "../../icon/icon"
import { IconType } from "generic-view/utils"

interface Props extends PropsWithChildren {
  opened: boolean
  config?: {
    width?: string | number
  }
  variant?: "default" | "small"
  closeButton?: ReactElement
  headerDisabled?: boolean
  overlayHidden?: boolean
}

export const ModalBase: FunctionComponent<Props> = ({
  opened,
  config,
  children,
  variant = "default",
  closeButton,
  headerDisabled,
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
          width: config?.width || (variant === "small" ? 408 : 614),
          zIndex: ModalLayers.Default,
          // @ts-ignore
          "--modal-padding": variant === "small" ? "3.6rem" : "4.8rem",
        },
      }}
      closeTimeoutMS={400}
    >
      {!headerDisabled && <ModalHeader>{closeButton}</ModalHeader>}
      {children}
    </ReactModal>
  )
}

export const ModalCloseIcon = styled(Icon).attrs({
  data: { type: IconType.Close },
})`
  cursor: pointer;
  width: 1.6rem;
  height: 1.6rem;
`

export const ModalTitleIcon = styled(Icon)`
  width: 8rem;
  height: 8rem;
  padding: ${({ theme }) => theme.space.lg};
  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.grey5};
`

export const ModalCenteredContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--modal-padding);
  gap: 4rem;

  ${ModalTitleIcon} {
    margin-bottom: -2.6rem;
  }

  h1 {
    margin: 0;
    font-size: ${({ theme }) => theme.fontSize.headline3};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    line-height: ${({ theme }) => theme.lineHeight.headline3};
    text-align: center;
  }

  p {
    margin: 0;
    font-size: ${({ theme }) => theme.fontSize.paragraph1};
    line-height: ${({ theme }) => theme.lineHeight.paragraph1};
    text-align: center;
    color: ${({ theme }) => theme.color.grey1};
    letter-spacing: 0.02em;
  }
`

export const ModalHeader = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  padding: ${({ theme }) => theme.space.xl} ${({ theme }) => theme.space.xl} 0 0;
  min-height: 5.6rem;

  & + ${ModalCenteredContent} {
    padding-top: 0;
  }
`
