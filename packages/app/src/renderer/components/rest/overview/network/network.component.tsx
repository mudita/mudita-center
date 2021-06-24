/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { NetworkProps } from "Renderer/components/rest/overview/network/network.interface"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { defineMessages, FormattedMessage } from "react-intl"
import styled from "styled-components"
import { intl } from "Renderer/utils/intl"
import { letterSpacing, textColor } from "Renderer/styles/theming/theme-getters"
import Card, {
  CardAction,
  CardActionButton,
  CardText,
  CardContent,
} from "Renderer/components/rest/overview/card.elements"
import { noop } from "Renderer/utils/noop"
import { SimCard } from "Renderer/models/basic-info/basic-info.typings"
import { ButtonTogglerTestIds } from "Renderer/components/core/button-toggler/button-toggler-test-ids.enum"
import BatteryIcon from "Renderer/components/core/icon/battery-icon.component"
import RangeIcon from "Renderer/components/core/icon/range-icon.component"
import { OverviewTestIds } from "Renderer/modules/overview/overview-test-ids.enum"

const TextInfo = styled(CardText)`
  p {
    margin-top: 1.2rem;
    letter-spacing: ${letterSpacing("small")}rem;
    color: ${textColor("secondary")};
  }
`
const BatteryStats = styled.div`
  margin-top: 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    margin-top: 0.8rem;
    margin-bottom: 0.4rem;
  }
`

const SignalStats = styled.div`
  margin-top: 2.4rem;
  margin-bottom: 6rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    margin-top: 0.8rem;
  }
`

const SimButton: FunctionComponent<SimCard & { onClick: () => void }> = ({
  slot,
  number: phone,
  active,
  onClick,
}) => {
  const label = intl.formatMessage(
    {
      id: "module.overview.networkSimInfo",
    },
    { slot, phone }
  )
  return (
    <CardActionButton
      label={label}
      active={active}
      onClick={onClick}
      data-state={
        active
          ? ButtonTogglerTestIds.ActiveState
          : ButtonTogglerTestIds.InactiveState
      }
    />
  )
}

const NoSimButton = () => {
  const label = intl.formatMessage({
    id: "module.overview.networkNoSimInserted",
  })

  return <CardActionButton label={label} disabled />
}

export const messages = defineMessages({
  tooltipTitle: { id: "module.overview.networkTooltipTitle" },
  tooltipDescription: { id: "module.overview.networkTooltipDescription" },
  battery: { id: "module.overview.phoneBattery" },
  noConnection: { id: "module.overview.phoneNoConnection" },
})

const Network: FunctionComponent<NetworkProps> = ({
  className,
  simCards = [],
  onSimChange = noop,
  batteryLevel,
  network,
  networkLevel = 0,
}) => {
  const noActiveCard = simCards.every(({ active }) => !active)
  const activatingAvailable =
    (simCards.length && noActiveCard) || simCards.length > 1

  const strength = Math.round(networkLevel * 100)
  return (
    <Card className={className}>
      <TextInfo>
        <Text displayStyle={TextDisplayStyle.SecondaryBoldHeading}>
          <FormattedMessage id="module.overview.networkName" />
        </Text>
        {activatingAvailable && (
          <Text displayStyle={TextDisplayStyle.SmallFadedText}>
            <FormattedMessage id="module.overview.networkDescription" />
          </Text>
        )}
      </TextInfo>
      <CardContent>
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
        <CardAction
          tooltipTitle={messages.tooltipTitle}
          tooltipDescription={messages.tooltipDescription}
        >
          {simCards.length ? (
            simCards.map((simCard) => {
              const onClick = () => onSimChange(simCard)
              return (
                <SimButton
                  key={simCard.number}
                  {...simCard}
                  onClick={onClick}
                />
              )
            })
          ) : (
            <NoSimButton />
          )}
        </CardAction>
      </CardContent>
    </Card>
  )
}

export default Network
