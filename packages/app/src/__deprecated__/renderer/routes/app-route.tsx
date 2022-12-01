/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentType } from "react"
import { Route, RouteComponentProps, RouteProps } from "react-router"
import LayoutDesktopWrapper from "App/__deprecated__/renderer/wrappers/layout-desktop-wrapper"

interface AppRouteProps extends Omit<RouteProps, "component"> {
  layout?: ComponentType
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: ComponentType<any>
}

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const AppRoute = ({
  layout: Layout = LayoutDesktopWrapper,
  component: Component,
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  path,
  ...rest
}: AppRouteProps) => {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const routeRenderer = (props: RouteComponentProps<any>) => (
    <Layout>
      <Component {...props} />
    </Layout>
  )
  return <Route {...rest} render={routeRenderer} />
}

export default AppRoute
