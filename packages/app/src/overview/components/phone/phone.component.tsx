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
} from "App/overview/components/phone/phone.styled"
import { URL_MAIN } from "Renderer/constants/urls"

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
  return (
    <PhoneCard className={className} onClick={onClick}>
      <PhoneInfo>
        {caseColour === "gray" ? (
          <Image src={PureGrayImage} data-testid={PhoneTestIds.PureGray}/>
        ) : (
          <Image src={PureBlackImage} data-testid={PhoneTestIds.PureBlack}/>
        )}
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
    </PhoneCard>
  )
}

export default Phone
