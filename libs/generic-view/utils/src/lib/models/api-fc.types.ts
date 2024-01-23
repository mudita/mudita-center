/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, PropsWithChildren, ReactHTMLElement } from "react"

type DefaultProps = Partial<
  Pick<ReactHTMLElement<HTMLElement>["props"], "className" | "style">
>

type BaseGenericComponent<
  Data = unknown,
  Config = unknown,
  ExtraProps = unknown
> = FunctionComponent<
  Readonly<
    PropsWithChildren<
      {
        config?: Config
        data?: Data
      } & ExtraProps &
        DefaultProps
    >
  >
>

export type APIFC<Data = unknown, Config = unknown> = BaseGenericComponent<
  Data,
  Config,
  { viewKey?: string }
>

export type RecursiveComponent = BaseGenericComponent<
  unknown,
  unknown,
  {
    viewKey: string
    componentKey: string
  }
>
