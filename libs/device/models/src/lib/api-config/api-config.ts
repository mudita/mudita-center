/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export type MCLang = "en-US"

export interface ApiConfig {
  apiVersion: string
  lang?: MCLang
  variant?: string
  productId: string
  vendorId: string
  serialNumber?: string
  features: string[]
}
