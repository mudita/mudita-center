/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Card, {
  CardAction,
  CardBody,
  CardContent,
  CardHeader,
} from "Core/overview/components/card.elements"
import Text, {
  TextDisplayStyle,
} from "Core/__deprecated__/renderer/components/core/text/text.component"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import React from "react"
import { defineMessages, FormattedMessage } from "react-intl"
import { DisplayStyle } from "Core/__deprecated__/renderer/components/core/button/button.config"
import ButtonComponent from "Core/__deprecated__/renderer/components/core/button/button.component"
import { TimeSynchronizationIds } from "Core/overview/components/time-synchronization/time-synchronization-ids.enum"

const messages = defineMessages({
  timeSynchronizationTitle: {
    id: "module.overview.timeSynchronizationTitle",
  },
  timeSynchronizationDescription: {
    id: "module.overview.timeSynchronizationDescription",
  },
  timeSynchronizationButton: {
    id: "module.overview.timeSynchronizationButton",
  },
})

interface Props {
  // deviceType: DeviceType
  // osVersion?: string
  // onUpdateCheck?: () => void
  // onUpdate?: () => void
  // onDownload?: () => void
}

const TimeSynchronization: FunctionComponent<Props> = ({
  // deviceType,
  // osVersion = "",
  // onUpdateCheck = noop,
  // onUpdate = noop,
  // onDownload = noop,
  ...props
}) => {
  // const {
  //   checkForUpdateInProgress,
  //   checkForUpdatePerformed,
  //   checkForUpdateFailed,
  //   updateAvailable,
  //   updateDownloaded,
  // } = useUpdateFlowState({
  //   deviceType: deviceType,
  // })
  return (
    <Card {...props}>
      <CardHeader>
        <FormattedMessage {...messages.timeSynchronizationTitle} />
        <Text displayStyle={TextDisplayStyle.Label} color="secondary">
          <FormattedMessage {...messages.timeSynchronizationDescription} />
        </Text>
      </CardHeader>
      <CardBody>
        <CardContent>
          {/*TODO: Show current Harmony time and date */}
        </CardContent>
        <CardAction>
          <ButtonComponent
            displayStyle={DisplayStyle.Secondary}
            labelMessage={messages.timeSynchronizationButton}
            // onClick={onDownload}
            data-testid={TimeSynchronizationIds.SynchronizeButton}
          />
        </CardAction>
      </CardBody>
    </Card>
  )
}

export default TimeSynchronization
