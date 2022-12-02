/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import styled from "styled-components"
import { DeviceType } from "App/device/constants"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { DevicePreviewProps } from "App/overview/components/device-preview/device-preview.interface"
import {
  CardAction,
  CardActionButton,
} from "App/overview/components/card.elements"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import { useHistory } from "react-router"
import { DeviceTestIds } from "App/overview/components/device-preview/device-preview-test-ids.enum"
import {
  PhoneCard,
  DeviceInfo,
  PureSystemButtonContainer,
  SerialNumberWrapper,
} from "App/overview/components/device-preview/device-preview.styled"
import {
  URL_MAIN,
  URL_OVERVIEW,
} from "App/__deprecated__/renderer/constants/urls"
import Button from "App/__deprecated__/renderer/components/core/button/button.component"
import { DisplayStyle } from "App/__deprecated__/renderer/components/core/button/button.config"
import { DeviceImage } from "App/overview/components/device-preview/device-image.component"
import Text, {
  TextDisplayStyle,
} from "App/__deprecated__/renderer/components/core/text/text.component"
import { IconSize } from "App/__deprecated__/renderer/components/core/icon/icon.component"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"
import { defineMessages } from "react-intl"

const messages = defineMessages({
  serialNumber: { id: "module.overview.serialNumber" },
  phoneDisconnectAction: { id: "module.overview.phoneDisconnectAction" },
  pureSystem: { id: "module.overview.pureSystem" },
  noSerialNumberMessage: { id: "module.overview.noSerialNumberMessage" },
})

const DeviceSystemButton = styled(Button)`
  width: auto;
`

export const DevicePreview: FunctionComponent<DevicePreviewProps> = ({
  className,
  onDisconnect,
  onClick,
  caseColour,
  deviceType,
  serialNumber,
}) => {
  const history = useHistory()
  const handleDisconnect = () => {
    onDisconnect()
    history.push(URL_MAIN.news)
  }

  const openPureSystem = () => {
    history.push(URL_OVERVIEW.pureSystem)
  }

  if (!deviceType) {
    return <></>
  }

  return (
    <PhoneCard className={className} onClick={onClick}>
      <DeviceInfo>
        <DeviceImage caseColour={caseColour} deviceType={deviceType} />
      </DeviceInfo>

      <SerialNumberWrapper>
        <Text
          displayStyle={TextDisplayStyle.Paragraph4}
          color="secondary"
          message={messages.serialNumber}
        />
        <Text
          displayStyle={TextDisplayStyle.Paragraph1}
          testId={DeviceTestIds.SerialNumber}
        >
          {serialNumber
            ? serialNumber
            : intl.formatMessage(messages.noSerialNumberMessage)}
        </Text>
      </SerialNumberWrapper>

      <CardAction>
        <CardActionButton
          active
          label={intl.formatMessage(messages.phoneDisconnectAction)}
          onClick={handleDisconnect}
          data-testid={DeviceTestIds.DisconnectButton}
        />
      </CardAction>
      {deviceType === DeviceType.MuditaPure && (
        <PureSystemButtonContainer>
          <DeviceSystemButton
            label={intl.formatMessage(messages.pureSystem)}
            onClick={openPureSystem}
            data-testid={DeviceTestIds.PureSystemButton}
            displayStyle={DisplayStyle.LinkWithParagraph}
            Icon={IconType.MenuPhone}
            iconSize={IconSize.Bigger}
          />
        </PureSystemButtonContainer>
      )}
    </PhoneCard>
  )
}
