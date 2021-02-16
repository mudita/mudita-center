/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import React, { ComponentType } from "react"
import { Route, RouteComponentProps, RouteProps } from "react-router"
import LayoutDesktopWrapper from "Renderer/wrappers/layout-desktop-wrapper"

interface AppRouteProps extends Omit<RouteProps, "component"> {
  layout?: ComponentType
  component: ComponentType<any>
}

const AppRoute = ({
  layout: Layout = LayoutDesktopWrapper,
  component: Component,
  path,
  ...rest
}: AppRouteProps) => {
  const routeRenderer = (props: RouteComponentProps<any>) => (
    <Layout>
      <Component {...props} />
    </Layout>
  )
  return <Route {...rest} render={routeRenderer} />
}

export default AppRoute
