/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  CallLogEntity,
  CallLogInput,
  CallLogObject,
} from "Core/data-sync/types"
import { BasePresenter } from "Core/data-sync/presenters/base-presenter"
import {
  UnifiedCallLogCallType,
  UnifiedCallLogPresentationType,
} from "device/models"

export class CallLogPresenter extends BasePresenter {
  public serializeToObject(input: CallLogInput): CallLogObject[] {
    if (input.calls === undefined) {
      return []
    }

    const calls = this.serializeRecord<CallLogEntity>(
      input.calls.values,
      input.calls.columns
    )

    return calls.map((call) => ({
      id: String(call._id),
      phone: call.e164number || call.number || "",
      callDate: this.parseNumber(call.date) * 1000,
      callDuration: this.parseNumber(call.duration),
      presentation: this.mapPresentationType(call.presentation),
      callType: this.mapCallType(call.type),
      isRead: this.mapIsNew(call.isRead),
    }))
  }

  private parseNumber(value: number | string | undefined | null): number {
    return Number(value) || 0
  }

  private mapPresentationType(
    type: number | string | undefined | null
  ): UnifiedCallLogPresentationType {
    const typesMap: Record<number, UnifiedCallLogPresentationType> = {
      0: "PRESENTATION_UNKNOWN",
      1: "PRESENTATION_ALLOWED",
      2: "PRESENTATION_PAYPHONE",
      3: "PRESENTATION_RESTRICTED",
    }
    return typesMap[Number(type)] ?? "PRESENTATION_UNKNOWN"
  }

  private mapCallType(
    type: number | string | undefined | null
  ): UnifiedCallLogCallType {
    const typesMap: Record<number, UnifiedCallLogCallType> = {
      0: "TYPE_OTHER",
      1: "TYPE_INCOMING",
      2: "TYPE_OUTGOING",
      3: "TYPE_MISSED",
      4: "TYPE_VOICEMAIL",
      5: "TYPE_REJECTED",
      6: "TYPE_BLOCKED",
      7: "TYPE_ANSWERED_EXTERNALLY",
    }
    return typesMap[Number(type)] ?? "TYPE_OTHER"
  }
  private mapIsNew(isRead: number | string | undefined | null): boolean {
    return Number(isRead) !== 0
  }
}
