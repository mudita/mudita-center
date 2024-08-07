/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Store from "electron-store"
import { ISettingsService } from "shared/utils"
import { Settings, SettingsUpdateOption } from "Core/settings/dto"
import { settingsSchema } from "Core/settings/store/schemas"
import { SettingsValue } from "Core/settings/types"

// TODO: Les't merge this functionality with `metadata-store.service.ts`

export class SettingsService implements ISettingsService {
  constructor(private readonly store: Store<Settings>) {}

  init(): void {
    const applicationId = this.getSettings().applicationId

    this.updateSettings({
      key: "applicationId",
      value: applicationId ?? settingsSchema.applicationId.default,
    })
  }

  getSettings(): Settings {
    return this.store.store
  }

  resetSettings(): Settings {
    this.store.reset(...(Object.keys(settingsSchema) as (keyof Settings)[]))
    return this.store.store
  }

  updateSettings({ key, value }: SettingsUpdateOption): SettingsValue {
    if (value !== undefined) {
      this.store.set(key, value)
    } else {
      this.store.delete(key)
    }
    return this.store.get(key)
  }

  getByKey(key: keyof Settings): SettingsValue {
    return this.store.get(key)
  }
}
