/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { E2EMockClient } from "e2e-mock/client"
import { MockAppHttpResponsePayload } from "app-utils/models"
import { HelpPaths } from "help/models"
import AppInitPage from "../page-objects/app-init.page"
import Menu from "../page-objects/menu.page"
import HelpPage from "../page-objects/help.page"
import HelpArticlePage from "../page-objects/help-article.page"

export const goToHelpCenter = async (payload?: MockAppHttpResponsePayload) => {
  if (process.env.MOCK_SERVER_ENABLED === "1" && payload) {
    await E2EMockClient.connect()
    E2EMockClient.mockAppHttpResponse(payload)
  }
  // should open Mudita Help Center
  await Menu.helpLink.click()
  const url = await AppInitPage.getPageUrl()
  await expect(url).toContain(HelpPaths.Index)
}

export const goToHelpArticleWithTitle = async (title:string) => {
  await goToHelpCenter()

  await HelpPage.categoriesListItems[0].click()

  const items = await HelpArticlePage.articleItems
  let clicked = false

  for (const el of items) {
    const text = (await el.getText()).trim()
    if (text === title) {
      await el.click()
      clicked = true
      break
    }
  }

  if (!clicked) {
    throw new Error(`No article found with title: "${title}"`)
  }
}

export const verifyHelpHomeScreenCoreElements = async () => {
  it("should display the Help Center title in the app header", async () => {
    await expect(HelpPage.appHeader).toHaveText("Mudita Help Center")
  })

  it("should display the main welcome header", async () => {
    await expect(HelpPage.mainHeader).toHaveText(
      "Welcome! How can we help you?"
    )
  })

  it("should display the introductory subheader paragraph", async () => {
    await expect(HelpPage.mainSubHeader).toHaveText(
      "Browse our selection of how-to and troubleshooting guides"
    )
  })

  it("should display the search icon and input field", async () => {
    await expect(HelpPage.searchInputIconSearch).toBeDisplayed()
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
}
