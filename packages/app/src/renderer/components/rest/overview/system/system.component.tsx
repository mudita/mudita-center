/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { SystemProps } from "Renderer/components/rest/overview/system/system.interface"
import Card, {
  CardAction,
  CardActionButton,
  CardText,
  CardContent,
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
  backgroundColor,
} from "Renderer/styles/theming/theme-getters"
import { noop } from "Renderer/utils/noop"
import { SystemTestIds } from "Renderer/components/rest/overview/system/system-test-ids"
import { OverviewTestIds } from "Renderer/modules/overview/overview-test-ids.enum"

const TextInfo = styled(CardText)``

const Version = styled.div`
  span {
    margin-left: 0.8rem;
    font-weight: ${fontWeight("light")};
    text-transform: none;
  }
  p {
    margin-bottom: 0.8rem;
  }
`

const AvailableUpdate = styled(Text)`
  margin-top: 1.6rem;
  text-transform: none;
  display: inline-box;
  padding: 0.3rem 0.5rem;
  border-radius: 4px;
  letter-spacing: ${letterSpacing("small")}rem;
  background-color: ${backgroundColor("minor")};
`

const System: FunctionComponent<SystemProps> = ({
  className,
  osVersion,
  updateAvailable,
  updateDownloaded,
  onUpdateCheck = noop,
  onUpdate = noop,
  onDownload = noop,
}) => {
  const releaseNumber = osVersion.slice(8)

  return (
    <Card className={className}>
      <div>
        <Text displayStyle={TextDisplayStyle.SecondaryBoldHeading}>
          <FormattedMessage id="module.overview.muditaOsUpdateTitle" />
        </Text>
      </div>
      <CardContent>
        <TextInfo>
          <Version>
            <Text displayStyle={TextDisplayStyle.MediumFadedLightText}>
              Current version:
            </Text>
            <Text
              displayStyle={TextDisplayStyle.LargeText}
              data-testid={OverviewTestIds.OsVersion}
            >
              <FormattedMessage id="module.overview.muditaOsUpdateTitle" />
              {" " + releaseNumber}
            </Text>
          </Version>
          {updateAvailable ? (
            <AvailableUpdate displayStyle={TextDisplayStyle.SmallFadedText}>
              {updateDownloaded ? (
                <FormattedMessage id="module.overview.systemUpdateDownloaded" />
              ) : (
                <FormattedMessage id="module.overview.systemUpdateAvailable" />
              )}
            </AvailableUpdate>
          ) : (
            <AvailableUpdate displayStyle={TextDisplayStyle.SmallFadedText}>
              <FormattedMessage id="module.overview.systemUpdateUpToDate" />
            </AvailableUpdate>
          )}
        </TextInfo>
        <CardAction filled>
          {updateAvailable ? (
            updateDownloaded ? (
              <CardActionButton
                active
                label={intl.formatMessage({
                  id: "module.overview.systemUpdateAction",
                })}
                onClick={onUpdate}
              />
            ) : (
              <CardActionButton
                active
                label={intl.formatMessage({
                  id: "module.overview.systemDownloadAction",
                })}
                onClick={onDownload}
                data-testid={SystemTestIds.DownloadButton}
              />
            )
          ) : (
            <CardActionButton
              active
              label={intl.formatMessage({
                id: "module.overview.systemCheckForUpdates",
              })}
              onClick={onUpdateCheck}
            />
          )}
        </CardAction>
      </CardContent>
    </Card>
  )
}

export default System
