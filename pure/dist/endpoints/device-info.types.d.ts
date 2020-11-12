declare enum BatteryState {
    Discharging = 0,
    Charging = 1
}
declare enum SIM {
    SIM1 = 0,
    SIM2 = 1,
    SIM_FAIL = 2,
    SIM_UNKNOWN = 3,
    NONE = 4
}
declare enum RssiBar {
    zero = 0,
    one = 1,
    two = 2,
    three = 3,
    four = 4,
    five = 5
}
declare enum Tray {
    OUT = 0,
    IN = 1
}
declare enum AccessTechnology {
    Gsm = 0,
    Utran = 2,
    GsmWEgprs = 3,
    UtranWHsdpa = 4,
    UtranWHsupa = 5,
    UtranWHsdpaAndWHsupa = 6,
    EUtran = 7,
    Unknown = 255
}
declare enum NetworkStatus {
    NotRegistered = 0,
    RegisteredHomeNetwork = 1,
    Searching = 2,
    RegistrationDenied = 3,
    Unknown = 4,
    RegisteredRoaming = 5
}
export interface DeviceInfo {
    batteryLevel: string;
    batteryState: BatteryState;
    currentRTCTime: string;
    fsFree: string;
    fsFreePercent: string;
    fsTotal: string;
    gitBranch: string;
    gitRevision: string;
    gitTag: string;
    selectedSim: SIM;
    signalStrength: RssiBar;
    trayState: Tray;
    accessTechnology: AccessTechnology;
    networkStatus: NetworkStatus;
}
export {};
