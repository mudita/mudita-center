/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

const { dialog } = require("electron").remote

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
