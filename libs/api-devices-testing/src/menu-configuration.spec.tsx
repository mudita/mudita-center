/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  buildMenuConfigRequest,
  MenuConfigResponseValidator,
} from "devices/api-device/models"
import {
  ApiDeviceContext,
  initApiDeviceContext,
} from "./helpers/api-device-context"
import { getApiFeaturesAndEntityTypes } from "./helpers/get-api-features-and-entity-types"

let apiDeviceContext: ApiDeviceContext
let featuresAndEntityTypes: { features: string[]; entityTypes: string[] }

describe("API configuration", () => {
  beforeAll(async () => {
    apiDeviceContext = await initApiDeviceContext()
    featuresAndEntityTypes =
      await getApiFeaturesAndEntityTypes(apiDeviceContext)
  }, 30_000)

  beforeEach(async () => {
    apiDeviceContext = await initApiDeviceContext()
  }, 30_000)

  afterEach(async () => {
    await apiDeviceContext.reset()
  }, 30_000)

  it("should receive API menu configuration", async () => {
    const { service, deviceId } = apiDeviceContext
    const response = await service.request(deviceId, {
      ...buildMenuConfigRequest({
        lang: "en-US",
      }),
      options: {
        timeout: 60_000,
      },
    })

    expect(response.status).toBe(200)

    const buildMenuConfigData = MenuConfigResponseValidator.parse(response.body)

    const allFeatures = buildMenuConfigData.menuItems.flatMap((item) => {
      const sub = item.submenu || []
      return [item, ...sub].map((entry) => entry.feature)
    })

    featuresAndEntityTypes.features.forEach((feature) => {
      expect(allFeatures).toContain(feature)
    })

    expect(buildMenuConfigData.title).toBe("Kompakt")
    const mcOverviewMenuItem = buildMenuConfigData.menuItems.find(
      (item) => item.feature === "mc-overview"
    )
    const mcContactsMenuItem = buildMenuConfigData.menuItems.find(
      (item) => item.feature === "mc-contacts"
    )
    const mcDataMigrationMenuItem = buildMenuConfigData.menuItems.find(
      (item) => item.feature === "mc-data-migration"
    )
    const mcFileManagerInternalMenuItem = buildMenuConfigData.menuItems.find(
      (item) => item.feature === "mc-file-manager-internal"
    )
    expect(mcOverviewMenuItem?.displayName).toBe("Overview")
    expect(mcOverviewMenuItem?.feature).toBe("mc-overview")
    expect(mcOverviewMenuItem?.icon).toBe("overview")

    expect(mcContactsMenuItem?.displayName).toBe("Contacts")
    expect(mcContactsMenuItem?.feature).toBe("mc-contacts")
    expect(mcContactsMenuItem?.icon).toBe("contacts-book")

    // TODO: reenable when duplicates management is available
    // const mcContactsDuplicatesMenuItem = mcContactsMenuItem?.submenu?.find(
    //   (item) => item.feature === "mc-contacts-duplicates"
    // )
    // if (mcContactsDuplicatesMenuItem !== undefined) {
    //   expect(mcContactsMenuItem?.inheritHeaderName).toBeTruthy()
    //   expect(mcContactsDuplicatesMenuItem).toBeDefined()
    //   expect(mcContactsDuplicatesMenuItem?.displayName).toBe(
    //     "Manage Duplicates"
    //   )
    //   expect(mcContactsDuplicatesMenuItem?.feature).toBe(
    //     "mc-contacts-duplicates"
    //   )
    // }

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
