import { name } from "../../package.json"
import { app } from "electron"
import {
  ConversionFormat,
  Convert,
} from "Renderer/components/rest/settings/audio-conversion-radio-group.enum"

export interface Language {
  name: string
  tag: string
  shortTag: string
}

export interface AppSettings {
  appAutostart: boolean
  appTethering: boolean
  appIncomingCalls: boolean
  appIncomingMessages: boolean
  appLowBattery: boolean
  appOsUpdates: boolean
  appNonStandardAudioFilesConversion: boolean
  appConvert: Convert
  appConversionFormat: ConversionFormat
  appTray: boolean
  pureOsBackupLocation: string
  pureOsDownloadLocation: string
  language: Language
}

const getDefaultAppSettings = (
  appPath = `${app.getPath("appData")}/${name}`
): AppSettings => ({
  appAutostart: false,
  appTethering: false,
  appIncomingCalls: false,
  appIncomingMessages: false,
  appLowBattery: false,
  appOsUpdates: false,
  appNonStandardAudioFilesConversion: false,
  appConvert: Convert.ConvertAutomatically,
  appConversionFormat: ConversionFormat.WAV,
  appTray: true,
  pureOsBackupLocation: `${appPath}/pure/phone/backups/`,
  pureOsDownloadLocation: `${appPath}/pure/os/downloads/`,
  language: {
    name: "English",
    tag: "en-US",
    shortTag: "en",
  },
})

export default getDefaultAppSettings
