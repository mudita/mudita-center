/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Subview, ViewGenerator } from "generic-view/utils"
import { OverviewConfig } from "../mc-overview.types"

type OverviewSummaryConfig = OverviewConfig["summary"]

export const generateMcOverviewSummaryLayout: ViewGenerator<
  OverviewSummaryConfig,
  Subview
> = (config) => {
  if (config.show) return undefined

  const image: Subview = config.showImg
    ? {
        "mc-overview-summary-img": {
          component: "image",
          layout: {
            flexPlacement: {
              alignSelf: "center",
            },
            padding: "16px 27px",
          },
        },
      }
    : undefined

  const serialNumber: Subview = config.showSerialNumber
    ? {
        "mc-overview-summary-serial-number": {
          component: "labeled-text",
          layout: {
            flexPlacement: {
              alignSelf: "center",
              grow: 1,
            },
            flexLayout: {
              direction: "column",
              rowGap: "8px",
              alignItems: "center",
            },
          },
          config: {
            label: config.serialNumberLabel,
          },
        },
      }
    : undefined

  const about: Subview = config.showAbout
    ? {
        "mc-overview-summary-about-divider": {
          component: "divider",
          layout: {
            margin: "0 -24px",
          },
        },
        "mc-overview-summary-about": {
          component: "button-text",
          layout: {
            flexPlacement: {
              alignSelf: "center",
            },
          },
          config: {
            text: config.aboutTitle,
            icon: config.aboutIcon,
            action: {
              type: "navigate",
              viewKey: "mc-overview/mc-about",
            },
          },
        },
      }
    : undefined

  return {
    "mc-overview-summary": {
      component: "block-box",
      layout: {
        gridPlacement: {
          row: 1,
          column: 1,
          width: 1,
          height: 3,
        },
        flexLayout: {
          direction: "column",
          rowGap: "24px",
        },
      },
      childrenKeys: [
        ...(image ? ["mc-overview-summary-img"] : []),
        ...(serialNumber ? ["mc-overview-summary-serial-number"] : []),
        ...(about
          ? ["mc-overview-summary-about-divider", "mc-overview-summary-about"]
          : []),
      ],
    },
    ...image,
    ...serialNumber,
    ...about,
  }
}
