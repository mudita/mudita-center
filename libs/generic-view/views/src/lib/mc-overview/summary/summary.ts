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
  BasicInfo = "summary-basic-info",
  SerialNumber = "summary-serial-number",
  DeviceVersion = "summary-device-version",
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
            width: "177px",
            height: "319px",
            margin: "34px auto",
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
              flexLayout: {
                direction: "column",
                rowGap: "4px",
                alignItems: "flex-start",
              },
            },
            config: {
              label: config.serialNumberLabel,
            },
          },
        }

  const deviceVersion: Subview =
    config.showDeviceVersion === false
      ? undefined
      : {
          [SummaryKeys.DeviceVersion]: {
            component: "labeled-text",
            layout: {
              flexLayout: {
                direction: "column",
                rowGap: "4px",
                alignItems: "flex-start",
              },
            },
            config: {
              label: config.deviceVersionLabel || "Device type",
            },
          },
        }

  const basicInfo: Subview = {
    [SummaryKeys.BasicInfo]: {
      component: "block-plain",
      layout: {
        width: "134px",
        flexLayout: {
          direction: "column",
          rowGap: "12px",
        },
        flexPlacement: {
          alignSelf: "center",
          grow: 1,
        },
      },
      childrenKeys: [
        ...(serialNumber ? [SummaryKeys.SerialNumber] : []),
        ...(deviceVersion ? [SummaryKeys.DeviceVersion] : []),
      ],
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
              width: "280px",
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
              text: config.aboutTitle!,
              icon: config.aboutIcon,
              actions: [
                {
                  type: "navigate",
                  viewKey: "mc-overview/mc-about",
                },
              ],
              modifiers: ["uppercase"],
            },
          },
        }

  return {
    summary: {
      component: "block-box",
      layout: {
        shadow: true,
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
        ...(serialNumber || deviceVersion ? [SummaryKeys.BasicInfo] : []),
        ...(about ? [SummaryKeys.AboutDivider, SummaryKeys.About] : []),
      ],
    },
    ...image,
    ...basicInfo,
    ...serialNumber,
    ...deviceVersion,
    ...about,
  }
}

export const generateMcOverviewSummaryData = (
  data: OverviewData["summary"]
) => {
  console.log("DATA", data)
  const serialNumber = data?.about?.serialNumber
    ? {
        [SummaryKeys.SerialNumber]: {
          text: data.about.serialNumber.text,
        },
      }
    : undefined

  const deviceVersion = data?.about?.deviceVersion
    ? {
        [SummaryKeys.DeviceVersion]: {
          text: data.about.deviceVersion.text,
        },
      }
    : undefined

  return {
    ...serialNumber,
    ...deviceVersion,
  }
}
