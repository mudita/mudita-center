import React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import { SystemProps } from "Renderer/components/rest/overview/system/system.interface"
import Card, {
  CardAction,
  CardActionButton,
  CardText,
} from "Renderer/components/rest/overview/card.elements"
import styled from "styled-components"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { FormattedMessage } from "react-intl"
import { intl } from "Renderer/utils/intl"
import Reload from "Renderer/svg/circle-arrow.svg"
import { letterSpacing } from "Renderer/styles/theming/theme-getters"
import { noop } from "Renderer/utils/noop"

const TextInfo = styled(CardText)``

const Version = styled.div`
  display: flex;
  align-items: baseline;

  span {
    margin-left: 0.8rem;
  }
`

const LastUpdate = styled(Text)`
  margin-top: 2.4rem;
  letter-spacing: ${letterSpacing("regular")}rem;
`

const System: FunctionComponent<SystemProps> = ({
  className,
  osVersion,
  lastUpdate,
  onUpdatesCheck = noop,
}) => {
  const date = lastUpdate
    ? new Date(lastUpdate).toLocaleDateString("en-US")
    : undefined
  const checkUpdates = () => onUpdatesCheck()

  return (
    <Card className={className}>
      <TextInfo>
        <Version>
          <Text displayStyle={TextDisplayStyle.SecondaryBoldHeading}>
            {osVersion}
          </Text>
          <Text element={"span"} displayStyle={TextDisplayStyle.LargeText}>
            <FormattedMessage id="view.name.overview.system.version" />
          </Text>
        </Version>
        {Boolean(lastUpdate) && (
          <LastUpdate displayStyle={TextDisplayStyle.MediumText}>
            <FormattedMessage
              id="view.name.overview.system.lastUpdate"
              values={{ date }}
            />
          </LastUpdate>
        )}
      </TextInfo>
      <CardAction filled>
        <CardActionButton
          active
          label={intl.formatMessage({
            id: "view.name.overview.system.checkForUpdates",
          })}
          Icon={Reload}
          onClick={checkUpdates}
        />
      </CardAction>
    </Card>
  )
}

export default System
