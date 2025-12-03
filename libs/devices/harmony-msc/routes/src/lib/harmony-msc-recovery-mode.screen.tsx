/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { formatMessage } from "app-localize/utils"
import { DashboardHeaderTitle } from "app-routing/feature"
import { RecoveryMode } from "./components/recovery-mode/recovery-mode"
import { McHarmonyMscRecoveryModeMessages } from "./harmony-msc-recovery-mode.messages"

export const McHarmonyMscRecoveryModeScreen: FunctionComponent = () => {
  return (
    <>
      <DashboardHeaderTitle
        title={formatMessage(McHarmonyMscRecoveryModeMessages.pageTitle)}
      />
      <RecoveryMode />
    </>
  )
}
