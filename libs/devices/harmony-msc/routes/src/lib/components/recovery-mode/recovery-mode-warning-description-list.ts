/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Platform } from "app-utils/models"
import { platform } from "app-utils/common"
import { Messages } from "app-localize/utils"
import { McHarmonyMscRecoveryModeMessages } from "../../harmony-msc-recovery-mode.messages"

const recoveryModeWarningDescriptionAllPlatforms: Messages[] = [
  McHarmonyMscRecoveryModeMessages.recoveryModeWarningDescriptionAllPlatformsPosition1,
  McHarmonyMscRecoveryModeMessages.recoveryModeWarningDescriptionAllPlatformsPosition2,
  McHarmonyMscRecoveryModeMessages.recoveryModeWarningDescriptionAllPlatformsPosition3,
  McHarmonyMscRecoveryModeMessages.recoveryModeWarningDescriptionAllPlatformsPosition4,
]

const recoveryModeWarningDescriptionLinux: Messages[] = [
  McHarmonyMscRecoveryModeMessages.recoveryModeWarningDescriptionAllPlatformsPosition1,
  McHarmonyMscRecoveryModeMessages.recoveryModeWarningDescriptionLinuxPosition1,
  McHarmonyMscRecoveryModeMessages.recoveryModeWarningDescriptionAllPlatformsPosition2,
  McHarmonyMscRecoveryModeMessages.recoveryModeWarningDescriptionAllPlatformsPosition3,
  McHarmonyMscRecoveryModeMessages.recoveryModeWarningDescriptionAllPlatformsPosition4,
]

export const recoveryModeWarningDescriptionList =
  platform === Platform.linux
    ? recoveryModeWarningDescriptionLinux
    : recoveryModeWarningDescriptionAllPlatforms
