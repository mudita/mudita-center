/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useRef, ComponentProps, ReactNode } from "react"
import { ModalSize } from "App/__deprecated__/renderer/components/core/modal/modal.interface"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { noop } from "App/__deprecated__/renderer/utils/noop"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import Text, {
  TextDisplayStyle,
} from "App/__deprecated__/renderer/components/core/text/text.component"
import {
  ButtonsContainer,
  ButtonWrapper,
  SyncButton,
} from "App/contacts/components/sync-contacts-modal/sync-contacts.styled"
import { SyncContactsModalTestIds } from "App/contacts/components/sync-contacts-modal/sync-contacts-modal-test-ids.enum"
import { defineMessages } from "react-intl"
import GoogleButton from "react-google-button"
import { ModalDialog, ModalLink } from "App/ui/components/modal-dialog"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"
import InputFileSelect from "App/contacts/components/sync-contacts-modal/input-file-select"
import { ipcRenderer } from "electron-better-ipc"
import { HelpActions } from "App/__deprecated__/common/enums/help-actions.enum"

const messages = defineMessages({
  title: {
    id: "module.contacts.syncModalTitle",
  },
  text: {
    id: "module.contacts.syncModalText",
  },
  helpText: {
    id: "module.contacts.syncModalHelpText",
  },
  googleButtonText: {
    id: "module.contacts.googleButtonText",
  },
  outlookButtonText: {
    id: "module.contacts.outlookButtonText",
  },
  appleButtonText: {
    id: "module.contacts.appleButtonText",
  },
  manualImportText: {
    id: "module.contacts.manualImportText",
  },
})

export interface Props extends ComponentProps<typeof ModalDialog> {
  onGoogleButtonClick: () => void
  onOutlookButtonClick: () => void
  onAppleButtonClick?: () => void
  onManualImportClick: (inputElement: HTMLInputElement) => void
  disabledOtherMethod: boolean
  onCancelManualImportClick: () => void
}

const SyncContactsModal: FunctionComponent<Props> = ({
  onClose = noop,
  onAppleButtonClick,
  onOutlookButtonClick,
  onGoogleButtonClick,
  onManualImportClick,
  disabledOtherMethod,
  onCancelManualImportClick,
  ...props
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleManualImportClick = () => {
    if (onManualImportClick && fileInputRef.current) {
      onManualImportClick(fileInputRef.current)
    }
  }

  const openHelpWindow = () => ipcRenderer.callMain(HelpActions.OpenWindow)

  return (
    <ModalDialog
      size={ModalSize.Small}
      title={intl.formatMessage(messages.title)}
      closeButton={false}
      onClose={onClose}
      {...props}
    >
      <Text
        displayStyle={TextDisplayStyle.Paragraph2}
        message={messages.text}
      />
      <Text
        displayStyle={TextDisplayStyle.Paragraph2}
        message={{
          ...messages.helpText,
          values: {
            link: (...chunks: ReactNode[]) => (
              <ModalLink onClick={openHelpWindow}>{chunks}</ModalLink>
            ),
          },
        }}
      />
      <ButtonsContainer>
        <ButtonWrapper>
          <GoogleButton
            onClick={() => {
              onGoogleButtonClick()
            }}
            type="dark"
            label={intl.formatMessage(messages.googleButtonText)}
            data-testid={SyncContactsModalTestIds.GoogleButton}
            disabled={disabledOtherMethod}
          />

          <SyncButton
            labelMessage={messages.outlookButtonText}
            Icon={IconType.Outlook}
            onClick={onOutlookButtonClick}
            data-testid={SyncContactsModalTestIds.OutlookButton}
            disabled={disabledOtherMethod}
          />
          {onAppleButtonClick && (
            <SyncButton
              labelMessage={messages.appleButtonText}
              Icon={IconType.Apple}
              onClick={onAppleButtonClick}
              disabled={disabledOtherMethod}
            />
          )}
          <SyncButton
            labelMessage={messages.manualImportText}
            Icon={IconType.Upload}
            onClick={handleManualImportClick}
            disabled={disabledOtherMethod}
          />
          <InputFileSelect
            ref={fileInputRef}
            onManualImportClick={onManualImportClick}
            onCancelManualImportClick={onCancelManualImportClick}
          />
        </ButtonWrapper>
      </ButtonsContainer>
    </ModalDialog>
  )
}

export default SyncContactsModal
