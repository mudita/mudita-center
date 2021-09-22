/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { DeviceType } from "@mudita/pure"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { DevicePreviewProps } from "App/overview/components/device-preview/device-preview.interface"
import {
  CardAction,
  CardActionButton,
} from "App/overview/components/card.elements"
import { intl } from "Renderer/utils/intl"
import Image from "Renderer/components/core/image/image.component"
import PureImage from "Renderer/images/pure-render.png"
import HarmonyImage from "Renderer/images/harmony-render.png"
import { useHistory } from "react-router"
import { DeviceTestIds } from "App/overview/components/device-preview/device-preview-test-ids.enum"
import {
  PhoneCard,
  PhoneInfo,
  PureSystemButtonContainer,
} from "App/overview/components/device-preview/device-preview.styled"
import { URL_MAIN, URL_OVERVIEW } from "Renderer/constants/urls"
import ButtonComponent from "App/renderer/components/core/button/button.component"
import { DisplayStyle } from "App/renderer/components/core/button/button.config"
import { Type } from "App/renderer/components/core/icon/icon.config"

export const DevicePreview: FunctionComponent<DevicePreviewProps> = ({
  className,
  onDisconnect,
  onClick,
  deviceType,
}) => {
  const history = useHistory()
  const handleDisconnect = () => {
    onDisconnect()
    history.push(URL_MAIN.news)
  }
  const openPureSystem = () => {
    history.push(URL_OVERVIEW.pureSystem)
  }

  const renderMapper = {
    [DeviceType.MuditaPure]: PureImage,
    [DeviceType.MuditaHarmony]: HarmonyImage,
  }

  if (!deviceType) {
    return <></>
  }

  return (
    <PhoneCard className={className} onClick={onClick}>
      <PhoneInfo>
        <Image src={renderMapper[deviceType]} />
      </PhoneInfo>
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
          <ButtonComponent
            label={intl.formatMessage({
              id: "module.overview.pureSystem",
            })}
            onClick={openPureSystem}
            data-testid={DeviceTestIds.PureSystemButton}
            displayStyle={DisplayStyle.Link2}
            Icon={Type.MenuPhone}
          />
        </PureSystemButtonContainer>
      )}
    </PhoneCard>
  )
}
