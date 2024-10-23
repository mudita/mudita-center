/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export type UnifiedCallLogCallType =
  | 1 // TYPE_INCOMING
  | 2 // TYPE_OUTGOING
  | 3 // TYPE_MISSED
  | 4 // TYPE_VOICEMAIL
  | 5 // TYPE_REJECTED
  | 6 // TYPE_BLOCKED
  | 7 // TYPE_ANSWERED_EXTERNALLY
  | 8 // TYPE_OTHER

export type UnifiedCallLogIsNew = 0 | 1 // 0 - not new, 1 - new

export type UnifiedCallLog = {
  id: string
  phone: string
  callDate: number
  callDuration: number
  callType: UnifiedCallLogCallType
  isNew: UnifiedCallLogIsNew
}
