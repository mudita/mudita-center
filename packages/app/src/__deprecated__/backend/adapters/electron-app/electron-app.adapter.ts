/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import ElectronAppAdapter from "App/__deprecated__/backend/adapters/electron-app/electron-app-adapter.interface"
import { app } from "electron"

const createElectronAppAdapter = (): ElectronAppAdapter => app

export default createElectronAppAdapter
