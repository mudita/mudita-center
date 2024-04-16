/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export const sleep = async (waitTime = 15000) => {
  await browser.pause(waitTime)
}
