/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export const generateUniqueNumber = () =>
  Date.now() + Math.floor(Math.random() * 1000)
