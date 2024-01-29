/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Subview, ViewGenerator } from "generic-view/utils"
import { OverviewConfig, OverviewData } from "device/models"
import { kompaktImg } from "Root/demo-data/kompakt-img"

type OverviewSummaryConfig = OverviewConfig["summary"]

enum SummaryKeys {
  Image = "summary-img",
  SerialNumber = "summary-serial-number",
  AboutDivider = "summary-about-divider",
  About = "summary-about",
}

export const generateMcOverviewSummaryLayout: ViewGenerator<
  OverviewSummaryConfig,
  Subview
> = (config) => {
  if (config.show === false) return undefined

  const image: Subview = config.showImg
    ? {
        [SummaryKeys.Image]: {
          component: "image",
          layout: {
            flexPlacement: {
              alignSelf: "center",
            },
            padding: "32px 27px 16px 27px",
          },
          config: {
            // TODO: implement support for config.imgVariant
            src: kompaktImg,
          },
        },
      }
    : undefined

  const serialNumber: Subview =
    config.showSerialNumber === false
      ? undefined
      : {
          [SummaryKeys.SerialNumber]: {
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

  const about: Subview =
    config.showAbout === false
      ? undefined
      : {
          [SummaryKeys.AboutDivider]: {
            component: "divider",
            layout: {
              margin: "0 -24px",
            },
          },
          [SummaryKeys.About]: {
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

  return {
    summary: {
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
        ...(image ? [SummaryKeys.Image] : []),
        ...(serialNumber ? [SummaryKeys.SerialNumber] : []),
        ...(about ? [SummaryKeys.AboutDivider, SummaryKeys.About] : []),
      ],
    },
    ...image,
    ...serialNumber,
    ...about,
  }
}

export const generateMcOverviewSummaryData = (
  data: OverviewData["summary"]
) => {
  const serialNumber = data?.about?.serialNumber
    ? {
        [SummaryKeys.SerialNumber]: {
          text: data.about.serialNumber.text,
        },
      }
    : undefined

  return {
    ...serialNumber,
  }
}
