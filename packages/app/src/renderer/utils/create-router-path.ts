/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { URL_MAIN, URL_TABS } from "Renderer/constants/urls"

//if params contains sensitive data, they should be added to scrubFields array in logger.ts
const createRouterPath = (
  link:
    | typeof URL_MAIN[keyof typeof URL_MAIN]
    | typeof URL_TABS[keyof typeof URL_TABS],
  params: Record<string, string>
): string => {
  return `${link}?${new URLSearchParams(params).toString()}`
}

export default createRouterPath
