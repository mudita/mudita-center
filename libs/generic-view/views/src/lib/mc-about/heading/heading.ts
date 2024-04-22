/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { OverviewConfig } from "device/models"
import { Subview, ViewGenerator } from "generic-view/utils"

type AboutHeadingConfig = OverviewConfig["summary"]

export const generateMcAboutHeadingLayout: ViewGenerator<
  AboutHeadingConfig,
  Subview
> = (config) => {
  return {
    header: {
      component: "block-heading",
      config: {
        heading: config.aboutTitle!,
        subheading: config.aboutSubtitle,
        modifiers: ["none"],
      },
      layout: {
        padding: "3.2rem",
        flexLayout: {
          direction: "column",
          rowGap: "0.8rem",
        },
      },
    },
  }
}
