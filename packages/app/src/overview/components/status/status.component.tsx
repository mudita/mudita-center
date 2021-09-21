/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { DeviceType } from "@mudita/pure"
import { defineMessages, FormattedMessage } from "react-intl"
import styled from "styled-components"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { StatusProps } from "App/overview/components/status/status.interface"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { letterSpacing, textColor } from "Renderer/styles/theming/theme-getters"
import Card, {
  CardText,
  CardContent,
} from "App/overview/components/card.elements"
import BatteryIcon from "Renderer/components/core/icon/battery-icon.component"
import RangeIcon from "Renderer/components/core/icon/range-icon.component"
import { StatusTestIds } from "App/overview/components/status/status-test-ids.enum"
import { backgroundColor } from "Renderer/styles/theming/theme-getters"

const TextInfo = styled(CardText)`
  p {
    margin-top: 1.2rem;
    letter-spacing: ${letterSpacing("small")}rem;
    color: ${textColor("secondary")};
  }
`
const Stats = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  p {
    margin-top: 0.4rem;
  }
  &:not(:last-child) {
    margin-bottom: 1.6rem;
  }
`

const IconContainer = styled.div`
  background-color: ${backgroundColor("main")};
  margin-right: 1.6rem;
  padding: 0.7rem;
`

const messages = defineMessages({
  tooltipTitle: { id: "module.overview.networkTooltipTitle" },
  tooltipDescription: { id: "module.overview.networkTooltipDescription" },
  battery: { id: "module.overview.phoneBattery" },
  noConnection: { id: "module.overview.phoneNoConnection" },
  network: { id: "module.overview.networkName" },
})

const Status: FunctionComponent<StatusProps> = ({
  deviceType,
  className,
  batteryLevel,
  network,
  networkLevel = 0,
}) => {
  const strength = Math.round(networkLevel * 100)

  return (
    <Card className={className}>
      <TextInfo>
        <Text displayStyle={TextDisplayStyle.SecondaryBoldHeading}>
          {deviceType === DeviceType.MuditaPure ? (
            <FormattedMessage id="module.overview.statusPureTitle" />
          ) : (
            <FormattedMessage id="module.overview.statusHarmonyTitle" />
          )}
        </Text>
      </TextInfo>
      <CardContent>
        <div>
          <Stats>
            <IconContainer>
              <BatteryIcon width={2.6} level={batteryLevel} />
            </IconContainer>
            <div>
              <Text
                displayStyle={TextDisplayStyle.LargeBoldText}
                element={"h2"}
                data-testid={StatusTestIds.BatteryLevel}
              >
                {Math.round(batteryLevel * 100)} %
              </Text>
              <Text
                displayStyle={TextDisplayStyle.SmallFadedText}
                message={messages.battery}
              />
            </div>
          </Stats>
          {deviceType === DeviceType.MuditaPure && (
            <Stats>
              <IconContainer>
                <RangeIcon strength={strength} height={2.6} width={2.6} />
              </IconContainer>
              {network ? (
                <div>
                  <Text
                    displayStyle={TextDisplayStyle.LargeBoldText}
                    data-testid={StatusTestIds.NetworkName}
                  >
                    {network}
                  </Text>
                  <Text
                    displayStyle={TextDisplayStyle.SmallFadedText}
                    message={messages.network}
                  />
                </div>
              ) : (
                <Text
                  displayStyle={TextDisplayStyle.LargeBoldText}
                  message={messages.noConnection}
                />
              )}
            </Stats>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default Status
