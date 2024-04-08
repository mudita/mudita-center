/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import path from "path"
import { existsSync, mkdirSync } from "fs"

class ScreenshotHelper {
  screenshotsDir = "./screenshots"
  viewsDir = path.join(this.screenshotsDir, "views")
  elementsDir = path.join(this.screenshotsDir, "elements")

  generateFilename = (baseName: string, elementName?: string) => {
    const currentDate = new Date()
    const millisecondsInMinute = 60 * 1000
    const timezoneOffsetMs =
      currentDate.getTimezoneOffset() * millisecondsInMinute
    const dateAsISOString = new Date(currentDate.getTime() - timezoneOffsetMs)
      .toISOString()
      .slice(0, -1)

    let filename
    if (elementName) {
      filename = `${baseName}_${elementName}_${dateAsISOString}.png`
    } else {
      filename = `${baseName}_${dateAsISOString}.png`
    }
    return filename
  }

  /**
   * @brief Save a screenshot of the current browsing context to a PNG file
   */
  async makeViewScreenshot() {
    if (!existsSync(this.viewsDir)) {
      mkdirSync(this.viewsDir, { recursive: true })
    }
    const filename = this.generateFilename("view")
    await browser.saveScreenshot(path.join(this.viewsDir, filename))
  }

  /**
   * @brief Save a PNG screenshot of the element passed as an argument
   * @param element WebdriverIO element to take screenshot of
   */
  async makeElementScreenshot(element: WebdriverIO.Element) {
    if (!existsSync(this.elementsDir)) {
      mkdirSync(this.elementsDir, { recursive: true })
    }
    const elementTagName = await element.getTagName()
    const filename = this.generateFilename("element", elementTagName)
    await element.saveScreenshot(path.join(this.elementsDir, filename))
  }
}

export default new ScreenshotHelper()
