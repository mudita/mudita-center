/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import Modal, { Props } from "react-modal"
import {
  ButtonContainer,
  ButtonWrapper,
  ModalProps,
} from "Renderer/components/core/modal/modal.component"
import {
  ModalSize,
  TitleOrder,
} from "Renderer/components/core/modal/modal.interface"
import {
  Close,
  CloseButton,
  Header,
  ModalSubTitle,
  ModalTitle,
} from "Renderer/components/core/modal/modal.styled.elements"
import { ModalTestIds } from "Renderer/components/core/modal/modal-test-ids.enum"
import {
  getSubtitleStyle,
  getTitleStyle,
} from "Renderer/components/core/modal/modal.helpers"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import { Type } from "Renderer/components/core/icon/icon.config"
import Button from "Renderer/components/core/button/button.component"
import { intl } from "Renderer/utils/intl"
import { withTheme } from "styled-components"
import {
  backgroundColor,
  zIndex as getZIndex,
} from "Renderer/styles/theming/theme-getters"
import muditaTheme, { Theme } from "Renderer/styles/theming/theme"

const getModalSize = (size: ModalSize) => {
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

interface Properties extends Omit<Props, "isOpen">, ModalProps {
  close?: ComponentProps<typeof Button>
  closeModal?: () => void
  theme?: Theme
  open: boolean
  zIndex?: number
}

const ModalDialog: FunctionComponent<Properties> = ({
  children,
  open = false,
  size = ModalSize.Large,
  titleOrder = TitleOrder.TitleFirst,
  title,
  subtitle,
  zIndex,
  closeModal,
  onCloseButton,
  closeButton = true,
  onClose,
  close = (
    <Close
      displayStyle={DisplayStyle.IconOnly2}
      onClick={closeModal}
      Icon={Type.Close}
      data-testid={ModalTestIds.CloseButton}
    />
  ),
  closeButtonLabel = intl.formatMessage({ id: "component.modalCloseButton" }),
  actionButtonLabel,
  onActionButtonClick,
  actionButtonIcon,
  actionButtonSize,
  actionButtonDisabled,
  theme = muditaTheme,
  ...props
}) => {
  const closeModalByButtonClick = () => {
    if (closeModal) {
      closeModal()
    }
    if (onCloseButton) {
      onCloseButton()
    }
  }

  return (
    <Modal
      isOpen={open}
      style={{
        overlay: {
          backgroundColor: backgroundColor("modalBackdrop")({ theme }),
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
      }}
      shouldCloseOnOverlayClick={false}
      onAfterClose={onClose}
      {...props}
    >
      <Header
        titleOrder={titleOrder}
        subtitleGap={Boolean(subtitle)}
        data-testid={ModalTestIds.Header}
      >
        <ModalTitle
          displayStyle={getTitleStyle(size)}
          subTitle={subtitle}
          element={"h2"}
          data-testid={ModalTestIds.Title}
        >
          {title}
        </ModalTitle>
        {Boolean(closeModal) && close}
        <ModalSubTitle displayStyle={getSubtitleStyle(size)} element={"p"}>
          {subtitle}
        </ModalSubTitle>
      </Header>
      {children}
      {actionButtonLabel || closeButton ? (
        <ButtonContainer buttonsPosition={size}>
          <ButtonWrapper>
            {closeButton && (
              <CloseButton
                actionButton={Boolean(actionButtonLabel)}
                displayStyle={DisplayStyle.Secondary}
                size={actionButtonSize}
                label={closeButtonLabel}
                onClick={closeModalByButtonClick}
                data-testid={ModalTestIds.CloseBottomButton}
              />
            )}
            {actionButtonLabel && onActionButtonClick && (
              <Button
                displayStyle={DisplayStyle.Primary}
                size={actionButtonSize}
                label={actionButtonLabel}
                onClick={onActionButtonClick}
                data-testid={ModalTestIds.ModalActionButton}
                Icon={actionButtonIcon}
                disabled={actionButtonDisabled}
              />
            )}
          </ButtonWrapper>
        </ButtonContainer>
      ) : null}
    </Modal>
  )
}

export default withTheme(ModalDialog)
