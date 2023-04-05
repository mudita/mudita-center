/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */
/** Waits for element to be clickable and clicks it  */
export const waitForClickableAndClick = async (
  element: WebdriverIO.Element
) => {
  await element.waitForClickable()
  await element.click()
}

export const insertTextToElement = async (
  element: WebdriverIO.Element,
  text: string
) => {
  await element.waitForClickable()
  await element.click()
  await element.setValue(text)
}