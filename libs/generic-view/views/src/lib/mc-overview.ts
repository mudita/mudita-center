/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IconType, ViewGenerator } from "generic-view/utils"
import { kompaktImg } from "Root/demo-data/kompakt-img"

interface DetailListTextConfig {
  key: string
  type: "detail-list-text"
  title: string
}

interface DetailListModalConfig {
  key: string
  type: "detail-list-modal"
  title: string
  buttonText: string
}

type DetailListFieldConfig = DetailListTextConfig | DetailListModalConfig

interface UpdateTileConfig {
  title: string
  key: string
  type: "mc-overview-update"
  currentVersionKey: string
  showBadge: boolean
}

interface IconTextRowConfig {
  key: string
  type: "icon-text"
}

type TileListFieldConfig = IconTextRowConfig

interface TileListConfig {
  title?: string
  type: "tile-list"
  key: string
  fields: Array<TileListFieldConfig>
}

type OverviewSectionsConfig = TileListConfig | UpdateTileConfig

export interface OverviewConfig {
  title: string
  summary: {
    show: boolean
    showImg?: boolean
    imgVariant?: string
    showSerialNumber?: boolean
    showAbout?: boolean
    aboutTitle?: string
    aboutSubtitle?: string
    aboutIcon?: IconType
    aboutFields?: Array<DetailListFieldConfig>
  }
  sections: Array<OverviewSectionsConfig>
}

export const mcOverviewConfig: OverviewConfig = {
  title: "Overview",
  summary: {
    show: true,
    showImg: true,
    imgVariant: "black",
    showSerialNumber: true,
    showAbout: true,
    aboutTitle: "About your device",
    aboutIcon: IconType.Battery1,
    aboutSubtitle: "The details of your phone.",
    aboutFields: [
      {
        key: "serialNumber",
        type: "detail-list-text",
        title: "Serial number",
      },
      {
        key: "sarText",
        type: "detail-list-modal",
        title: "SAR",
        buttonText: "check sar information",
      },
    ],
  },
  sections: [
    {
      title: "Status",
      key: "status",
      type: "tile-list",
      fields: [
        {
          key: "battery",
          type: "icon-text",
        },
        {
          key: "connection",
          type: "icon-text",
        },
      ],
    },
    {
      title: "MuditaOS",
      key: "update",
      type: "mc-overview-update",
      currentVersionKey: "version",
      showBadge: true,
    },
  ],
}

export const generateMcOverviewLayout: ViewGenerator<OverviewConfig> = (
  config
) => {
  return {
    main: {
      screenTitle: config.title,
      component: "block-plain",
      layout: {
        padding: "32px",
        gridLayout: {
          rows: [1.56, 1, 1],
          columns: ["280px", 1],
          columnGap: "32px",
          rowGap: "32px",
        },
        flexPlacement: {
          grow: 1,
        },
      },
      childrenKeys: [
        "summary",
        ...config.sections.map((section) => section.key),
      ],
    },
    ...(config.summary.show && {
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
          config.summary.showImg ? "device-image" : undefined,
          config.summary.showSerialNumber ? "serial-number" : undefined,
          config.summary.showAbout ? "aboutDivider" : undefined,
          config.summary.showAbout ? "about" : undefined,
        ].filter(Boolean) as string[],
      },
      "device-image": {
        component: "image",
        layout: {
          flexPlacement: {
            alignSelf: "center",
          },
          padding: "16px 27px",
        },
      },
      "serial-number": {
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
          label: "Serial number",
        },
      },
      aboutDivider: {
        component: "divider",
        layout: {
          margin: "0 -24px",
        },
      },
      about: {
        component: "button-text",
        layout: {
          flexPlacement: {
            alignSelf: "center",
          },
        },
        config: {
          text: "About your Kompakt",
          icon: "phone-about",
          action: {
            type: "navigate",
            viewKey: "mc-overview/mc-about",
          },
        },
      },
    }),
    status: {
      component: "block-box",
      config: {
        title: "Status",
      },
      layout: {
        gridPlacement: {
          row: 1,
          column: 2,
          width: 1,
          height: 1,
        },
        flexLayout: {
          direction: "column",
          rowGap: "10px",
        },
      },

      childrenKeys: ["battery", "connection"],
    },
    battery: {
      component: "icon-text",
    },
    connection: {
      component: "icon-text",
      layout: {
        flexPlacement: {
          grow: 1,
        },
      },
    },
    update: {
      component: "block-box",
      config: {
        title: "Android OS",
      },
      layout: {
        gridPlacement: {
          row: 2,
          column: 2,
          width: 1,
          height: 1,
        },
        flexPlacement: {
          grow: 1,
        },
        flexLayout: {
          direction: "column",
          justifyContent: "space-between",
        },
      },
      childrenKeys: ["version"],
    },
    version: {
      component: "overview-os-version",
      config: {
        versionLabel: "Current version:",
      },
    },
  }
}

export const mcOverviewDemoData = {
  "device-image": {
    src: kompaktImg,
  },
  "serial-number": {
    text: "6XJMD87764MAXA",
  },
  battery: {
    icon: "battery-1",
    title: "60 %",
    text: "Battery",
  },
  connection: {
    icon: "network-signal-2",
    title: "Network",
    text: "Network name",
  },
  version: {
    version: "Android 13",
    update: {
      available: true,
      text: "Update available (Android 14)",
      actionLabel: "You can update it on your device",
    },
  },
}
