/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export const removeNewLinesFromString = (text: string) =>
  text.replace(/\s/g, "")
