/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

// FIXME: Using remote module in renderer process isn't a good pattern.
//  You can read more in https://github.com/electron/remote#migrating-from-remote
const { dialog } = require("@electron/remote")

const useLocationPicker = async (
  defaultPath?: string
): Promise<string | null> => {
  const {
    filePaths: [path],
    canceled,
  } = await dialog.showOpenDialog({
    properties: ["openDirectory"],
    defaultPath,
  })

  if (canceled) {
    return null
  } else {
    return path
  }
}

export default useLocationPicker
