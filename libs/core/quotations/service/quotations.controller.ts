/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IpcEvent } from "Core/core/decorators"
import { QuotationsService } from "./quotations.service"
import { IpcQuotationsEvent } from "./controller.constant"

export class QuotationsController {
  constructor(private quotationsService: QuotationsService) {}

  @IpcEvent(IpcQuotationsEvent.GetSettings)
  async getSettings() {
    return this.quotationsService.getSettings()
  }

  @IpcEvent(IpcQuotationsEvent.UpdateSettings)
  async updateSettings(options: { group?: string; interval?: string | number }) {
    return this.quotationsService.updateSettings(options)
  }
}
