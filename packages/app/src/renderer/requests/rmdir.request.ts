/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import {
  RmdirEvents,
  RmdirProps,
} from "App/main/functions/register-rmdir-listener"

const rmdir = async (props: RmdirProps): Promise<boolean> => {
  return await ipcRenderer.callMain(RmdirEvents.Rmdir, props)
}

export default rmdir
