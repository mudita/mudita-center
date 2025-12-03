/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Messages } from "app-localize/utils"
import { HarmonyMscProcessState } from "devices/harmony-msc/models"
import { McHarmonyMscRecoveryModeMessages } from "../../harmony-msc-recovery-mode.messages"

export const recoveryModeFlowProgressMessageMap: Record<
  HarmonyMscProcessState,
  Messages
> = {
  [HarmonyMscProcessState.GettingFilesDetails]:
    McHarmonyMscRecoveryModeMessages.recoveryModeProgressModalStep1,
  [HarmonyMscProcessState.DownloadingFiles]:
    McHarmonyMscRecoveryModeMessages.recoveryModeProgressModalStep2,
  [HarmonyMscProcessState.UnpackingFiles]:
    McHarmonyMscRecoveryModeMessages.recoveryModeProgressModalStep3,
  [HarmonyMscProcessState.FlashingProcess]:
    McHarmonyMscRecoveryModeMessages.recoveryModeProgressModalStep4,
  [HarmonyMscProcessState.SetupTerminal]:
    McHarmonyMscRecoveryModeMessages.recoveryModeProgressModalStep0,
  [HarmonyMscProcessState.FinalStep]:
    McHarmonyMscRecoveryModeMessages.recoveryModeProgressModalStep0,
  [HarmonyMscProcessState.Restarting]:
    McHarmonyMscRecoveryModeMessages.recoveryModeProgressModalStep0,
  [HarmonyMscProcessState.Complete]:
    McHarmonyMscRecoveryModeMessages.recoveryModeProgressModalStep0,
  [HarmonyMscProcessState.Failed]:
    McHarmonyMscRecoveryModeMessages.recoveryModeProgressModalStep0,
  [HarmonyMscProcessState.Idle]:
    McHarmonyMscRecoveryModeMessages.recoveryModeProgressModalStep0,
}

export const RECOVERING_STATE = new Set([
  HarmonyMscProcessState.GettingFilesDetails,
  HarmonyMscProcessState.DownloadingFiles,
  HarmonyMscProcessState.UnpackingFiles,
  HarmonyMscProcessState.FlashingProcess,
])
