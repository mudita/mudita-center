/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"
import { Layout } from "./layout.types"
import componentsValidators from "generic-view/models"

type ComponentConfigProp<SomeType> = SomeType extends undefined
  ? { config?: SomeType }
  : { config: SomeType }

type ComponentProps<T> = T extends {
  key: string
  configValidator: z.ZodSchema
}
  ? {
      component: T["key"]
      layout?: Layout
      childrenKeys?: string[]
    } & ComponentConfigProp<z.infer<T["configValidator"]>>
  : never

type ComponentPropsByName = {
  [K in keyof typeof componentsValidators]: ComponentProps<
    (typeof componentsValidators)[K]
  >
}[keyof typeof componentsValidators]

export type MainView = {
  main: ComponentPropsByName & {
    screenTitle: string
  }
}

export type Subview =
  | {
      [key: string]: ComponentPropsByName
    }
  | undefined

export type View = MainView & Subview

export type ViewGenerator<Config, ReturnType = View> = (
  config: Config
) => ReturnType

export type ComponentGenerator<Config, ReturnType = Subview> = (
  key: string,
  config: Config,
  layout?: Layout
) => ReturnType
