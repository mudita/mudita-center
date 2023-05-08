/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { DeviceType } from "App/device/constants"
import { defineMessages, FormattedMessage } from "react-intl"
import styled from "styled-components"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { StatusProps } from "App/overview/components/status/status.interface"
import Text, {
  TextDisplayStyle,
} from "App/__deprecated__/renderer/components/core/text/text.component"
import Card, { CardBody } from "App/overview/components/card.elements"
import BatteryIcon from "App/__deprecated__/renderer/components/core/icon/battery-icon.component"
import RangeIcon from "App/__deprecated__/renderer/components/core/icon/range-icon.component"
import { StatusTestIds } from "App/overview/components/status/status-test-ids.enum"
import {
  backgroundColor,
  borderRadius,
} from "App/__deprecated__/renderer/styles/theming/theme-getters"

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
export const HarmonyStatusLabel = styled(Text).attrs(() => ({
  displayStyle: TextDisplayStyle.Label,
}))`
  margin-left: 1.6rem;
  display: inline-box;
  padding: 0 0.4rem;
  border-radius: ${borderRadius("medium")};
  background-color: ${backgroundColor("disabled")};
`

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
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
  statusLabel: { id: "module.overview.statusHarmonyLabel" },
})

const Status: FunctionComponent<StatusProps> = ({
  deviceType,
  className,
  batteryLevel,
  network,
  networkLevel = 0,
}) => {
  const strength = Math.round(networkLevel * 100)
  const findDuplicatesInNetworkName = (name: string) => {
    const result: string[] = []
    const wordsArray = name.split(" ")
    const count: { [key: string]: number } = {}
    wordsArray.forEach((word) => {
      if (!count[word]) {
        count[word] = 1
      } else {
        count[word] += 1
      }
    })
    const all = Object.keys(count)
    all.forEach((key) => {
      if (count[key] > 1) {
        result.push(key)
      }
    })

    if (result.length === 1) {
      return result[0]
    } else {
      return name
    }
  }
  const displayNetworkName = (name: string): string => {
    const tmobile = "T-Mobile T-Mobile.pl"
    const names: Record<string, string> = {
      [tmobile]: "T-Mobile",
      default: findDuplicatesInNetworkName(name),
    }
    return names[name] || names["default"]
  }

  return (
    <Card className={className}>
      <Text displayStyle={TextDisplayStyle.Headline3}>
        {deviceType === DeviceType.MuditaPure ? (
          <FormattedMessage id="module.overview.statusPureTitle" />
        ) : (
          <FlexContainer>
            <FormattedMessage id="module.overview.statusHarmonyTitle" />
            <HarmonyStatusLabel>
              <FormattedMessage {...messages.statusLabel} />
            </HarmonyStatusLabel>
          </FlexContainer>
        )}
      </Text>
      <CardBody>
        <div>
          <Stats>
            <IconContainer>
              <BatteryIcon
                width={2.6}
                level={batteryLevel}
                deviceType={deviceType}
              />
            </IconContainer>
            <div>
              <Text
                displayStyle={TextDisplayStyle.Headline4}
                element={"h2"}
                data-testid={StatusTestIds.BatteryLevel}
              >
                {Math.round(batteryLevel * 100)} %
              </Text>
              <Text
                displayStyle={TextDisplayStyle.Label}
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
                    displayStyle={TextDisplayStyle.Headline4}
                    data-testid={StatusTestIds.NetworkName}
                  >
                    {displayNetworkName(network)}
                  </Text>
                  <Text
                    displayStyle={TextDisplayStyle.Label}
                    message={messages.network}
                  />
                </div>
              ) : (
                <Text
                  displayStyle={TextDisplayStyle.Headline4}
                  message={messages.noConnection}
                />
              )}
            </Stats>
          )}
        </div>
      </CardBody>
    </Card>
  )
}

export default Status
