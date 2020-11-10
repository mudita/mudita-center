enum BatteryState {
  Discharging,
  Charging,
}

enum SIM {
  SIM1,
  SIM2,
  SIM_FAIL,
  SIM_UNKNOWN,
  NONE,
}

enum RssiBar {
  zero = 0,
  one = 1,
  two = 2,
  three = 3,
  four = 4,
  five = 5,
}

enum Tray {
  OUT = 0,
  IN = 1,
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
  signalStrength: RssiBar
  trayState: Tray
  accessTechnology: AccessTechnology
  networkStatus: NetworkStatus
}
