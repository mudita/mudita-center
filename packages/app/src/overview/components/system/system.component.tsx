/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import Card, {
  CardAction,
  CardActionButton,
  CardBody,
  CardContent,
  CardHeader,
  CardText,
} from "App/overview/components/card.elements"
import styled from "styled-components"
import Text, {
  TextDisplayStyle,
} from "App/__deprecated__/renderer/components/core/text/text.component"
import { defineMessages, FormattedMessage } from "react-intl"
import {
  backgroundColor,
  borderRadius,
} from "App/__deprecated__/renderer/styles/theming/theme-getters"
import { noop } from "App/__deprecated__/renderer/utils/noop"
import { SystemTestIds } from "App/overview/components/system/system-test-ids.enum"

const messages = defineMessages({
  muditaOsUpdateTitle: {
    id: "module.overview.muditaOsUpdateTitle",
  },
  systemVersionTitle: {
    id: "module.overview.systemVersionTitle",
  },
  systemUpdateDownloaded: {
    id: "module.overview.systemUpdateDownloaded",
  },
  systemUpdateAvailable: {
    id: "module.overview.systemUpdateAvailable",
  },
  systemUpdateUpToDate: {
    id: "module.overview.systemUpdateUpToDate",
  },
  systemUpdateAction: {
    id: "module.overview.systemUpdateAction",
  },

  systemDownloadAction: {
    id: "module.overview.systemDownloadAction",
  },
  systemCheckForUpdates: {
    id: "module.overview.systemCheckForUpdates",
  },
})

const AvailableUpdateText = styled(Text).attrs(() => ({
  displayStyle: TextDisplayStyle.Label,
  color: "secondary",
}))`
  margin-left: 1.6rem;
  text-transform: none;
  display: inline-box;
  padding: 0.3rem 0.5rem;
  border-radius: ${borderRadius("medium")};
  background-color: ${backgroundColor("minor")};
`

interface Props {
  osVersion?: string
  onUpdateCheck?: () => void
  onUpdate?: () => void
  onDownload?: () => void
  updateAvailable?: boolean
  updateDownloaded?: boolean
}

const System: FunctionComponent<Props> = ({
  osVersion = "",
  updateAvailable,
  updateDownloaded,
  onUpdateCheck = noop,
  onUpdate = noop,
  onDownload = noop,
  ...props
}) => {
  return (
    <Card {...props}>
      <CardHeader>
        <FormattedMessage {...messages.muditaOsUpdateTitle} />
      </CardHeader>
      <CardBody>
        <CardContent>
          <CardText>
            <Text displayStyle={TextDisplayStyle.Paragraph4} color="secondary">
              <FormattedMessage {...messages.systemVersionTitle} />
            </Text>
            <Text
              displayStyle={TextDisplayStyle.Paragraph1}
              data-testid={SystemTestIds.OsVersion}
            >
              <FormattedMessage {...messages.muditaOsUpdateTitle} />
              {" " + osVersion}
            </Text>
          </CardText>
          {updateAvailable ? (
            <AvailableUpdateText>
              {updateDownloaded ? (
                <FormattedMessage {...messages.systemUpdateDownloaded} />
              ) : (
                <FormattedMessage {...messages.systemUpdateAvailable} />
              )}
            </AvailableUpdateText>
          ) : (
            <AvailableUpdateText>
              <FormattedMessage {...messages.systemUpdateUpToDate} />
            </AvailableUpdateText>
          )}
        </CardContent>
        <CardAction filled>
          {updateAvailable ? (
            updateDownloaded ? (
              <CardActionButton
                active
                labelMessage={messages.systemUpdateAction}
                onClick={onUpdate}
              />
            ) : (
              <CardActionButton
                active
                labelMessage={messages.systemDownloadAction}
                onClick={onDownload}
                data-testid={SystemTestIds.DownloadButton}
              />
            )
          ) : (
            <CardActionButton
              active
              labelMessage={messages.systemCheckForUpdates}
              onClick={onUpdateCheck}
            />
          )}
        </CardAction>
      </CardBody>
    </Card>
  )
}

export default System
