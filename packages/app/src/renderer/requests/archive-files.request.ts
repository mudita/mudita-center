/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import {
  ArchiveFilesData,
  ArchiveFilesEvents,
} from "App/main/functions/register-archive-files-listener"

const archiveFiles = async (
  data: ArchiveFilesData
): Promise<Buffer | undefined> => {
  return await ipcRenderer.callMain(ArchiveFilesEvents.Archive, data)
}

export default archiveFiles
