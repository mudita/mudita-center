/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import styled from "styled-components"
import { defineMessages } from "react-intl"
import { DeviceType } from "Core/device/constants"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { DevicePreviewProps } from "Core/overview/components/device-preview/device-preview.interface"
import {
  CardAction,
  CardActionButton,
} from "Core/overview/components/card.elements"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { useHistory } from "react-router"
import { DeviceTestIds } from "Core/overview/components/device-preview/device-preview-test-ids.enum"
import {
  PhoneCard,
  DeviceInfo,
  PureSystemButtonContainer,
  SerialNumberWrapper,
  DeviceCardContentWrapper,
} from "Core/overview/components/device-preview/device-preview.styled"
import {
  URL_MAIN,
  URL_OVERVIEW,
} from "Core/__deprecated__/renderer/constants/urls"
import Button from "Core/__deprecated__/renderer/components/core/button/button.component"
import { DisplayStyle } from "Core/__deprecated__/renderer/components/core/button/button.config"
import { DeviceImage } from "Core/overview/components/device-preview/device-image.component"
import Text, {
  TextDisplayStyle,
} from "Core/__deprecated__/renderer/components/core/text/text.component"
import { IconSize } from "Core/__deprecated__/renderer/components/core/icon/icon.component"
import { IconType } from "Core/__deprecated__/renderer/components/core/icon/icon-type"
import { getSerialNumberValue } from "Core/utils/get-serial-number-value"

const messages = defineMessages({
  serialNumber: { id: "module.overview.serialNumber" },
  phoneDisconnectAction: { id: "module.overview.phoneDisconnectAction" },
  pureSystem: { id: "module.overview.pureSystem" },
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
  const serialNumberValue = getSerialNumberValue(serialNumber)
  const serialNumberHeader =
    serialNumberValue !== "" ? intl.formatMessage(messages.serialNumber) : ""
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
      <DeviceCardContentWrapper>
        <DeviceInfo>
          <DeviceImage caseColour={caseColour} deviceType={deviceType} />
        </DeviceInfo>

        <SerialNumberWrapper>
          <Text displayStyle={TextDisplayStyle.Paragraph4} color="secondary">
            {serialNumberHeader}
          </Text>
          <Text
            displayStyle={TextDisplayStyle.Paragraph1}
            testId={DeviceTestIds.SerialNumber}
          >
            {serialNumberValue}
          </Text>
        </SerialNumberWrapper>
      </DeviceCardContentWrapper>

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
