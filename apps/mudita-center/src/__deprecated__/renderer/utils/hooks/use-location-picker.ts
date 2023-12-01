/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

// FIXME: Using remote module in renderer process isn't a good pattern.
//  You can read more in https://github.com/electron/remote#migrating-from-remote
// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
const { dialog } = require("@electron/remote")

const useLocationPicker = async (
  defaultPath?: string
): Promise<string | null> => {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const {
    filePaths: [path],
    canceled,
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  } = await dialog.showOpenDialog({
    properties: ["openDirectory"],
    defaultPath,
  })

  if (canceled) {
    return null
  } else {
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return path
  }
}

export default useLocationPicker
