/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  generateViewConfig,
  getViewChildrenKeys,
  MainView,
  View,
  ViewGenerator,
} from "generic-view/utils"
import { AboutData, OverviewConfig } from "device/models"
import { generateMcAboutHeadingLayout } from "./heading/heading"
import { generateMcAboutHeadingDividerLayout } from "./heading/divider"
import { generateMcAboutListTextLayout } from "./list-text/list-text"
import {
  generateMcAboutListModalData,
  generateMcAboutListModalLayout,
} from "./list-modal/list-modal"
import { generateMcAboutDetailsLayout } from "./details/details"

export const generateMcAboutLayout: ViewGenerator<OverviewConfig> = (
  config
) => {
  const mainConfig: MainView = {
    screenTitle: config.summary.aboutTitle!,
    component: "block-plain",
  }
  const heading = generateMcAboutHeadingLayout(config.summary)
  const headingDivider = generateMcAboutHeadingDividerLayout(undefined)
  const detailsItems =
    config.summary.aboutFields?.map((field) => {
      switch (field.type) {
        case "detail-list-text":
          return generateMcAboutListTextLayout(field)
        case "detail-list-modal":
          return generateMcAboutListModalLayout(field)
        default:
          return undefined
      }
    }) || []
  const details = generateMcAboutDetailsLayout({
    childrenKeys: getViewChildrenKeys(detailsItems),
  })
  return generateViewConfig(
    mainConfig,
    [heading, headingDivider, details],
    detailsItems
  )
}

export const generateMcAboutData = (data: AboutData, config?: View) => {
  return generateMcAboutListModalData(data, config!)
}
