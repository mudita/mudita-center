/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { defineMessages } from "app-localize/utils"

export const harmonyOverviewOsSectionMessages = defineMessages({
  versionLabel: {
    id: "harmony.overview.os.versionLabel",
  },
  versionText: {
    id: "harmony.overview.os.versionText",
  },
  updateCheckButton: {
    id: "harmony.overview.os.update.checkButton",
  },
  downloadNowButton: {
    id: "harmony.overview.os.update.downloadButton",
  },
  updateNowButton: {
    id: "harmony.overview.os.update.updateButton",
  },
  badgeUpdateAvailable: {
    id: "harmony.overview.os.badge.available",
  },
  badgeUpToDate: {
    id: "harmony.overview.os.badge.notAvailable",
  },
})

export const harmonyUpdateAvailableModalUpdateMessages = defineMessages({
  harmonyUpdateAvailableModalTitle: {
    id: "harmony.overview.os.update.modal.available.title",
  },
  harmonyUpdateAvailableModalDescription: {
    id: "harmony.overview.os.update.modal.available.description",
  },
  harmonyUpdateAvailableModalDownloadButton: {
    id: "harmony.overview.os.update.downloadButton",
  },
  harmonyUpdateAvailableModalUpdateButton: {
    id: "harmony.overview.os.update.updateButton",
  },
})

export const harmonyForceUpdateAvailableModalMessages = defineMessages({
  ...harmonyUpdateAvailableModalUpdateMessages,
  harmonyUpdateAvailableModalTitle: {
    id: "harmony.overview.os.forceUpdate.modal.available.title",
  },
})

export const harmonyUpdateDownloadedModalMessages = defineMessages({
  harmonyUpdateDownloadedModalTitle: {
    id: "harmony.overview.os.update.modal.downloaded.title",
  },
  harmonyUpdateDownloadedModalDescription: {
    id: "harmony.overview.os.update.modal.downloaded.description",
  },
  harmonyUpdateDownloadedModalUpdateButton: {
    id: "harmony.overview.os.update.updateButton",
  },
})

export const harmonyForceUpdateDownloadedModalMessages = defineMessages({
  ...harmonyUpdateDownloadedModalMessages,
  harmonyUpdateDownloadedModalTitle: {
    id: "harmony.overview.os.forceUpdate.modal.downloaded.title",
  },
})
