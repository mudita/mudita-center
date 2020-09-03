import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
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
import {
  fontWeight,
  letterSpacing,
  textColor,
} from "Renderer/styles/theming/theme-getters"
import { noop } from "Renderer/utils/noop"
import { Type } from "Renderer/components/core/icon/icon.config"

const TextInfo = styled(CardText)``

const Version = styled.div`
  display: flex;
  align-items: baseline;

  span {
    margin-left: 0.8rem;
    font-weight: ${fontWeight("light")};
    text-transform: none;
  }
`

const LastUpdate = styled(Text)`
  margin-top: 1.2rem;
  letter-spacing: ${letterSpacing("small")}rem;
  color: ${textColor("secondary")};
`

const AvailableUpdate = styled(Text)`
  margin-top: 1.6rem;
  text-transform: none;
  letter-spacing: ${letterSpacing("small")}rem;
`

const System: FunctionComponent<SystemProps> = ({
  className,
  osVersion,
  lastUpdate,
  updateAvailable,
  updateDownloaded,
  onUpdateCheck = noop,
  onUpdate = noop,
  onDownload = noop,
}) => {
  return (
    <Card className={className}>
      <TextInfo>
        <Version>
          <Text displayStyle={TextDisplayStyle.SecondaryBoldHeading}>
            {osVersion}
          </Text>
          <Text element={"span"} displayStyle={TextDisplayStyle.SmallText}>
            <FormattedMessage id="view.name.overview.system.version" />
          </Text>
        </Version>
        {Boolean(lastUpdate) && (
          <LastUpdate displayStyle={TextDisplayStyle.SmallFadedText}>
            <FormattedMessage
              id="view.name.overview.system.lastUpdate"
              values={{ date: lastUpdate }}
            />
          </LastUpdate>
        )}
        {updateAvailable && (
          <AvailableUpdate displayStyle={TextDisplayStyle.SmallText}>
            {updateDownloaded ? (
              <FormattedMessage id="view.name.overview.system.updateDownloaded" />
            ) : (
              <FormattedMessage id="view.name.overview.system.updateAvailable" />
            )}
          </AvailableUpdate>
        )}
      </TextInfo>
      <CardAction filled>
        {updateAvailable ? (
          updateDownloaded ? (
            <CardActionButton
              active
              label={intl.formatMessage({
                id: "view.name.overview.system.updateAction",
              })}
              Icon={Type.Reload}
              onClick={onUpdate}
              // iconSize={IconSize.Small}
            />
          ) : (
            <CardActionButton
              active
              label={intl.formatMessage({
                id: "view.name.overview.system.downloadAction",
              })}
              Icon={Type.DownloadWhite}
              onClick={onDownload}
              // iconSize={IconSize.Small}
            />
          )
        ) : (
          <CardActionButton
            active
            label={intl.formatMessage({
              id: "view.name.overview.system.checkForUpdates",
            })}
            Icon={Type.Reload}
            onClick={onUpdateCheck}
            // iconSize={IconSize.Small}
          />
        )}
      </CardAction>
    </Card>
  )
}

export default System
