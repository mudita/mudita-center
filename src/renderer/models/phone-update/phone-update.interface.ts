import { Filename } from "Renderer/interfaces/file-download.interface"

export interface PhoneUpdate {
  pureOsFileName?: Filename
  pureOsAvailable?: boolean
  pureOsDownloaded?: boolean
}
