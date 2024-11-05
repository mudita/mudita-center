/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AlarmEntity, EventInput, AlarmObject } from "Core/data-sync/types"
import { BasePresenter } from "Core/data-sync/presenters/base-presenter"

export class AlarmPresenter extends BasePresenter {
  public serializeToObject(input: EventInput): AlarmObject[] {
    if (input.alarms === undefined) {
      return []
    }

    const alarms = this.serializeRecord<AlarmEntity>(
      input.alarms.values,
      input.alarms.columns
    )

    // @ts-ignore
    return alarms.map((alarm) => alarm)
  }
}
