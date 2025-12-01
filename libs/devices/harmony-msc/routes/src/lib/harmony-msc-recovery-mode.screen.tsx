/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { useActiveDeviceQuery } from "devices/common/feature"
import { HarmonyMsc } from "devices/harmony-msc/models"
import { flashHarmonyMsc } from "devices/harmony-msc/feature"
import { Button, Typography } from "app-theme/ui"

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
      <Typography.H1>Recovery mode</Typography.H1>
      <Button onClick={onClick}>Test</Button>
    </>
  )
}
