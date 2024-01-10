/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ViewGenerator } from "generic-view/utils"

interface CalendarConfig {
  title: string
}

export const generateMcAboutLayout: ViewGenerator<CalendarConfig> = (
  config
) => {
  return {
    main: {
      screenTitle: "About your Kompakt",
      component: "block-plain",
      childrenKeys: ["header", "divider", "details"],
    },
    header: {
      component: "block-heading",
      config: {
        heading: "About your Kompakt",
        subheading: "The details of your phone.",
      },
      layout: {
        padding: "3.2rem",
        flexLayout: {
          direction: "column",
          rowGap: "0.8rem",
        },
      },
    },
    divider: {
      component: "divider",
    },
    details: {
      component: "block-plain",
      layout: {
        flexLayout: {
          direction: "column",
          rowGap: "1.6rem",
        },
        padding: "3.2rem",
      },
      childrenKeys: ["serial-number", "sar", "imei1", "imei1"],
    },
    "serial-number": {
      component: "about-data-box",
      config: {
        title: "Serial number",
      },
    },
    sar: {
      component: "about-data-box",
      config: {
        title: "SAR",
      },
      childrenKeys: ["sar-button"],
    },
    "sar-button": {
      component: "button-modal",
      config: {
        text: "Check SAR information",
      },
    },
    imei1: {
      component: "about-data-box",
      config: {
        title: "IMEI1",
      },
    },
    imei2: {
      component: "about-data-box",
      config: {
        title: "IMEI2",
      },
    },
  }
}

export const mcAboutDemoData = {
  "serial-number": {
    value: "6XJMD87764MAXA",
  },
  "sar-button": {
    content: "1.6 W/kg",
  },
  imei1: {
    value: "646510925364900",
  },
  imei2: {
    value: "600510925364900",
  },
}
