/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { BatteryIcon } from "app-theme/ui"
import { IconSize } from "app-theme/models"
import { OverviewStatusItem } from "devices/common/ui"
import { defineMessages, formatMessage } from "app-localize/utils"

const messages = defineMessages({
  battery: {
    id: "harmony.overview.status.battery",
  },
})

interface Props {
  batteryLevel: number
}

export const HarmonyOverviewStatusSection: FunctionComponent<Props> = ({
  batteryLevel,
}) => {
  return (
    <OverviewStatusItem
      iconComponent={
        <BatteryIcon
          batteryPercentage={batteryLevel || 0}
          size={IconSize.Big}
        />
      }
      title={`${batteryLevel} %`}
      description={formatMessage(messages.battery)}
    />
  )
}
