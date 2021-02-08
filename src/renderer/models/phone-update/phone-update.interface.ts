export interface Reducers {
  readonly updatePhoneOsInfo: (updateInfo: PhoneUpdate) => void
}

export interface PhoneUpdate {
  pureOsFileUrl?: string
  pureOsAvailable?: boolean
  pureOsDownloaded?: boolean
}

export type PhoneUpdateStore = Reducers & PhoneUpdate
