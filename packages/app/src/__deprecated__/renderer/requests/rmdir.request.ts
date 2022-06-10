/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { RmdirEvents } from "App/__deprecated__/main/functions/register-rmdir-listener"
import { RmdirProps } from "App/__deprecated__/main/utils/rmdir"

const rmdir = async (props: RmdirProps): Promise<boolean> => {
  return await ipcRenderer.callMain(RmdirEvents.Rmdir, props)
}

export default rmdir
