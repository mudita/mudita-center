/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ViewGenerator } from "../models/api-views.types"

export type IconType =
  | "arrow"
  | "ArrowLongLeft"
  | "battery1"
  | "no-signal"
  | "lte"
  | "device"

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
    showImg: boolean
    imgVariant: string
    showSerialNumber: boolean
    showAbout: boolean
    aboutTitle: string
    aboutSubtitle?: string
    aboutIcon?: IconType
    aboutFields: Array<DetailListFieldConfig>
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
    aboutIcon: "device",
    aboutSubtitle: "Device details",
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
      component: "block-wrapper",
      layout: {
        padding: "2rem",
        gridLayout: {
          rows: [1, 1, 1],
          columns: [1, 2],
          columnGap: "2rem",
          rowGap: "2rem",
        },
        flexPlacement: {
          grow: 1,
        },
      },
      childrenKeys: ["summary", "status", "update"],
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
            justifyContent: "space-between",
          }
        },
        childrenKeys: [
          config.summary.showImg ? "summaryImg" : undefined,
          config.summary.showSerialNumber ? "serial-number" : undefined,
          config.summary.showAbout ? "about" : undefined,
        ].filter(Boolean) as string[],
      },
      summaryImg: {
        component: "block-box",
        layout: {
          flexPlacement: {
            alignSelf: "center",
          },
        },
        parameters: {
          title: "Image",
        },
      },
      "serial-number": {
        component: "block-box",
        layout: {
          flexPlacement: {
            alignSelf: "center",
          },
        },
        parameters: {
          title: config.summary.aboutSubtitle,
        },
      },
      about: {
        component: "block-box",
        layout: {
          flexPlacement: {
            alignSelf: "center",
          },
        },
        parameters: {
          title: config.summary.aboutTitle,
        },
      },
    }),
    status: {
      component: "block-box",
      layout: {
        gridPlacement: {
          row: 1,
          column: 2,
          width: 1,
          height: 1,
        },
        flexLayout: {
          direction: "column",
        },
      },
      parameters: {
        title: "Status"
      },
      childrenKeys: ["battery", "connection"],
    },
    battery: {
      component: "icon-text",
    },
    connection: {
      component: "icon-text",
    },
    update: {
      component: "block-box",
      layout: {
        gridPlacement: {
          row: 2,
          column: 2,
          width: 1,
          height: 1,
        },
        flexLayout: {
          direction: "column",
          justifyContent: "space-between",
        },
      },
    },
  }
}

export const mcOverviewDemoData = {
  battery: {
    icon: "battery-icon-2",
    title: "Battery",
    text: "60 %",
  },
  connection: {
    icon: "network-icon-2",
    title: "Network",
    text: "Network name",
  }
}
