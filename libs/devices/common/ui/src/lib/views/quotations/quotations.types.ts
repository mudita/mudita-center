/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export interface Quotation {
  id: string
  quote: string
  author?: string
}

export interface NewQuotation {
  quote: string
  author?: string
}
