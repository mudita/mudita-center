/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "Core/__deprecated__/renderer/types/function-component.interface"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { RoundIconWrapper } from "Core/__deprecated__/renderer/components/core/modal-shared/modal-shared"
import Icon from "Core/__deprecated__/renderer/components/core/icon/icon.component"
import { ModalText } from "Core/contacts/components/sync-contacts-modal/sync-contacts.styled"
import { TextDisplayStyle } from "Core/__deprecated__/renderer/components/core/text/text.component"
import React, { ComponentProps } from "react"
import { defineMessages } from "react-intl"
import styled from "styled-components"
import { ModalDialog } from "Core/ui/components/modal-dialog"
import { ModalSize } from "Core/__deprecated__/renderer/components/core/modal/modal.interface"
import { CriticalBatteryLevelModalTestIds } from "Core/connecting/components/critical-battery-level-modal/critical-battery-level-modal-test-ids.enum"
import { IconType } from "Core/__deprecated__/renderer/components/core/icon/icon-type"

const messages = defineMessages({
  criticalBatteryLevelModalHeaderTitle: {
    id: "module.connecting.criticalBatteryLevelModalHeaderTitle",
  },
  criticalBatteryLevelModalButton: {
    id: "module.connecting.criticalBatteryLevelModalButton",
  },
  criticalBatteryLevelModalTitle: {
    id: "module.connecting.criticalBatteryLevelModalTitle",
  },
  criticalBatteryLevelModalDescription: {
    id: "module.connecting.criticalBatteryLevelModalDescription",
  },
})

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  p:first-of-type {
    margin-top: 0;
  }
`
const CriticalBatteryLevelModal: FunctionComponent<
  ComponentProps<typeof ModalDialog>
> = ({ ...props }) => {
  return (
    <ModalDialog
      testId={CriticalBatteryLevelModalTestIds.Container}
      size={ModalSize.Small}
      title={intl.formatMessage(messages.criticalBatteryLevelModalHeaderTitle)}
      closeButtonLabel={intl.formatMessage(
        messages.criticalBatteryLevelModalButton
      )}
      {...props}
    >
      <ModalContent>
        <RoundIconWrapper>
          <Icon type={IconType.NoBattery} width={3.2} />
        </RoundIconWrapper>
        <ModalText
          displayStyle={TextDisplayStyle.Headline4}
          message={messages.criticalBatteryLevelModalTitle}
        />
        <ModalText
          displayStyle={TextDisplayStyle.Paragraph4}
          color="secondary"
          message={messages.criticalBatteryLevelModalDescription}
        />
      </ModalContent>
    </ModalDialog>
  )
}

export default CriticalBatteryLevelModal
