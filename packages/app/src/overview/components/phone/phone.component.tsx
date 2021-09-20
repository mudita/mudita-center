/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { PhoneProps } from "App/overview/components/phone/phone.interface"
import {
  CardAction,
  CardActionButton,
} from "App/overview/components/card.elements"
import { intl } from "Renderer/utils/intl"
import Image from "Renderer/components/core/image/image.component"
import PureImage from "Renderer/images/pure-render.png"
import { useHistory } from "react-router"
import { PhoneTestIds } from "App/overview/components/phone/phone-test-ids.enum"
import {
  PhoneCard,
  PhoneInfo,
  PureSystemButtonContainer,
} from "App/overview/components/phone/phone.styled"
import { URL_MAIN, URL_OVERVIEW } from "Renderer/constants/urls"
import ButtonComponent from "App/renderer/components/core/button/button.component"
import { DisplayStyle } from "App/renderer/components/core/button/button.config"
import { Type } from "App/renderer/components/core/icon/icon.config"

const Phone: FunctionComponent<PhoneProps> = ({
  className,
  onDisconnect,
  onClick,
}) => {
  const history = useHistory()
  const handleDisconnect = () => {
    onDisconnect()
    history.push(URL_MAIN.news)
  }
  const openPureSystem = () => {
    history.push(URL_OVERVIEW.pureSystem)
  }

  return (
    <PhoneCard className={className} onClick={onClick}>
      <PhoneInfo>
        <Image src={PureImage} />
      </PhoneInfo>
      <CardAction>
        <CardActionButton
          active
          label={intl.formatMessage({
            id: "module.overview.phoneDisconnectAction",
          })}
          onClick={handleDisconnect}
          data-testid={PhoneTestIds.DisconnectButton}
        />
      </CardAction>
      <PureSystemButtonContainer>
        <ButtonComponent
          label={intl.formatMessage({
            id: "module.overview.pureSystem",
          })}
          onClick={openPureSystem}
          data-testid={PhoneTestIds.PureSystemButton}
          displayStyle={DisplayStyle.Link2}
          Icon={Type.MenuPhone}
        />
      </PureSystemButtonContainer>
    </PhoneCard>
  )
}

export default Phone
