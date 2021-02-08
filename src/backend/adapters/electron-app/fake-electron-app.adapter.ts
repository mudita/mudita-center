/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import ElectronAppAdapter from "Backend/adapters/electron-app/electron-app-adapter.interface"

const createFakeElectronAppAdapter = (): ElectronAppAdapter => {
  return {
    getVersion(): string {
      return "6.6.6"
    },
    getLocale(): string {
      return "CN"
    },
    getName(): string {
      return "Dirty App"
    },
  } as ElectronAppAdapter
}

export default createFakeElectronAppAdapter
