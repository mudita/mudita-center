/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IpcEvent } from "Core/core/decorators"
import { IpcConfigurationsEvent } from "Core/settings/constants"
import { Configuration } from "Core/settings/dto"
import { ConfigurationService } from "Core/settings/services"

export class ConfigurationController {
  constructor(private configurationService: ConfigurationService) {}

  @IpcEvent(IpcConfigurationsEvent.Get)
  async getSettings(): Promise<Configuration> {
    return this.configurationService.getConfiguration()
  }
}
