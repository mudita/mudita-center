import { filesSlotsHarmonyLimit } from "App/files-manager/constants/files-slots-harmony-limit.constans"

export const getFreeFilesSlotsCountForHarmony = (
  filesCount: number
): number => {
  return Math.max(filesSlotsHarmonyLimit - filesCount, 0)
}
