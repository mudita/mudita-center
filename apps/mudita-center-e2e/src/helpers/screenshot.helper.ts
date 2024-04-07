/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import path from "path"
import { existsSync, mkdirSync } from "fs"

const screenshotsDir = "./screenshots"
const viewsDir = path.join(screenshotsDir, "views")
const elementsDir = path.join(screenshotsDir, "elements")

const generateFilename = (baseName: string, elementName?: string) => {
  const currentDate = new Date()
  const millisecondsInMinute = 60 * 1000
  const timezoneOffsetMs =
    currentDate.getTimezoneOffset() * millisecondsInMinute
  const dateAsISOString = new Date(
    currentDate.getTime() - timezoneOffsetMs
  ).toISOString()

  let filename
  if (elementName) {
    filename = `${baseName}_${elementName}_${dateAsISOString}.png`
  } else {
    filename = `${baseName}_${dateAsISOString}.png`
  }
  return filename
}

class ScreenshotHelper {
  /**
   * @brief Save a screenshot of the current browsing context to a PNG file
   */
  async makeViewScreenshot() {
    if (!existsSync(viewsDir)) {
      mkdirSync(viewsDir, { recursive: true })
    }
    const filename = generateFilename("view")
    await browser.saveScreenshot(path.join(viewsDir, filename))
  }

  /**
   * @brief Save a PNG screenshot of the element passed as an argument
   * @param element WebdriverIO element to take screenshot of
   */
  async makeElementScreenshot(element: WebdriverIO.Element) {
    if (!existsSync(elementsDir)) {
      mkdirSync(elementsDir, { recursive: true })
    }
    const elementTagName = await element.getTagName()
    const filename = generateFilename("element", elementTagName)
    await element.saveScreenshot(path.join(elementsDir, filename))
  }
}

export default new ScreenshotHelper()
