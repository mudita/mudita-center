/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  FunctionComponent as ReactFunctionComponent,
  PropsWithChildren,
} from "react"

interface Props {
  className?: string
}

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/ban-types
export type APIFC<P = {}> = ReactFunctionComponent<
  Readonly<PropsWithChildren<{ parameters: P } & Props>>
>
