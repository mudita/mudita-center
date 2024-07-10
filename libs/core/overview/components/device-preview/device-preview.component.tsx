/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import styled from "styled-components"
import { defineMessages } from "react-intl"
import { useHistory } from "react-router-dom"
import { DeviceType } from "device-protocol/models"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { DevicePreviewProps } from "Core/overview/components/device-preview/device-preview.interface"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { DeviceTestIds } from "Core/overview/components/device-preview/device-preview-test-ids.enum"
import {
  PhoneCard,
  DeviceInfo,
  PureSystemButtonContainer,
  SerialNumberWrapper,
  DeviceCardContentWrapper,
  EmptyBox,
} from "Core/overview/components/device-preview/device-preview.styled"
import { URL_OVERVIEW } from "Core/__deprecated__/renderer/constants/urls"
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
  onClick,
  caseColour,
  deviceType,
  serialNumber,
}) => {
  const serialNumberValue = getSerialNumberValue(serialNumber)
  const serialNumberHeader =
    serialNumberValue !== "" ? intl.formatMessage(messages.serialNumber) : ""
  const history = useHistory()

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

      <EmptyBox />

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
