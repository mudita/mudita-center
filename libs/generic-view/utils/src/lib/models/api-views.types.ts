/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ComponentProps } from "react"
import { APIComponents } from "generic-view/ui"
import { Layout } from "../with-layout/layout.types"

export type ComponentPropsByName<
  C extends keyof APIComponents = keyof APIComponents
> = {
  component: C
  layout?: Layout
  childrenKeys?: string[]
  config?: ComponentProps<APIComponents[C]>["config"]
}

export type View = {
  main: ComponentPropsByName
  [key: string]: ComponentPropsByName
}

export type ViewGenerator<Config> = (config: Config) => View
