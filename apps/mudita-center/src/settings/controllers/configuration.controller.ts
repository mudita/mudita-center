/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IpcEvent } from "App/core/decorators"
import { IpcConfigurationsEvent } from "App/settings/constants"
import { Configuration } from "App/settings/dto"
import { ConfigurationService } from "App/settings/services"

export class ConfigurationController {
  constructor(private configurationService: ConfigurationService) {}

  @IpcEvent(IpcConfigurationsEvent.Get)
  async getSettings(): Promise<Configuration> {
    return this.configurationService.getConfiguration()
  }
}
