/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { FunctionComponent as ReactFunctionComponent } from "react"

export type FunctionComponent<P = {}> = ReactFunctionComponent<
  Readonly<P & { className?: string }>
>
