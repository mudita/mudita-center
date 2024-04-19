/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ComponentGenerator, Subview } from "generic-view/utils"
import { McDeviceSummaryConfig } from "generic-view/models"
import { kompaktImg } from "Root/demo-data/kompakt-img"

export const generateMcDeviceSummaryConfig: ComponentGenerator<
  McDeviceSummaryConfig
> = ({ key, config }) => {
  const imageKey = `${key}-image`
  const serialNumberKey = `${key}-serial-number`
  const aboutKey = `${key}-about`
  const aboutDividerKey = `${key}-about-divider`

  return undefined
  // const image: Subview = config.summary.showImg
  //   ? {
  //       [imageKey]: {
  //         component: "image",
  //         layout: {
  //           flexPlacement: {
  //             alignSelf: "center",
  //           },
  //           padding: "32px 27px 16px 27px",
  //         },
  //         config: {
  //           // TODO: implement support for config.imgVariant
  //           src: kompaktImg,
  //         },
  //       },
  //     }
  //   : undefined
  //
  // const serialNumber: Subview =
  //   config.summary.showSerialNumber === false
  //     ? undefined
  //     : {
  //         [serialNumberKey]: {
  //           component: "labeled-text",
  //           layout: {
  //             flexPlacement: {
  //               alignSelf: "center",
  //               grow: 1,
  //             },
  //             flexLayout: {
  //               direction: "column",
  //               rowGap: "8px",
  //               alignItems: "center",
  //             },
  //           },
  //           config: {
  //             label: config.summary.serialNumberLabel,
  //           },
  //         },
  //       }
  //
  // const about: Subview =
  //   config.summary.showAbout === false
  //     ? undefined
  //     : {
  //         [aboutDividerKey]: {
  //           component: "divider",
  //           layout: {
  //             margin: "0 -24px",
  //           },
  //         },
  //         [aboutKey]: {
  //           component: "button-text",
  //           layout: {
  //             flexPlacement: {
  //               alignSelf: "center",
  //             },
  //           },
  //           config: {
  //             text: config.summary.aboutTitle!,
  //             icon: config.summary.aboutIcon,
  //             action: {
  //               type: "navigate",
  //               viewKey: "mc-overview/mc-about",
  //             },
  //             modifiers: ["uppercase"],
  //           },
  //         },
  //       }
  //
  // return {
  //   [key]: {
  //     component: "block-box",
  //     layout: {
  //       gridPlacement: {
  //         row: 1,
  //         column: 1,
  //         width: 1,
  //         height: 3,
  //       },
  //       flexLayout: {
  //         direction: "column",
  //         rowGap: "24px",
  //       },
  //     },
  //     childrenKeys: [
  //       ...(image ? [imageKey] : []),
  //       ...(serialNumber ? [serialNumberKey] : []),
  //       ...(about ? [aboutDividerKey, aboutKey] : []),
  //     ],
  //   },
  //   ...image,
  //   ...serialNumber,
  //   ...about,
  // }
}
