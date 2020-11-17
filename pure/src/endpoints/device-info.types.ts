enum BatteryState {
  Discharging,
  Charging,
}

enum SIM {
  One,
  Two,
  Fail,
  Unknown,
  None,
}

enum SignalStrength {
  Zero,
  One,
  Two,
  Three,
  Four,
  Five,
}

enum Tray {
  Out ,
  In ,
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

export interface DeviceInfo {
  batteryLevel: string
  batteryState: BatteryState
  currentRTCTime: string
  fsFree: string
  fsFreePercent: string
  fsTotal: string
  gitBranch: string
  gitRevision: string
  gitTag: string
  selectedSim: SIM
  signalStrength: SignalStrength
  trayState: Tray
  accessTechnology: AccessTechnology
  networkStatus: NetworkStatus
}
