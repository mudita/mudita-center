/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { PrimitiveType } from "intl-messageformat"

type Chunks = (chunks: any) => JSX.Element

export interface Message {
  readonly id: string
  readonly defaultMessage?: string
  readonly description?: object | string
  readonly values?: Record<string, PrimitiveType | Chunks>
}
