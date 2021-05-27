/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import ModalDialog from "Renderer/components/core/modal-dialog/modal-dialog.component"
import { ModalSize } from "Renderer/components/core/modal/modal.interface"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { intl } from "Renderer/utils/intl"
import { defineMessages } from "react-intl"
import Icon from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import Loader from "Renderer/components/core/loader/loader.component"
import { LoaderType } from "Renderer/components/core/loader/loader.interface"
import {
  ModalContent,
  RoundIconWrapper,
} from "Renderer/components/core/modal-dialog/modal-dialog-shared"

const messages = defineMessages({
  appUpdateTitle: { id: "component.updateModalTitle" },
  availableUpdateMessage: { id: "component.updateAvailableModalMessage" },
  availableUpdateButton: { id: "component.updateAvailableModalButton" },
  downloadedUpdateMessage: { id: "component.updateDownloadedModalMessage" },
  downloadedUpdateDescription: {
    id: "component.updateDownloadedModalDescription",
  },
  downloadedUpdateWarning: {
    id: "component.updateDownloadedModalWarning",
  },
  downloadedUpdateButton: { id: "component.updateDownloadedModalButton" },
  downloadedUpdateCloseButton: {
    id: "component.updateDownloadedModalCloseButton",
  },
  errorUpdateMessage: {
    id: "component.updateErrorModalMessage",
  },
  errorUpdateDescription: {
    id: "component.updateErrorModalDescription",
  },
})

const AppUpdateModal: FunctionComponent<ComponentProps<typeof ModalDialog>> = ({
  children,
  ...props
}) => (
  <ModalDialog
    size={ModalSize.Small}
    title={intl.formatMessage(messages.appUpdateTitle)}
    {...props}
  >
    <ModalContent>
      <RoundIconWrapper>
        <Icon type={Type.MuditaLogo} width={4} />
      </RoundIconWrapper>
      {children}
    </ModalContent>
  </ModalDialog>
)

export const AppUpdateAvailable: FunctionComponent<
  ComponentProps<typeof ModalDialog>
> = (props) => (
  <AppUpdateModal
    actionButtonLabel={intl.formatMessage(messages.availableUpdateButton)}
    {...props}
  >
    <Text
      displayStyle={TextDisplayStyle.LargeBoldText}
      message={messages.availableUpdateMessage}
    />
  </AppUpdateModal>
)

export const AppUpdateError: FunctionComponent<
  ComponentProps<typeof ModalDialog>
> = (props) => (
  <AppUpdateModal {...props}>
    <Text
      displayStyle={TextDisplayStyle.LargeBoldText}
      message={messages.errorUpdateMessage}
    />
    <Text
      displayStyle={TextDisplayStyle.MediumFadedText}
      message={messages.errorUpdateDescription}
    />
  </AppUpdateModal>
)

export const AppUpdateDownloaded: FunctionComponent<
  ComponentProps<typeof ModalDialog>
> = (props) => (
  <AppUpdateModal
    actionButtonLabel={intl.formatMessage(messages.downloadedUpdateButton)}
    closeButtonLabel={intl.formatMessage(messages.downloadedUpdateCloseButton)}
    {...props}
  >
    <Text
      displayStyle={TextDisplayStyle.LargeBoldText}
      message={messages.downloadedUpdateMessage}
    />
    <Text
      displayStyle={TextDisplayStyle.MediumFadedText}
      message={messages.downloadedUpdateDescription}
    />
    <Text
      displayStyle={TextDisplayStyle.MediumBoldText}
      message={{
        ...messages.downloadedUpdateWarning,
        values: {
          // On macOS the app can't automatically start after update (so it just quits),
          // while linux and windows supports that feature (so the app restarts in fact).
          // That's why there must be a distinction in translation depending on current OS.
          osxPlatform: process?.platform === "darwin",
        },
      }}
    />
  </AppUpdateModal>
)

export const AppUpdateProgress: FunctionComponent<
  ComponentProps<typeof ModalDialog>
> = ({ ...props }) => (
  <ModalDialog
    size={ModalSize.Small}
    title={intl.formatMessage(messages.appUpdateTitle)}
    closeButton={false}
    closeable={false}
    {...props}
  >
    <ModalContent>
      <RoundIconWrapper>
        <Loader type={LoaderType.Spinner} />
      </RoundIconWrapper>
    </ModalContent>
  </ModalDialog>
)
