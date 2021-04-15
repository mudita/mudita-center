/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { PhoneProps } from "Renderer/components/rest/overview/phone/phone.interface"
import {
  CardAction,
  CardActionButton,
} from "Renderer/components/rest/overview/card.elements"
import Image from "Renderer/components/core/image/image.component"
import PureImage from "Renderer/images/pure-render.png"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { defineMessages } from "react-intl"
import { useHistory } from "react-router"
import RangeIcon from "Renderer/components/core/icon/range-icon.component"
import BatteryIcon from "Renderer/components/core/icon/battery-icon.component"
import { PhoneTestIds } from "Renderer/components/rest/overview/phone/phone-test-ids.enum"
import {
  BatteryStats,
  PhoneCard,
  PhoneInfo,
  SignalStats,
  PhoneDescription,
} from "Renderer/components/rest/overview/phone/phone.styled"
import { URL_MAIN } from "Renderer/constants/urls"
import { OverviewTestIds } from "Renderer/modules/overview/overview-test-ids.enum"

const messages = defineMessages({
  battery: { id: "view.name.overview.phone.battery" },
  noConnection: { id: "view.name.overview.phone.noConnection" },
  phoneDescription: { id: "view.name.overview.phone.phoneDescription" },
})

const Phone: FunctionComponent<PhoneProps> = ({
  batteryLevel,
  className,
  network,
  networkLevel = 0,
  onDisconnect,
  onClick,
}) => {
  const history = useHistory()
  const handleDisconnect = () => {
    onDisconnect()
    history.push(URL_MAIN.news)
  }

  const strength = Math.round(networkLevel * 100)

  return (
    <PhoneCard className={className} onClick={onClick}>
      <PhoneInfo>
        <Image src={PureImage} />
        <PhoneDescription
          displayStyle={TextDisplayStyle.LargeBoldText}
          element={"h2"}
          message={messages.phoneDescription}
        />
        <BatteryStats>
          <BatteryIcon width={2.4} level={batteryLevel} />
          <Text
            displayStyle={TextDisplayStyle.LargeBoldText}
            element={"h2"}
            data-testid={OverviewTestIds.BatteryLevel}
          >
            {Math.round(batteryLevel * 100)} %
          </Text>
          <Text
            displayStyle={TextDisplayStyle.SmallFadedText}
            message={messages.battery}
          />
        </BatteryStats>
        <SignalStats>
          <RangeIcon strength={strength} height={2.4} width={2.4} />
          {network ? (
            <Text
              displayStyle={TextDisplayStyle.LargeBoldText}
              data-testid={OverviewTestIds.NetworkName}
            >
              {network}
            </Text>
          ) : (
            <Text
              displayStyle={TextDisplayStyle.LargeBoldText}
              message={messages.noConnection}
            />
          )}
        </SignalStats>
      </PhoneInfo>
      <CardAction>
        <CardActionButton
          active
          labelMessage={{
            id: "view.name.overview.phone.disconnectAction",
          }}
          onClick={handleDisconnect}
          data-testid={PhoneTestIds.DisconnectButton}
        />
      </CardAction>
    </PhoneCard>
  )
}

export default Phone
