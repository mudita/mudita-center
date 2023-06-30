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

/** Returns date string in format YYYY:MM:DD HH:MM:SS  */
export function getFullDate() {
  const d = new Date()
  const seconds = (d.getSeconds() > 9 ? "" : "0") + d.getSeconds()
  const minutes = (d.getMinutes() > 9 ? "" : "0") + d.getMinutes()
  const hours = (d.getHours() > 9 ? "" : "0") + d.getHours()
  const day = (d.getDate() > 9 ? "" : "0") + d.getDate()
  const month = (d.getMonth() + 1 > 9 ? "" : "0") + (d.getMonth() + 1)
  const year = d.getFullYear()

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}
