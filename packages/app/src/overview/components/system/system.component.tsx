/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Card, {
  CardAction,
  CardActionButton,
  CardBody,
  CardContent,
  CardHeader,
  CardText,
} from "App/overview/components/card.elements"
import { SystemUpdateText } from "App/overview/components/system-update-text"
import { SystemTestIds } from "App/overview/components/system/system-test-ids.enum"
import Text, {
  TextDisplayStyle,
} from "App/__deprecated__/renderer/components/core/text/text.component"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { noop } from "App/__deprecated__/renderer/utils/noop"
import React from "react"
import { defineMessages, FormattedMessage } from "react-intl"
import { DeviceType } from "App/device"
import { useUpdateFlowState } from "../overview-screens/helpers/use-update-flow-state.hook"

const messages = defineMessages({
  muditaOsUpdateTitle: {
    id: "module.overview.muditaOsUpdateTitle",
  },
  systemVersionTitle: {
    id: "module.overview.systemVersionTitle",
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
  systemCheckForUpdatesInProgress: {
    id: "module.overview.systemCheckForUpdatesInProgress",
  },
})

interface Props {
  deviceType: DeviceType
  osVersion?: string
  onUpdateCheck?: () => void
  onUpdate?: () => void
  onDownload?: () => void
}

const System: FunctionComponent<Props> = ({
  deviceType,
  osVersion = "",
  onUpdateCheck = noop,
  onUpdate = noop,
  onDownload = noop,
  ...props
}) => {
  const {
    checkForUpdateInProgress,
    checkForUpdatePerformed,
    checkForUpdateFailed,
    updateAvailable,
    updateDownloaded,
  } = useUpdateFlowState({
    deviceType: deviceType,
  })
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
          <SystemUpdateText
            checkForUpdateFailed={checkForUpdateFailed}
            checkForUpdateInProgress={checkForUpdateInProgress}
            checkForUpdatePerformed={checkForUpdatePerformed}
            updateDownloaded={updateDownloaded}
          />
        </CardContent>
        <CardAction filled>
          {updateAvailable ? (
            <CardActionButton
              active
              labelMessage={messages.systemDownloadAction}
              onClick={onDownload}
              data-testid={SystemTestIds.DownloadButton}
            />
          ) : updateDownloaded ? (
            <CardActionButton
              active
              labelMessage={messages.systemUpdateAction}
              onClick={onUpdate}
            />
          ) : (
            <CardActionButton
              active={!checkForUpdateInProgress}
              disabled={checkForUpdateInProgress}
              loading={checkForUpdateInProgress}
              labelMessage={
                checkForUpdateInProgress
                  ? messages.systemCheckForUpdatesInProgress
                  : messages.systemCheckForUpdates
              }
              onClick={onUpdateCheck}
            />
          )}
        </CardAction>
      </CardBody>
    </Card>
  )
}

export default System
