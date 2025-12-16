/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

export enum CaseColour {
  Black = "black",
  Gray = "gray",
}

export enum OnboardingState {
  InProgress,
  Finished,
}

export enum HarmonyLogsFileList {
  SystemLogs = 0,
  CrashDumps = 1,
}

export const HarmonyInfoRequestValidator = z.undefined().optional()

export const HarmonyInfoResponseValidator = z.object({
  // backupLocation is a deprecated field after Pure_1.6.0 & Harmony_1.9.0 (UDM releases)
  backupLocation: z.string().optional(),
  batteryLevel: z.preprocess(Number, z.number().min(0).max(100)),
  currentRTCTime: z.string(),
  systemReservedSpace: z
    .string()
    .optional()
    .transform((v) => (v ? Number(v) * 1024 ** 2 : undefined)),
  usedUserSpace: z
    .string()
    .optional()
    .transform((v) => (v ? Number(v) * 1024 ** 2 : undefined)),
  deviceSpaceTotal: z
    .string()
    .optional()
    .transform((v) => (v ? Number(v) * 1024 ** 2 : undefined)),
  gitBranch: z.string(),
  gitRevision: z.string(),
  version: z.string(),
  serialNumber: z.string(),
  caseColour: z.enum(CaseColour).default(CaseColour.Gray),
  backupFilePath: z.string().optional(),
  updateFilePath: z.string().default("/sys/user/update.tar"),
  syncFilePath: z.string().optional(),
  recoveryStatusFilePath: z.string().optional(),
  onboardingState: z.preprocess(Number, z.enum(OnboardingState)).optional(),
})

export type HarmonyInfoResponse = z.output<typeof HarmonyInfoResponseValidator>

export const HarmonyLogsRequestValidator = z.object({
  fileList: z.enum(HarmonyLogsFileList),
})

export type HarmonyLogsRequest = z.input<typeof HarmonyLogsRequestValidator>

export const HarmonyLogsValidator = z
  .object({
    files: z.array(z.string()).optional(),
  })
  .optional()

export type HarmonyLogsResponse = z.output<typeof HarmonyLogsValidator>
