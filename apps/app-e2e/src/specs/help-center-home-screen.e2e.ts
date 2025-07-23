/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { goToHelpCenter } from "../helpers/help-center.helper"
import HelpPage from "../page-objects/help.page"

describe("Help Center – Home Screen", () => {
  before(async () => {
    await goToHelpCenter()
  })

  it("should display the Help Center title in the app header", async () => {
    await expect(HelpPage.appHeader).toHaveText("Mudita Help Center")
  })

  it("should display the main welcome header", async () => {
    await expect(HelpPage.mainHeader).toHaveText("Welcome! How can we  you?")
  })

  it("should display the introductory subheader paragraph", async () => {
    await expect(HelpPage.mainSubHeader).toHaveText(
      "Browse our selection of how-to and troubleshooting guides"
    )
  })

  it("should display the search icon and input field", async () => {
    await expect(HelpPage.iconSearch).toBeDisplayed()
    await expect(HelpPage.searchInput).toBeDisplayed()
  })

  it("should display the device categories section title", async () => {
    await expect(HelpPage.categoriesTitle).toHaveText(
      "Which device are you using with Mudita Center?"
    )
  })

  it("should list at least one device category", async () => {
    await expect(HelpPage.categoriesListItems).toBeElementsArrayOfSize({
      gte: 1,
    })
  })

  it("should highlight the first category as active by default", async () => {
    const first = HelpPage.categoriesListItems[0]
    await expect(first).toHaveElementClass("active")
  })

  it("should apply the correct hover styles on category tabs", async () => {
    const first = HelpPage.categoriesListItems[0]
    const second = HelpPage.categoriesListItems[1]
    await second.moveTo()
    const color = await first.getCSSProperty("color")
    const bg = await first.getCSSProperty("background-color")
    await expect(color.value).toBe("rgba(0,0,0,1)")
    await expect(bg.value).toBe("rgba(237,237,237,1)")
  })
})
