/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export type DataTransferDomain = "contacts-v1"

export type PreDataTransfer = {
  dataTransferId: number
  domains: Record<DataTransferDomain, string>
}

export type DataTransfer = {
  process: number
  rebootRequired?: boolean
  message: string
}
