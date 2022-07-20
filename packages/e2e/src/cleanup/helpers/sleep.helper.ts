/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export const sleep = async (wait = 1000) =>
  new Promise((resolve) => setTimeout(resolve, wait))
