/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MenuConfig, MenuConfigValidator } from "./menu-config"

const minimumMenuConfig: MenuConfig = {
  menuItems: [
    {
      feature: "mc-overview",
    },
  ],
}

describe("MenuConfigValidator", () => {
  it("should return success when correct config is validated", () => {
    const menuConfig = { ...minimumMenuConfig }
    const result = MenuConfigValidator.safeParse(menuConfig)
    expect(result.success).toBeTruthy()
  })
  it("should return fail when object is empty", () => {
    const menuConfig = {}
    const result = MenuConfigValidator.safeParse(menuConfig)
    expect(result.success).toBeFalsy()
  })
  it("should return fail when menuItems array is empty", () => {
    const menuConfig = { ...minimumMenuConfig, menuItems: [] }

    const result = MenuConfigValidator.safeParse(menuConfig)
    expect(result.success).toBeFalsy()
  })
  it("should return fail when menuItem object is empty", () => {
    const menuConfig = { ...minimumMenuConfig, menuItems: [{}] }

    const result = MenuConfigValidator.safeParse(menuConfig)
    expect(result.success).toBeFalsy()
  })
})
