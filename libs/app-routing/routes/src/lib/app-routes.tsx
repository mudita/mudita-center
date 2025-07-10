/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, PropsWithChildren, useMemo } from "react"
import { Navigate, Outlet, Route, Routes } from "react-router"
import { DashboardLayout } from "app-routing/feature"
import { useSettingsRouter } from "settings/routes"
import { useNewsRouter } from "news/routes"
import { useHelpRouter } from "help/routes"
import { useDevicesInitRouter } from "devices/common/routes"
import { DevicesInitializer } from "devices/common/feature"
import { CheckInitRequirements } from "app-init/feature"
import { useAppLegalRouter } from "./app-legal-router"
import { ContactSupport } from "contact-support/feature"

export const AppRoutes: FunctionComponent<PropsWithChildren> = () => {
  const legalRouter = useAppLegalRouter()
  const newsRouter = useNewsRouter()
  const settingsRouter = useSettingsRouter()
  const helpRouter = useHelpRouter()
  const devicesRouter = useDevicesInitRouter()

  return (
    <Routes>
      {legalRouter}
      <Route element={<AppMainLayout />}>
        <Route element={<DashboardLayout />}>
          {newsRouter}
          {settingsRouter}
          {helpRouter}
          {devicesRouter}
        </Route>
      </Route>
      <Route path={"*"} element={<Navigate to={"/"} />} />
    </Routes>
  )
}

const AppMainLayout: FunctionComponent = () => {
  return (
    <>
      <ContactSupport />
      <DevicesInitializer />
      <CheckInitRequirements />
      <Outlet />
    </>
  )
}
