/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { initialState } from "Core/files-manager/reducers"
import { IconType } from "Core/__deprecated__/renderer/components/core/icon/icon-type"

const data = [
  {
    filesType: "Voice Recorder",
    occupiedMemory: 4294967296,
    filesAmount: 3,
    color: "#AEBEC9",
    icon: IconType.VoiceRecorderGrey,
    url: "/tools/voice-recorder",
  },
  {
    filesType: "Storage",
    occupiedMemory: 4294967296,
    filesAmount: 85,
    color: "#E3F3FF",
    icon: IconType.FilesManager,
  },
  {
    filesType: "Free",
    occupiedMemory: 4294967296,
    color: "#E9E9E9",
    icon: IconType.MuditaLogo,
    free: true,
  },
]

export const filesManagerSeed = {
  ...initialState,
  memoryData: data,
}
