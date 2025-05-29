/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { execPromise } from "shared/utils"

const killGvfsdMtp = async () => {
  try {
    await execPromise("pkill gvfsd-mtp")
    console.log("Process gvfsd-mtp killed")
  } catch (error) {
    console.error("Failed to kill gvfsd-mtp:", error)
  }
}

export const preSendFilesCleanup = async (): Promise<void> => {
  if (process.platform === "linux") {
    await killGvfsdMtp()
  }
}
