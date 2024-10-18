/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"

if (process.env.NODE_ENV === "development") {
  const whyDidYouRender = require("@welldone-software/why-did-you-render")
  whyDidYouRender(React, {
    trackAllPureComponents: false,
  })
}
