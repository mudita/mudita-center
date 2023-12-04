/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, PropsWithChildren, ReactHTMLElement } from "react"

type DefaultProps = Partial<
  Pick<ReactHTMLElement<HTMLElement>["props"], "className" | "style">
>

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/ban-types
export type APIFC<
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

export type RecursiveComponent = APIFC<
  unknown,
  unknown,
  {
    viewKey: string
    componentKey: string
  }
>
