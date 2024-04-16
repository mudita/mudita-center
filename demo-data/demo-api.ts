/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

type MCLang = "en-US"

interface ApiConfig {
  apiVersion: string
  lang?: MCLang
  variant?: string
  productId: string
  vendorId: string
  serialNumber?: string
  features: string[]
}

export const apiConfigResponse: ApiConfig = {
  apiVersion: "1.0.0",
  lang: "en-US",
  variant: "black",
  productId: "0100",
  vendorId: "3310",
  serialNumber: "0123456789",
  features: ["mc-overview", "mc-calendar"],
}
