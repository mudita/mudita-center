/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Article } from "help/ui"
import { FunctionComponent, useEffect } from "react"
import { AppHelp } from "app-utils/renderer"

export const ArticlePage: FunctionComponent = () => {
  // only temporary for test
  useEffect(() => {
    AppHelp.getData().then(console.log)
  }, [])

  return <Article />
}
