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
import { UnifiedCallLogCallType, UnifiedCallLogIsNew, UnifiedCallLogPresentationType } from "device/models"

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
      isNew: this.mapIsNew(call.isRead),
    }))
  }

  private parseNumber(value: number | string | undefined | null): number {
    return Number(value) || 0;
  }

  private mapPresentationType(type: number | string | undefined | null): UnifiedCallLogPresentationType {
    const typesMap: Record<number, UnifiedCallLogPresentationType> = {
      0: 3,
      1: 1,
      2: 4,
      3: 2,
    }
    return typesMap[Number(type)] ?? 3;
  }

  private mapCallType(type: number | string | undefined | null): UnifiedCallLogCallType {
    const typesMap: Record<number, UnifiedCallLogCallType> = {
      0: 8,
      1: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6,
      7: 7,
    };
    return typesMap[Number(type)] ?? 8;
  }
  private mapIsNew(isRead: number | string | undefined | null): UnifiedCallLogIsNew {
    return Number(isRead) === 0 ? 1 : 0;
  }
}
