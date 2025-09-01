/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  FunctionComponent,
  PropsWithChildren,
  ReactHTMLElement,
  Ref,
} from "react"

type DefaultProps = Partial<
  Pick<ReactHTMLElement<HTMLElement>["props"], "className" | "style" | "id">
> & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  componentRef?: Ref<any>
}

type HasRequired<T> = {
  [K in keyof T]-?: NonNullable<unknown> extends Pick<T, K> ? never : K
}[keyof T] extends never
  ? false
  : true

type ComponentConfigProp<T> = HasRequired<T> extends true
  ? { config: T }
  : { config?: T }

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
  {
    viewKey?: string
    componentKey?: string
    componentName?: string
    dataItemId?: string
  }
>
