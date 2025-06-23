/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Subview, ViewGenerator } from "generic-view/utils"

interface Config {
  childrenKeys: string[]
}

export const generateMcAboutDetailsLayout: ViewGenerator<Config, Subview> = (
  config
) => {
  return {
    details: {
      component: "block-plain",
      layout: {
        flexPlacement: {
          grow: 1,
        },
        flexLayout: {
          direction: "column",
          rowGap: "0.8rem",
        },
        padding: "3.2rem",
      },
      childrenKeys: config.childrenKeys,
    },
  }
}
