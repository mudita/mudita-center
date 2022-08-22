/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum BatteryState {
  Discharging,
  Charging,
}

export enum SIM {
  One = "0",
  Two = "1",
  Fail = "2",
  Unknown = "3",
  None = "4",
}

export enum SignalStrength {
  Zero = "0",
  One = "1",
  Two = "2",
  Three = "3",
  Four = "4",
  Five = "5",
}

export enum Tray {
  Out,
  In,
}

export enum AccessTechnology {
  Gsm = 0x00,
  Utran = 0x02,
  GsmWEgprs,
  UtranWHsdpa,
  UtranWHsupa,
  UtranWHsdpaAndWHsupa,
  EUtran,
  Unknown = 0xff,
}

export enum NetworkStatus {
  NotRegistered,
  RegisteredHomeNetwork,
  Searching,
  RegistrationDenied,
  Unknown,
  RegisteredRoaming,
}

export enum PhoneLockCategory {
  Status = "phoneLockStatus",
  Time = "phoneLockTime",
}
export interface GetPhoneLockStatusBody {
  category: PhoneLockCategory.Status
}

export interface GetPhoneLockTimeBody {
  category: PhoneLockCategory.Time
}

export interface GetPhoneLockTimeResponseBody {
  phoneLockTime?: number
  timeLeftToNextAttempt?: number
}

export enum CaseColour {
  Black = "black",
  Gray = "gray",
}

export interface DeviceInfo {
  batteryLevel: string
  batteryState: BatteryState
  currentRTCTime: string
  systemReservedSpace: string
  usedUserSpace: string
  deviceSpaceTotal: string
  gitBranch: string
  gitRevision: string
  version: string
  selectedSim: SIM
  signalStrength: SignalStrength
  networkOperatorName: string
  trayState: Tray
  accessTechnology: AccessTechnology
  networkStatus: NetworkStatus
  serialNumber: string
  caseColour: CaseColour
  backupLocation: string
  deviceToken?: string
}

// this enum is a tmp solution, diagnostics file paths should be fetch dynamically by `FileList` request
// https://appnroll.atlassian.net/browse/CP-916
export enum DiagnosticsFilePath {
  UPDATER_LOG = "/sys/user/updater.log",
}

export enum DiagnosticsFileList {
  LOGS,
  CRASH_DUMPS,
}

export interface GetFileListBody {
  // to be precise the property should be named FileDir
  fileList: DiagnosticsFileList
}

export interface GetFileListResponseBody {
  files: string[]
}
