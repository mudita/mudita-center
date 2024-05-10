/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export const removeDeprecatedFieldsMigration = (store: any) => {
  store.set("settingsSchemaVersion", 4)
  store.delete("collectingData")
  store.delete("autostart")
  store.delete("tray")
  store.delete("neverConnected")
}
