/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { defineMessages } from "react-intl"
import styled from "styled-components"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { ModalDialog } from "App/ui/components/modal-dialog"
import { ModalSize } from "App/__deprecated__/renderer/components/core/modal/modal.interface"
import Icon from "App/__deprecated__/renderer/components/core/icon/icon.component"
import Text, {
  TextDisplayStyle,
} from "App/__deprecated__/renderer/components/core/text/text.component"
import { RoundIconWrapper } from "App/__deprecated__/renderer/components/core/modal-shared/modal-shared"
import { Size } from "App/__deprecated__/renderer/components/core/button/button.config"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"
import { noop } from "App/__deprecated__/renderer/utils/noop"
import { ExportContactFailedModalTestIds } from "App/contacts/components/export-contact-failed-modal/export-contact-failed-modal-test-ids.component"

const messages = defineMessages({
  exportFailedTitle: {
    id: "module.contacts.errorExportModalTitle",
  },
  exportFailedDescription: {
    id: "module.contacts.errorExportModalDescription",
  },
  exportFailedCloseButton: {
    id: "module.contacts.errorExportModalClose",
  },
})

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  p + p {
    margin-top: 1.2rem;
  }
`

export const ExportContactFailedModal: FunctionComponent<
  ComponentProps<typeof ModalDialog>
> = ({ size = ModalSize.Small, onClose = noop, ...props }) => (
  <ModalDialog
    size={size}
    title={intl.formatMessage(messages.exportFailedTitle)}
    closeModal={onClose}
    closeButton
    onCloseButton={onClose}
    closeButtonLabel={intl.formatMessage(messages.exportFailedCloseButton)}
    actionButtonSize={Size.FixedMedium}
    {...props}
  >
    <ModalContent>
      <RoundIconWrapper>
        <Icon type={IconType.Fail} width={4} />
      </RoundIconWrapper>
      <Text
        displayStyle={TextDisplayStyle.Headline4}
        message={messages.exportFailedDescription}
        data-testid={ExportContactFailedModalTestIds.Description}
      />
    </ModalContent>
  </ModalDialog>
)
