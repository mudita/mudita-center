/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import { defineMessages } from "react-intl"
import styled from "styled-components"
import { intl } from "Renderer/utils/intl"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import ModalDialog from "Renderer/components/core/modal-dialog/modal-dialog.component"
import { ModalSize } from "Renderer/components/core/modal/modal.interface"
import Icon from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { ModalText } from "App/contacts/components/sync-contacts-modal/sync-contacts.styled"
import Loader from "Renderer/components/core/loader/loader.component"
import { LoaderType } from "Renderer/components/core/loader/loader.interface"
import { RoundIconWrapper } from "Renderer/components/core/modal-shared/modal-shared"
import { Size } from "App/renderer/components/core/button/button.config"
import { DeviceType } from "@mudita/pure"

const messages = defineMessages({
  muditaOsUpdateTitle: {
    id: "module.overview.muditaOsUpdateTitle",
  },
  updatingForceActionButton: {
    id: "module.overview.updatingForceActionButton",
  },
  updatingForceTitle: {
    id: "module.overview.updatingForceTitle",
  },
  updatingForceDescription: {
    id: "module.overview.updatingForceDescription",
  },
  updatingProgressTitle: {
    id: "module.overview.updatingProgressTitle",
  },
  updatingProgressDescription: {
    id: "module.overview.updatingProgressDescription",
  },
  updatingFailedTitle: {
    id: "module.overview.updatingFailedTitle",
  },
  updatingFailedDescription: {
    id: "module.overview.updatingFailedDescription",
  },
  updatingFailedSupportButton: {
    id: "module.overview.updatingFailedSupportButton",
  },
  updatingFailedHelpButton: {
    id: "module.overview.updatingFailedHelpButton",
  },
  updatingFailedOnlySupportDescription: {
    id: "module.overview.updatingFailedOnlySupportDescription",
  },
  updatingSuccessTitle: {
    id: "module.overview.updatingSuccessTitle",
  },
  updatingSuccessDescription: {
    id: "module.overview.updatingSuccessDescription",
  },
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
    id: "module.overview.updatingFlatBatteryHarmonyDescription",
  },
  updatingFlatBatteryHarmonyDescription: {
    id: "module.overview.updatingFlatBatteryHarmonyDescription",
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

const OSUpdateModal: FunctionComponent<ComponentProps<typeof ModalDialog>> = ({
  children,
  size = ModalSize.Small,
  ...props
}) => (
  <ModalDialog
    size={size}
    title={intl.formatMessage(messages.muditaOsUpdateTitle)}
    {...props}
  >
    <ModalContent>{children}</ModalContent>
  </ModalDialog>
)

export const UpdatingForceModal: FunctionComponent<
  ComponentProps<typeof ModalDialog>
> = (props) => {
  return (
    <OSUpdateModal
      closeButton={false}
      closeable={false}
      actionButtonLabel={intl.formatMessage(messages.updatingForceActionButton)}
      {...props}
    >
      <RoundIconWrapper>
        <Icon type={Type.Pure} width={4} />
      </RoundIconWrapper>
      <ModalText
        displayStyle={TextDisplayStyle.LargeBoldText}
        message={messages.updatingForceTitle}
      />
      <ModalText
        displayStyle={TextDisplayStyle.MediumFadedText}
        message={messages.updatingForceDescription}
      />
    </OSUpdateModal>
  )
}

export const UpdatingSpinnerModal: FunctionComponent<
  ComponentProps<typeof ModalDialog>
> = (props) => {
  return (
    <OSUpdateModal closeButton={false} closeable={false} {...props}>
      <RoundIconWrapper>
        <Loader type={LoaderType.Spinner} size={6} />
      </RoundIconWrapper>
      <ModalText
        displayStyle={TextDisplayStyle.LargeBoldText}
        message={messages.updatingProgressTitle}
      />
      <ModalText
        displayStyle={TextDisplayStyle.MediumFadedText}
        message={messages.updatingProgressDescription}
      />
    </OSUpdateModal>
  )
}

interface UpdatingFailureWithHelpModalProps
  extends ComponentProps<typeof ModalDialog> {
  onContact: () => void
  onHelp: () => void
}

export const UpdatingFailureWithHelpModal = ({
  onContact,
  onHelp,
  onClose,
  ...props
}: UpdatingFailureWithHelpModalProps) => {
  const handleOnClose = (): void => {
    if (onClose) {
      onClose()
    }
  }

  return (
    <OSUpdateModal
      closeButton
      title={intl.formatMessage(messages.muditaOsUpdateTitle)}
      onCloseButton={onContact}
      closeButtonLabel={intl.formatMessage(
        messages.updatingFailedSupportButton
      )}
      onActionButtonClick={onHelp}
      actionButtonLabel={intl.formatMessage(messages.updatingFailedHelpButton)}
      onClose={handleOnClose}
      actionButtonSize={Size.FixedMedium}
      {...props}
    >
      <RoundIconWrapper>
        <Icon type={Type.Fail} width={4} />
      </RoundIconWrapper>
      <Text
        displayStyle={TextDisplayStyle.LargeBoldText}
        message={messages.updatingFailedTitle}
      />
      <Text
        displayStyle={TextDisplayStyle.MediumFadedText}
        message={messages.updatingFailedDescription}
      />
    </OSUpdateModal>
  )
}

export const UpdatingSuccessModal: FunctionComponent<
  ComponentProps<typeof ModalDialog>
> = (props) => {
  return (
    <OSUpdateModal {...props}>
      <RoundIconWrapper>
        <Icon type={Type.Pure} width={4} />
      </RoundIconWrapper>
      <Text
        displayStyle={TextDisplayStyle.LargeBoldText}
        message={messages.updatingSuccessTitle}
      />
      <ModalText
        displayStyle={TextDisplayStyle.MediumFadedText}
        message={messages.updatingSuccessDescription}
      />
    </OSUpdateModal>
  )
}

interface TooLowBatteryModalModalProps
  extends ComponentProps<typeof ModalDialog> {
  onCancel?: () => void
  deviceType?: DeviceType
}

export const TooLowBatteryModal: FunctionComponent<
  TooLowBatteryModalModalProps
> = ({ onCancel, deviceType, ...props }) => {
  return (
    <OSUpdateModal
      closeButtonLabel={intl.formatMessage(
        messages.updatingFlatBatteryActionButton
      )}
      title={intl.formatMessage(messages.muditaOsUpdateTitle)}
      size={ModalSize.Small}
      onCloseButton={onCancel}
      {...props}
    >
      <ModalContent>
        <RoundIconWrapper>
          <Icon type={Type.NoBattery} width={5} />
        </RoundIconWrapper>
        {deviceType === DeviceType.MuditaPure ? (
          <>
            <ModalText displayStyle={TextDisplayStyle.LargeBoldText}>
              {intl.formatMessage(messages.updatingFlatBatteryPureTitle)}
            </ModalText>
            <ModalText displayStyle={TextDisplayStyle.MediumFadedLightText}>
              {intl.formatMessage(messages.updatingFlatBatteryPureDescription)}
            </ModalText>
          </>
        ) : (
          <>
            <ModalText displayStyle={TextDisplayStyle.LargeBoldText}>
              {intl.formatMessage(messages.updatingFlatBatteryHarmonyTitle)}
            </ModalText>
            <ModalText displayStyle={TextDisplayStyle.MediumFadedLightText}>
              {intl.formatMessage(
                messages.updatingFlatBatteryHarmonyDescription
              )}
            </ModalText>
          </>
        )}
      </ModalContent>
    </OSUpdateModal>
  )
}
