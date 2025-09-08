/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceProtocol } from "device-protocol/feature"
import { setKompaktConnection } from "./helpers/set-connection"
import { getApiFeaturesAndEntityTypes } from "./helpers/api-configuration-data"
import { APIMenuService } from "device/feature"
import { setActiveDevice } from "./helpers/protocol-validator"

jest.mock("shared/utils", () => {
  return { callRenderer: () => {} }
})
jest.mock("Core/device-manager/services/usb-devices/usb-devices.helper", () => {
  return { getUsbDevices: () => {} }
})
jest.mock("electron-better-ipc", () => {
  return {
    ipcMain: {
      emit: () => {},
    },
  }
})

let deviceProtocol: DeviceProtocol
let featuresAndEntityTypes: { features: string[]; entityTypes: string[] }

describe("API configuration", () => {
  beforeAll(async () => {
    deviceProtocol = setActiveDevice(await setKompaktConnection())
    featuresAndEntityTypes = await getApiFeaturesAndEntityTypes(deviceProtocol)
    await deviceProtocol.activeDevice?.disconnect()
  })

  beforeEach(async () => {
    deviceProtocol = setActiveDevice(await setKompaktConnection())
  })

  afterEach(async () => {
    await deviceProtocol.activeDevice?.disconnect()
  }, 10000)

  it("should receive API menu configuration", async () => {
    const service = new APIMenuService(deviceProtocol)
    const response = await service.getMenuConfig()

    expect(response.ok).toBeTruthy()
    if (!response.ok) {
      return
    }

    const allFeatures = response.data.menuItems.flatMap((item) => {
      const sub = item.submenu || []
      return [item, ...sub].map((entry) => entry.feature)
    })

    featuresAndEntityTypes.features.forEach((feature) => {
      expect(allFeatures).toContain(feature)
    })

    expect(response.data.title).toBe("Kompakt")
    const mcOverviewMenuItem = response.data.menuItems.find(
      (item) => item.feature == "mc-overview"
    )
    const mcContactsMenuItem = response.data.menuItems.find(
      (item) => item.feature == "mc-contacts"
    )
    const mcDataMigrationMenuItem = response.data.menuItems.find(
      (item) => item.feature == "mc-data-migration"
    )
    const mcFileManagerInternalMenuItem = response.data.menuItems.find(
      (item) => item.feature == "mc-file-manager-internal"
    )
    expect(mcOverviewMenuItem?.displayName).toBe("Overview")
    expect(mcOverviewMenuItem?.feature).toBe("mc-overview")
    expect(mcOverviewMenuItem?.icon).toBe("overview")

    expect(mcContactsMenuItem?.displayName).toBe("Contacts")
    expect(mcContactsMenuItem?.feature).toBe("mc-contacts")
    expect(mcContactsMenuItem?.icon).toBe("contacts-book")

    const mcContactsDuplicatesMenuItem = mcContactsMenuItem?.submenu?.find(
      (item) => item.feature === "mc-contacts-duplicates"
    )
    if (mcContactsDuplicatesMenuItem !== undefined) {
      expect(mcContactsMenuItem?.inheritHeaderName).toBeTruthy()
      expect(mcContactsDuplicatesMenuItem).toBeDefined()
      expect(mcContactsDuplicatesMenuItem?.displayName).toBe(
        "Manage Duplicates"
      )
      expect(mcContactsDuplicatesMenuItem?.feature).toBe(
        "mc-contacts-duplicates"
      )
    }

    expect(mcDataMigrationMenuItem?.displayName).toBe("Data Migration")
    expect(mcDataMigrationMenuItem?.feature).toBe("mc-data-migration")
    expect(mcDataMigrationMenuItem?.icon).toBe("data-migration")

    expect(mcFileManagerInternalMenuItem?.displayName).toBe("Manage Files")
    expect(mcFileManagerInternalMenuItem?.feature).toBe(
      "mc-file-manager-internal"
    )
    expect(mcFileManagerInternalMenuItem?.icon).toBe("file-manager")

    if (featuresAndEntityTypes.features.includes("mc-file-manager-external")) {
      expect(mcFileManagerInternalMenuItem?.submenu).toBeDefined()
      expect(
        mcFileManagerInternalMenuItem?.submenu?.length
      ).toBeGreaterThanOrEqual(2)
      if (mcFileManagerInternalMenuItem === undefined) {
        return
      }
      const submenuInternalMenuItem = mcFileManagerInternalMenuItem.submenu![0]
      const submenuExternalMenuItem = mcFileManagerInternalMenuItem.submenu![1]
      expect(submenuInternalMenuItem?.displayName).toBe("Phone storage")
      expect(submenuInternalMenuItem?.feature).toBe("mc-file-manager-internal")
      expect(submenuExternalMenuItem?.displayName).toBe("SD card")
      expect(submenuExternalMenuItem?.feature).toBe("mc-file-manager-external")
    }
  })
})
