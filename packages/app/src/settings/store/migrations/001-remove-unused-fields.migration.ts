/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export const removeUnusedFields = (store: any) => {
  store.delete("appAutostart")
  store.delete("appTethering")
  store.delete("appIncomingCalls")
  store.delete("appIncomingMessages")
  store.delete("appLowBattery")
  store.delete("appOsUpdates")
  store.delete("appNonStandardAudioFilesConversion")
  store.delete("appConvert")
  store.delete("appConversionFormat")
  store.delete("appTray")
  store.delete("pureOsBackupLocation")
  store.delete("pureOsDownloadLocation")
  store.delete("pureNeverConnected")
  store.delete("appCollectingData")
}
