/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { HelpPaths } from "help/models"
import AppInitPage from "../page-objects/app-init.page"
import Menu from "../page-objects/menu.page"

export const goToHelpCenter = async () => {
  // should open Mudita Help Center
  await Menu.helpLink.click()
  const url = await AppInitPage.getPageUrl()
  await expect(url).toContain(HelpPaths.Index)
}
