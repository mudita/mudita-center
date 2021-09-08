/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

enum BatteryState {
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

enum Tray {
  Out,
  In,
}

enum AccessTechnology {
  Gsm = 0x00,
  Utran = 0x02,
  GsmWEgprs,
  UtranWHsdpa,
  UtranWHsupa,
  UtranWHsdpaAndWHsupa,
  EUtran,
  Unknown = 0xff,
}

enum NetworkStatus {
  NotRegistered,
  RegisteredHomeNetwork,
  Searching,
  RegistrationDenied,
  Unknown,
  RegisteredRoaming,
}

export enum PhoneLockCategory {
  Status = "phoneLockStatus",
  Time = "phoneLockTime"
}
export interface GetPhoneLockStatusBody {
  category: PhoneLockCategory.Status
}

export interface GetPhoneLockTimeBody {
  category: PhoneLockCategory.Time
}

export interface GetPhoneLockTimeResponseBody {
  phoneLockTime?: number
}
export interface DeviceInfo {
  batteryLevel: string
  batteryState: BatteryState
  currentRTCTime: string
  fsFree: string
  fsFreePercent: string
  fsTotal: string
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
}
