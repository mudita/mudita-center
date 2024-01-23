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
          rowGap: "0.8rem",
        },
        padding: "3.2rem",
      },
      childrenKeys: ["serial-number", "imei1", "imei1", "sar"],
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
      component: "button-link",
      config: {
        text: "Check SAR information",
        action: {
          type: "open-modal",
          modalKey: "sar-modal",
          domain: "sar",
        },
      },
    },
    "sar-modal": {
      component: "modal",
      childrenKeys: ["sar-modal-content"],
    },
    "sar-modal-content": {
      component: "text-formatted",
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
  "sar-modal-content": {
    content:
      "# Headline 1\n## Headline 2\n### Headline 3\n#### Headline 4\n##### Headline 5\n###### Headline 6\n\n" +
      "Simple paragraph with *italic text* and **bold text**. This is a [link](https://mudita.com).\n\n" +
      "Another paragraph in new line.\n" +
      "1. A list item\n" +
      "2. Another list item\n" +
      "2. Another list item\n" +
      "2. Another list item\n" +
      "2. Another list item\n" +
      "2. Another list item\n" +
      "2. Another list item\n" +
      "2. Another list item\n" +
      "2. Another list item\n" +
      "2. Another list item\n" +
      "2. Another list item\n" +
      "2. Another list item\n" +
      "2. Another list item\n" +
      "2. Another list item\n" +
      "2. Another list item\n" +
      "2. Another list item\n" +
      "2. Another list item\n\n" +
      "* **A list item.**   \n" +
      "With multiple paragraphs.\n" +
      "* Another list item.\n" +
      "* Abacus\n" +
      "    * absolute\n" +
      "* Bananas\n" +
      "    1. bitter\n" +
      "    2. bupkis\n" +
      "    3. burper\n" +
      "* Cunning\n\n" +
      "> This is a blockquote.\n" +
      "> \n" +
      "> Second paragraph of blockquote.\n\n",
  },
  "new-modal-content": {
    content:
      "Another modal. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  imei1: {
    value: "646510925364900",
  },
  imei2: {
    value: "600510925364900",
  },
}
