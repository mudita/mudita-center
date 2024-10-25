/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export type UnifiedCallLogPresentationType =
  | "PRESENTATION_ALLOWED"
  | "PRESENTATION_RESTRICTED"
  | "PRESENTATION_UNKNOWN"
  | "PRESENTATION_PAYPHONE"

export type UnifiedCallLogCallType =
  | "TYPE_INCOMING"
  | "TYPE_OUTGOING"
  | "TYPE_MISSED"
  | "TYPE_VOICEMAIL"
  | "TYPE_REJECTED"
  | "TYPE_BLOCKED"
  | "TYPE_ANSWERED_EXTERNALLY"
  | "TYPE_OTHER"

export type UnifiedCallLog = {
  id: string
  phone: string
  callDate: number
  callDuration: number
  presentation: UnifiedCallLogPresentationType
  callType: UnifiedCallLogCallType
  isRead: boolean
}
