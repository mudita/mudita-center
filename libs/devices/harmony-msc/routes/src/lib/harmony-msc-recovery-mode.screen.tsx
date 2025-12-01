/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { useActiveDeviceQuery } from "devices/common/feature"
import { HarmonyMsc } from "devices/harmony-msc/models"
import { flashHarmonyMsc } from "devices/harmony-msc/feature"
import { formatMessage } from "app-localize/utils"
import { DashboardHeaderTitle } from "app-routing/feature"
import { RecoveryMode } from "./components/recovery-mode/recovery-mode"
import { McHarmonyMscRecoveryModeMessages } from "./harmony-msc-recovery-mode.messages"

export const McHarmonyMscRecoveryModeScreen: FunctionComponent = () => {
  const { data: activeHarmony } = useActiveDeviceQuery<HarmonyMsc>()
  const onClick = () => {
    if (activeHarmony) {
      void flashHarmonyMsc(activeHarmony, {
        imagePath: "/path/to/image",
        scriptPath: "path/to/script",
      })
    }
  }
  return (
    <>
      <DashboardHeaderTitle
        title={formatMessage(McHarmonyMscRecoveryModeMessages.pageTitle)}
      />
      <RecoveryMode onConfirm={onClick} />
    </>
  )
}
