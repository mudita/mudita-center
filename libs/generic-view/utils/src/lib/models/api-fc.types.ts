/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, PropsWithChildren, ReactHTMLElement } from "react"

type DefaultProps = Partial<
  Pick<ReactHTMLElement<HTMLElement>["props"], "className" | "style">
>

type ComponentConfigProp<T> = T extends undefined
  ? { config?: T }
  : { config: T }

export type BaseGenericComponent<
  Data = undefined,
  Config = undefined,
  ExtraProps = undefined
> = FunctionComponent<
  Readonly<
    PropsWithChildren<
      { data?: Data } & ComponentConfigProp<Config> & ExtraProps & DefaultProps
    >
  >
>

export type APIFC<Data = undefined, Config = undefined> = BaseGenericComponent<
  Data,
  Config,
  { viewKey?: string }
>

export type RecursiveComponent = BaseGenericComponent<
  undefined,
  undefined,
  {
    viewKey: string
    componentKey: string
  }
>
