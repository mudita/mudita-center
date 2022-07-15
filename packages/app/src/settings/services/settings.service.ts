/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Store from "electron-store"
import { Settings, SettingsUpdateOption } from "App/settings/dto"
import { settingsSchema } from "App/settings/store/schemas"
import { SettingsValue } from "App/settings/types"

// TODO: Les't merge this functionality with `metadata-store.service.ts`

export class SettingsService {
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
    this.store.set(key, value)
    return this.store.get(key)
  }
}
