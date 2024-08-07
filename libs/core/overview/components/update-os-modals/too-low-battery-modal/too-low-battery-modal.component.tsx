/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ModalText } from "Core/contacts/components/sync-contacts-modal/sync-contacts.styled"
import { DeviceType } from "device-protocol/models"
import { OSUpdateModal } from "Core/overview/components/update-os-modals/os-update-modal"
import { TooLowBatteryModalProps } from "Core/overview/components/update-os-modals/too-low-battery-modal/too-low-battery-modal.interface"
import { RoundIconWrapper } from "Core/ui/components/modal-dialog"
import { IconType } from "Core/__deprecated__/renderer/components/core/icon/icon-type"
import Icon from "Core/__deprecated__/renderer/components/core/icon/icon.component"
import { TextDisplayStyle } from "Core/__deprecated__/renderer/components/core/text/text.component"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import React from "react"
import { defineMessages } from "react-intl"

const messages = defineMessages({
  updatingFlatBatteryPureTitle: {
    id: "module.overview.updatingFlatBatteryPureTitle",
  },
  updatingFlatBatteryPureDescription: {
    id: "module.overview.updatingFlatBatteryPureDescription",
  },
  updatingFlatBatteryActionButton: {
    id: "module.overview.updatingFlatBatteryActionButton",
  },
  updatingFlatBatteryHarmonyTitle: {
    id: "module.overview.updatingFlatBatteryHarmonyTitle",
  },
  updatingFlatBatteryHarmonyDescription: {
    id: "module.overview.updatingFlatBatteryHarmonyDescription",
  },
})

export const TooLowBatteryModal: FunctionComponent<TooLowBatteryModalProps> = ({
  deviceType,
  onClose,
  open,
  testId,
  ...rest
}) => {
  return (
    <OSUpdateModal
      testId={testId}
      open={open}
      closeButton
      closeable
      closeModal={onClose}
      closeButtonLabel={intl.formatMessage(
        messages.updatingFlatBatteryActionButton
      )}
      {...rest}
    >
      <RoundIconWrapper>
        <Icon type={IconType.NoBattery} width={3.2} />
      </RoundIconWrapper>
      {deviceType === DeviceType.MuditaPure ? (
        <>
          <ModalText displayStyle={TextDisplayStyle.Headline4}>
            {intl.formatMessage(messages.updatingFlatBatteryPureTitle)}
          </ModalText>
          <ModalText
            displayStyle={TextDisplayStyle.Paragraph4}
            color="secondary"
          >
            {intl.formatMessage(messages.updatingFlatBatteryPureDescription)}
          </ModalText>
        </>
      ) : (
        <>
          <ModalText displayStyle={TextDisplayStyle.Headline4}>
            {intl.formatMessage(messages.updatingFlatBatteryHarmonyTitle)}
          </ModalText>
          <ModalText
            displayStyle={TextDisplayStyle.Paragraph4}
            color="secondary"
          >
            {intl.formatMessage(messages.updatingFlatBatteryHarmonyDescription)}
          </ModalText>
        </>
      )}
    </OSUpdateModal>
  )
}
