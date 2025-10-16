/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MenuConfig, MenuConfigResponseValidator } from "./menu-config"
import { IconType } from "app-theme/models"

const minimumMenuConfig: MenuConfig = {
  menuItems: [
    {
      feature: "mc-overview",
      displayName: "Overview",
      icon: IconType.Overview,
    },
  ],
}

describe("MenuConfigResponseValidator", () => {
  it("should return success when correct config is validated", () => {
    const menuConfig = { ...minimumMenuConfig }
    const result = MenuConfigResponseValidator.safeParse(menuConfig)
    expect(result.success).toBeTruthy()
  })
  it("should return fail when object is empty", () => {
    const menuConfig = {}
    const result = MenuConfigResponseValidator.safeParse(menuConfig)
    expect(result.success).toBeFalsy()
  })
  it("should return fail when menuItems array is empty", () => {
    const menuConfig = { ...minimumMenuConfig, menuItems: [] }

    const result = MenuConfigResponseValidator.safeParse(menuConfig)
    expect(result.success).toBeFalsy()
  })
  it("should return fail when menuItem object is empty", () => {
    const menuConfig = { ...minimumMenuConfig, menuItems: [{}] }

    const result = MenuConfigResponseValidator.safeParse(menuConfig)
    expect(result.success).toBeFalsy()
  })
})
