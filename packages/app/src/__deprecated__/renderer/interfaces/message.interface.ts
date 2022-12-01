/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PrimitiveType } from "intl-messageformat"

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Chunks = (chunks: any) => JSX.Element

export interface Message {
  readonly id: string
  readonly defaultMessage?: string
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/ban-types
  readonly description?: object | string
  readonly values?: Record<string, PrimitiveType | Chunks>
}
