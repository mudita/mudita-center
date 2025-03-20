/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export const featureConfigurationFileManager = {
  main: {
    screenTitle: "Manage Files",
    component: "mc-file-manager-view",
    config: {
      storages: [
        {
          label: "Phone Storage",
          path: "/storage/emulated/0/",
        },
      ],
      categories: [
        {
          label: "Music",
          directoryPath: "Music/",
          supportedFileTypes: ["mp3", "wav", "flac"],
          entityType: "audioFiles",
        },
        {
          label: "Photos",
          directoryPath: "Pictures/",
          supportedFileTypes: ["jpg", "jpeg", "png"],
          entityType: "imageFiles",
        },
        {
          label: "E-books",
          directoryPath: "Documents/",
          supportedFileTypes: ["pdf", "epub"],
          entityType: "ebookFiles",
        },
      ],
    },
  },
}

export const featureConfigurationContacts = {
  main: {
    component: "mc-contacts-view",
    config: {
      entityTypes: ["contacts"],
    },
    // @ts-ignore
    screenTitle: "Contacts",
  },
}

export const featureConfigurationOverview = {
  title: "Overview",
  summary: {
    show: true,
    showImg: true,
    imgVariant: "black",
    showSerialNumber: true,
    serialNumberLabel: "Serial number",
    showAbout: true,
    aboutTitle: "About your device",
    aboutIcon: "device",
    aboutSubtitle: "Device details",
    aboutFields: [
      {
        dataKey: "serialNumber",
        type: "detail-list-text",
        title: "Serial number",
      },
      {
        dataKey: "imei1",
        type: "detail-list-text",
        title: "IMEI (sim slot 1)",
      },
      {
        dataKey: "imei2",
        type: "detail-list-text",
        title: "IMEI (sim slot 2)",
      },
      {
        dataKey: "sar",
        type: "detail-list-modal",
        title: "SAR",
        buttonText: "Check SAR information",
      },
    ],
  },
  sections: [
    {
      title: "Status",
      type: "tile-list",
      dataKey: "status",
      fields: [
        { dataKey: "battery", type: "icon-text" },
        { dataKey: "airplane-mode", type: "icon-text" },
        { dataKey: "connection0", type: "icon-text" },
        { dataKey: "connection1", type: "icon-text" },
      ],
    },
    {
      dataKey: "update",
      type: "mc-overview-update",
      title: "Android OS",
      currentVersionKey: "version",
      showBadge: false,
      versionLabel: "Current version:",
    },
    {
      dataKey: "backup",
      type: "mc-overview-backup",
      title: "Backup",
      backupFeatures: [
        { label: "Contact list", key: "CONTACT_LIST" },
        { label: "Call log", key: "CALL_LOG" },
        { label: "Messages", key: "MESSAGES" },
        { label: "Notes", key: "NOTES" },
        { label: "Calendar events", key: "CALENDAR_EVENTS" },
        {
          label: "OS version & OS settings",
          key: "OS_VERSION_AND_SETTINGS",
        },
        { label: "App settings: Phone, Messages", key: "APP_SETTINGS" },
      ],
      restoreFeatures: [
        {
          label: "Contact list",
          feature: "CONTACT_LIST",
          keys: ["CONTACT_LIST"],
        },
        { label: "Call log", feature: "CALL_LOG", keys: ["CALL_LOG"] },
        { label: "Messages", feature: "MESSAGES", keys: ["MESSAGES"] },
        { label: "Notes", feature: "NOTES", keys: ["NOTES"] },
        {
          label: "Calendar events",
          feature: "CALENDAR_EVENTS",
          keys: ["CALENDAR_EVENTS"],
        },
        {
          label: "OS version & OS settings",
          feature: "OS_VERSION_AND_SETTINGS",
          keys: ["OS_VERSION_AND_SETTINGS"],
        },
        {
          label: "App settings: Phone, Messages",
          feature: "APP_SETTINGS",
          keys: ["APP_SETTINGS"],
        },
      ],
    },
  ],
}
