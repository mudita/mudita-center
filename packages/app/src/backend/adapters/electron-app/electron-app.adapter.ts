/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import ElectronAppAdapter from "Backend/adapters/electron-app/electron-app-adapter.interface"
import { app } from "electron"

const createElectronAppAdapter = (): ElectronAppAdapter => app

export default createElectronAppAdapter
