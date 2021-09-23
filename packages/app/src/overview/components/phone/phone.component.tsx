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
import PureGrayImage from "Renderer/images/pure-gray-front.png"
import PureBlackImage from "Renderer/images/pure-black-front.png"
import { useHistory } from "react-router"
import { PhoneTestIds } from "App/overview/components/phone/phone-test-ids.enum"
import {
  PhoneCard,
  PhoneInfo,
  PureSystemButtonContainer,
} from "App/overview/components/phone/phone.styled"
import { CaseColour } from "@mudita/pure"
import { URL_MAIN, URL_OVERVIEW } from "Renderer/constants/urls"
import ButtonComponent from "App/renderer/components/core/button/button.component"
import { DisplayStyle } from "App/renderer/components/core/button/button.config"
import { Type } from "App/renderer/components/core/icon/icon.config"
import { flags, Feature } from "App/feature-flags"

const productionEnvironment = flags.get(Feature.DisabledOnProduction)

const Phone: FunctionComponent<PhoneProps> = ({
  className,
  onDisconnect,
  onClick,
  caseColour,
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
        {productionEnvironment ? 
        <Image src={PureGrayImage} data-testid={PhoneTestIds.PureGray} /> : 
        (caseColour === CaseColour.Gray ? (
          <Image src={PureGrayImage} data-testid={PhoneTestIds.PureGray} />
        ) : (
          <Image src={PureBlackImage} data-testid={PhoneTestIds.PureBlack} />
        ))}
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
      {!productionEnvironment &&
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
      </PureSystemButtonContainer>}
    </PhoneCard>
  )
}

export default Phone
