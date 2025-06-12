/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AppRoutes } from "app-routing/routes"
import { useDevicesListener } from "devices/common/feature"
import { FunctionComponent, useEffect } from "react"
import { CheckInitRequirements } from "app-init/feature"
import ReactModal from "react-modal"
import { useTrack } from "app-utils/renderer"

export const App: FunctionComponent = () => {
  ReactModal.setAppElement("#root")
  useDevicesListener()
  const track = useTrack()

  useEffect(() => {
    void track("example event: app-started")
  }, [track])

  return (
    <>
      <CheckInitRequirements />
      <AppRoutes />
    </>
  )
}
