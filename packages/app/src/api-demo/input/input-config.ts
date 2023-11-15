export type IconType = "arrow"
  | "ArrowLongLeft"
  | "battery1"
  | "no-signal"
  | "lte"
  | "device"

interface DetailListTextConfig {
  key: string;
  type: "detail-list-text";
  title: string;
}

interface DetailListModalConfig {
  key: string;
  type: "detail-list-modal";
  title: string;
  buttonText: string;
}

type DetailListFieldConfig = DetailListTextConfig | DetailListModalConfig;

interface UpdateTileConfig {
  title: string;
  key: string;
  type: "mc-overview-update";
  currentVersionKey: string;
  showBadge: boolean;
}

interface IconTextRowConfig {
  key: string;
  type: "icon-text";
}

type TileListFieldConfig = IconTextRowConfig

interface TileListConfig {
  title?: string;
  type: "tile-list";
  key: string;
  fields: Array<TileListFieldConfig>;
}

type OverviewSectionsConfig = TileListConfig | UpdateTileConfig;

export interface OverviewConfig {
  title: string;
  summary: {
    show: boolean;
    showImg: boolean;
    imgVariant: string;
    showSerialNumber: boolean;
    showAbout: boolean;
    aboutTitle: string;
    aboutSubtitle?: string;
    aboutIcon?: IconType;
    aboutFields: Array<DetailListFieldConfig>;
  };
  sections: Array<OverviewSectionsConfig>;
}

export const overviewConfig: OverviewConfig = {
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
