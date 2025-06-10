/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, PropsWithChildren } from "react"
import { Navigate, Route, Routes } from "react-router"
import { DashboardLayout } from "app-routing/feature"
import { useSettingsRouter } from "settings/routes"
import { useNewsRouter } from "news/routes"
import { useHelpRouter } from "help/routes"
import { useDevicesInitRouter } from "devices/common/routes"

export const AppRoutes: FunctionComponent<PropsWithChildren> = () => {
  const newsRouter = useNewsRouter()
  const settingsRouter = useSettingsRouter()
  const helpRouter = useHelpRouter()
  const devicesRouter = useDevicesInitRouter()

  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        {newsRouter}
        {settingsRouter}
        {helpRouter}
        {devicesRouter}
      </Route>
      <Route path={"*"} element={<Navigate to={"/"} />} />
    </Routes>
  )
}
