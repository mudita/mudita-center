/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import styled from "styled-components"
import { DeviceType } from "@mudita/pure"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { DevicePreviewProps } from "App/overview/components/device-preview/device-preview.interface"
import {
  CardAction,
  CardActionButton,
} from "App/overview/components/card.elements"
import { intl } from "Renderer/utils/intl"
import { useHistory } from "react-router"
import { DeviceTestIds } from "App/overview/components/device-preview/device-preview-test-ids.enum"
import {
  PhoneCard,
  PhoneInfo,
  HarmonyInfo,
  PureSystemButtonContainer,
  SerialNumberWrapper,
} from "App/overview/components/device-preview/device-preview.styled"
import { URL_MAIN, URL_OVERVIEW } from "Renderer/constants/urls"
import Button from "App/renderer/components/core/button/button.component"
import { DisplayStyle } from "App/renderer/components/core/button/button.config"
import { DeviceImage } from "App/overview/components/device-preview/device-image.component"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { IconSize } from "Renderer/components/core/icon/icon.component"
import { IconType } from "Renderer/components/core/icon/icon-type"

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
      {deviceType === DeviceType.MuditaPure ? (
        <PhoneInfo>
          <DeviceImage caseColour={caseColour} deviceType={deviceType} />
        </PhoneInfo>
      ) : (
        <HarmonyInfo>
          <DeviceImage caseColour={caseColour} deviceType={deviceType} />
        </HarmonyInfo>
      )}
      {deviceType === DeviceType.MuditaPure && (
        <SerialNumberWrapper>
          <Text
            displayStyle={TextDisplayStyle.Paragraph4}
            color="secondary"
            message={{
              id: "module.overview.serialNumber",
            }}
          />
          <Text displayStyle={TextDisplayStyle.Paragraph1}>{serialNumber}</Text>
        </SerialNumberWrapper>
      )}
      <CardAction>
        <CardActionButton
          active
          label={intl.formatMessage({
            id: "module.overview.phoneDisconnectAction",
          })}
          onClick={handleDisconnect}
          data-testid={DeviceTestIds.DisconnectButton}
        />
      </CardAction>
      {deviceType === DeviceType.MuditaPure && (
        <PureSystemButtonContainer>
          <DeviceSystemButton
            label={intl.formatMessage({
              id: "module.overview.pureSystem",
            })}
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
