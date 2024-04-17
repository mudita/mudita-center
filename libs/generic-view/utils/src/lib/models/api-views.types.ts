/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ComponentProps } from "react"
import { APIComponents } from "generic-view/ui"
import { Layout } from "./layout.types"

export type ComponentPropsByName<
  C extends keyof APIComponents = keyof APIComponents
> = {
  component: C
  layout?: Layout
  childrenKeys?: string[]
  config?: ComponentProps<APIComponents[C]>["config"]
}

export type View = {
  main: {
    screenTitle: string
  } & ComponentPropsByName
  [key: string]: ComponentPropsByName
}

export type MainView = View["main"]

export type Subview = Omit<View, "main"> | undefined

export type ViewGenerator<Config, ReturnType = View> = (
  config: Config
) => ReturnType

export type ComponentGenerator<Config, ReturnType = Subview> = (
  key: string,
  config: Config,
  layout?: Layout
) => ReturnType
