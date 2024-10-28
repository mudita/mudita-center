/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export interface UnifiedMessageAddress {
  address: string
}

export type UnifiedMessageType = "SMS" | "MMS"

export type UnifiedMessageStatus = "RECEIVED" | "SENT"

export type UnifiedMessageDeliveryStatus =
  | "PENDING"
  | "FAILED"
  | "DELIVERED"
  | "NONE"

export interface UnifiedMessage {
  id: string
  body: string
  date: number
  read: boolean
  seen: boolean
  type: UnifiedMessageType
  address: [UnifiedMessageAddress, UnifiedMessageAddress?]
  status: UnifiedMessageStatus
  deliveryStatus: UnifiedMessageDeliveryStatus
}
