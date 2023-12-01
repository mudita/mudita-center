/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ComponentProps } from "react"
import { APIComponents } from "./api-components.types"
import { Layout } from "../components/layout/layout.types"

export type ComponentPropsByName<
  C extends keyof APIComponents = keyof APIComponents
> = Partial<Pick<ComponentProps<APIComponents[C]>, "parameters" | "data">> & {
  component: C
  layout?: Layout
  childrenKeys?: string[]
}

export type View = {
  main: ComponentPropsByName
  [key: string]: ComponentPropsByName
}

export type ViewGenerator<Config> = (config: Config) => View
