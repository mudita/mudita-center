/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

export enum BatteryState {
  Discharging,
  Charging,
  Full,
}

export enum SIM {
  One,
  Two,
  Fail,
  Unknown,
  None,
}

export enum SignalStrength {
  Zero,
  One,
  Two,
  Three,
  Four,
  Five,
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

export enum CaseColor {
  Black = "black",
  Gray = "gray",
}

export enum OnboardingState {
  InProgress,
  Finished,
}

export const PureInfoRequestValidator = z.undefined().optional()

export const PureInfoResponseValidator = z.object({
  // backupLocation is a deprecated field after Pure_1.6.0 & Harmony_1.9.0 (UDM releases)
  backupLocation: z.string().optional(),
  batteryLevel: z.preprocess(Number, z.number().min(0).max(100)),
  batteryState: z.preprocess(Number, z.nativeEnum(BatteryState)),
  currentRTCTime: z.string(),
  systemReservedSpace: z.string(),
  usedUserSpace: z.string(),
  deviceSpaceTotal: z.string(),
  gitBranch: z.string(),
  gitRevision: z.string(),
  version: z.string(),
  selectedSim: z.preprocess(Number, z.nativeEnum(SIM)),
  signalStrength: z.preprocess(Number, z.nativeEnum(SignalStrength)),
  networkOperatorName: z.string(),
  trayState: z.preprocess(Number, z.nativeEnum(Tray)),
  accessTechnology: z.preprocess(Number, z.nativeEnum(AccessTechnology)),
  networkStatus: z.preprocess(Number, z.nativeEnum(NetworkStatus)),
  serialNumber: z.string(),
  caseColour: z.nativeEnum(CaseColor),
  deviceToken: z.string().optional(),
  backupFilePath: z.string(),
  updateFilePath: z.string().optional(),
  syncFilePath: z.string(),
  recoveryStatusFilePath: z.string(),
  onboardingState: z.preprocess(Number, z.nativeEnum(OnboardingState)),
})

export type PureInfoResponse = z.infer<typeof PureInfoResponseValidator>
