/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useRef } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { defineMessages } from "react-intl"
import { ModalSize } from "Renderer/components/core/modal/modal.interface"
import { intl } from "Renderer/utils/intl"
import Icon from "Renderer/components/core/icon/icon.component"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { ModalText } from "App/contacts/components/sync-contacts-modal/sync-contacts.styled"
import Modal, {
  ModalProps,
} from "Renderer/components/core/modal/modal.component"
import {
  ButtonsContainer,
  ButtonWrapper,
  SyncButton,
} from "App/contacts/components/sync-contacts-modal/sync-contacts.styled"
import { ModalContent } from "App/calendar/components/calendar-modals.styled"
import { SelectVendorModalTestIds } from "App/calendar/components/select-vendor-modal-test-ids.enum"
import { RoundIconWrapper } from "Renderer/components/core/modal-shared/modal-shared"
import { IconType } from "Renderer/components/core/icon/icon-type"

const messages = defineMessages({
  title: {
    id: "module.calendar.selectVendorTitle",
  },
  subtitle: {
    id: "module.calendar.selectVendorSubtitle",
  },
  body: {
    id: "module.calendar.selectVendorBody",
  },
  buttonGoogle: {
    id: "component.loginGoogleButton",
  },
  buttonOutlook: {
    id: "component.loginOutlookButton",
  },
  manualImportButton: {
    id: "module.calendar.manualImportText",
  },
})

export interface SelectVendorModalProps extends ModalProps {
  onGoogleButtonClick: () => void
  onOutlookButtonClick: () => void
  onManualImportClick: (inputElement: HTMLInputElement) => void
}

const SelectVendorModal: FunctionComponent<SelectVendorModalProps> = ({
  onGoogleButtonClick,
  onManualImportClick,
  onOutlookButtonClick,
  ...props
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleManualImportClick = () => {
    if (onManualImportClick && fileInputRef.current) {
      onManualImportClick(fileInputRef.current)
    }
  }
  return (
    <Modal
      {...props}
      title={intl.formatMessage(messages.title)}
      size={ModalSize.Small}
      closeButton={false}
    >
      <ModalContent>
        <RoundIconWrapper>
          <Icon type={IconType.CalendarIcon} width={4} />
        </RoundIconWrapper>
        <Text
          displayStyle={TextDisplayStyle.Headline4}
          message={messages.subtitle}
        />
        <ModalText
          displayStyle={TextDisplayStyle.Paragraph4}
          message={messages.body}
        />
      </ModalContent>
      <ButtonsContainer>
        <ButtonWrapper>
          <SyncButton
            labelMessage={messages.buttonGoogle}
            onClick={onGoogleButtonClick}
            Icon={IconType.Google}
            data-testid={SelectVendorModalTestIds.GoogleButton}
          />
          <SyncButton
            labelMessage={messages.buttonOutlook}
            onClick={onOutlookButtonClick}
            Icon={IconType.Outlook}
            data-testid={SelectVendorModalTestIds.OutlookButton}
          />
          <SyncButton
            labelMessage={messages.manualImportButton}
            Icon={IconType.Upload}
            onClick={handleManualImportClick}
            data-testid={SelectVendorModalTestIds.ManualImportButton}
          />
          <input ref={fileInputRef} type="file" accept=".ics" hidden multiple />
        </ButtonWrapper>
      </ButtonsContainer>
    </Modal>
  )
}

export default SelectVendorModal
