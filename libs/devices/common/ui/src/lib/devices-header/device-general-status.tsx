/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { DeviceStatus } from "devices/common/models"
import { IconType } from "app-theme/models"
import { Badge } from "app-theme/ui"
import { defineMessages } from "app-localize/utils"

interface Props {
  status?: DeviceStatus
  active?: boolean
  recoveryMode?: boolean
}

const messages = defineMessages({
  activeLabel: { id: "general.components.deviceCard.activeLabel" },
  errorLabel: { id: "general.components.deviceCard.errorLabel" },
  lockedLabel: { id: "general.components.deviceCard.lockedLabel" },
  recoveryModeLabel: { id: "general.components.deviceCard.recoveryModeLabel" },
})

export const DeviceGeneralStatus: FunctionComponent<Props> = ({
  status,
  active,
  recoveryMode,
}) => {
  if (recoveryMode) {
    return (
      <Badge
        icon={IconType.RecoveryModeFilled}
        backgroundColor={"black"}
        color={"white"}
        message={messages.recoveryModeLabel.id}
      />
    )
  }

  if (status === DeviceStatus.CriticalError || status === DeviceStatus.Issue) {
    return (
      <Badge
        icon={IconType.Error}
        backgroundColor={"grey5"}
        color={"red"}
        message={messages.errorLabel.id}
      />
    )
  }

  if (status === DeviceStatus.Locked) {
    return (
      <Badge
        icon={IconType.Lock}
        backgroundColor={"grey4"}
        color={"grey1"}
        message={messages.lockedLabel.id}
      />
    )
  }

  if (active) {
    return (
      <Badge
        icon={IconType.CheckBold}
        backgroundColor={"green"}
        color={"grey1"}
        message={messages.activeLabel.id}
      />
    )
  }

  return null
}
