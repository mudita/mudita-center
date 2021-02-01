module.exports = {
  readFileSync: () => "mocked file",
  readJSON: (path) => {
    if (path.endsWith("settings.json")) {
      return {
        appAutostart: false,
        appTethering: false,
        appIncomingCalls: false,
        appIncomingMessages: false,
        appLowBattery: false,
        appOsUpdates: false,
        appNonStandardAudioFilesConversion: false,
        appConvert: "Always ask",
        appConversionFormat: "WAV",
        appTray: false,
        pureOsBackupLocation:
          "/Users/a/Library/Application Support/mudita-center/pure/phone/backups/",
        pureOsDownloadLocation:
          "/Users/a/Library/Application Support/mudita-center/pure/os/downloads/",
        language: "en-US",
        pureNeverConnected: true,
      }
    } else {
      return {
        key: "value",
      }
    }
  },
}
