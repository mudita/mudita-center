/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AppRoutes } from "app-routing/routes"
import { FunctionComponent, useEffect } from "react"
import ReactModal from "react-modal"
import { useUniqueTrack } from "app-utils/renderer"
import { AnalyticsEventCategory } from "app-utils/models"

export const App: FunctionComponent = () => {
  ReactModal.setAppElement("#root")
  const uniqueTrack = useUniqueTrack()

  useEffect(() => {
    void uniqueTrack({
      e_c: AnalyticsEventCategory.CenterVersion,
      e_a: import.meta.env.VITE_APP_VERSION,
    })
  }, [uniqueTrack])

  return <AppRoutes />
}
