/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import Modal from "react-modal"
import {
  ButtonContainer,
  ButtonWrapper,
} from "App/__deprecated__/renderer/components/core/modal/modal.component"
import {
  ModalSize,
  TitleOrder,
} from "App/__deprecated__/renderer/components/core/modal/modal.interface"
import {
  Close,
  CloseButton,
  Header,
  ModalSubTitle,
  ModalTitle,
} from "App/__deprecated__/renderer/components/core/modal/modal.styled.elements"
import { ModalTestIds } from "App/__deprecated__/renderer/components/core/modal/modal-test-ids.enum"
import {
  getSubtitleStyle,
  getTitleStyle,
} from "App/__deprecated__/renderer/components/core/modal/modal.helpers"
import { DisplayStyle } from "App/__deprecated__/renderer/components/core/button/button.config"
import Button from "App/__deprecated__/renderer/components/core/button/button.component"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import { withTheme } from "styled-components"
import {
  backgroundColor,
  zIndex as getZIndex,
} from "App/__deprecated__/renderer/styles/theming/theme-getters"
import muditaTheme from "App/__deprecated__/renderer/styles/theming/theme"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"
import { ModalDialogProps } from "App/ui/components/modal-dialog"

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

export const ModalDialog: FunctionComponent<ModalDialogProps> = withTheme(
  ({
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
        displayStyle={DisplayStyle.IconOnly}
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        onClick={closeModal}
        Icon={IconType.Close}
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
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        closeModal()
      }
      if (onCloseButton) {
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        onCloseButton()
      }
    }

    return (
      <Modal
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        isOpen={open}
        style={{
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
        }}
        shouldCloseOnOverlayClick
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        onRequestClose={closeModal}
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        onAfterClose={onClose}
        {...props}
      >
        <Header
          // AUTO DISABLED - fix me if you like :)
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          titleOrder={titleOrder}
          subtitleGap={Boolean(subtitle)}
          data-testid={ModalTestIds.Header}
        >
          <ModalTitle
            displayStyle={getTitleStyle(size)}
            // AUTO DISABLED - fix me if you like :)
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            subTitle={subtitle}
            element={"h2"}
            data-testid={ModalTestIds.Title}
          >
            {title}
          </ModalTitle>
          {Boolean(closeModal) && close}
          <ModalSubTitle
            displayStyle={getSubtitleStyle(size)}
            color="secondary"
            element={"p"}
          >
            {subtitle}
          </ModalSubTitle>
        </Header>
        {children}
        {actionButtonLabel || closeButton ? (
          // AUTO DISABLED - fix me if you like :)
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          <ButtonContainer buttonsPosition={size}>
            <ButtonWrapper>
              {closeButton && (
                <CloseButton
                  actionButton={Boolean(actionButtonLabel)}
                  displayStyle={DisplayStyle.Secondary}
                  // AUTO DISABLED - fix me if you like :)
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                  size={actionButtonSize}
                  // AUTO DISABLED - fix me if you like :)
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                  label={closeButtonLabel}
                  onClick={closeModalByButtonClick}
                  data-testid={ModalTestIds.CloseBottomButton}
                />
              )}
              {actionButtonLabel && onActionButtonClick && (
                <Button
                  displayStyle={DisplayStyle.Primary}
                  // AUTO DISABLED - fix me if you like :)
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                  size={actionButtonSize}
                  // AUTO DISABLED - fix me if you like :)
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                  label={actionButtonLabel}
                  // AUTO DISABLED - fix me if you like :)
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                  onClick={onActionButtonClick}
                  data-testid={ModalTestIds.ModalActionButton}
                  // AUTO DISABLED - fix me if you like :)
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                  Icon={actionButtonIcon}
                  // AUTO DISABLED - fix me if you like :)
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                  disabled={actionButtonDisabled}
                />
              )}
            </ButtonWrapper>
          </ButtonContainer>
        ) : null}
      </Modal>
    )
  }
)
