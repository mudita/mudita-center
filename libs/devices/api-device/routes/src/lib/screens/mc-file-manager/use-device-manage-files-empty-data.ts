/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IconType } from "app-theme/models"

export const deviceManageFilesEmptyData = {
  categories: [
    {
      id: "audioFiles",
      icon: IconType.MusicNote,
      markerColor: "#E38577",
      label: "Music",
      directoryPath: "",
      fileListEmptyStateDescription:
        "Add music files from your computer and they'll transfer to your device automatically.",
      supportedFileTypes: [],
      size: "0 KB",
      count: 0,
    },
    {
      id: "imageFiles",
      icon: IconType.PhotoCatalog,
      markerColor: "#0E7490",
      label: "Photos",
      directoryPath: "",
      fileListEmptyStateDescription:
        "Add image files from your computer and they'll transfer to your device automatically.",
      supportedFileTypes: [],
      size: "0 KB",
      count: 0,
    },
    {
      id: "ebookFiles",
      icon: IconType.Book,
      markerColor: "#A8DADC",
      label: "E-books",
      directoryPath: "",
      fileListEmptyStateDescription:
        "Add E-book or PDF files from your computer and they'll transfer to your device automatically.",
      supportedFileTypes: [],
      size: "0 KB",
      count: 0,
    },
    {
      id: "applicationFiles",
      icon: IconType.Grid,
      markerColor: "#AEBEC9",
      label: "App Installers",
      directoryPath: "",
      fileListEmptyStateDescription:
        "Add app (.apk) files and install them from here. As Kompakt is a minimalist E-ink device some apps may not work correctly. This may happen due to the google services.",
      supportedFileTypes: [],
      size: "0 KB",
      count: 0,
    },
  ],
  segments: [
    {
      color: "#E38577",
      value: 1,
      minWidth: 24,
      label: "Music (0 KB)",
    },
    {
      color: "#0E7490",
      value: 1,
      minWidth: 24,
      label: "Photos (0 KB)",
    },
    {
      color: "#A8DADC",
      value: 1,
      minWidth: 24,
      label: "E-books (0 KB)",
    },
    {
      color: "#AEBEC9",
      value: 1,
      minWidth: 24,
      label: "App Installers (0 KB)",
    },
    {
      color: "#3B3F42",
      label: "Other files (N/A)",
      value: 1,
      minWidth: 24,
    },
    {
      color: "#F4F5F6",
      label: "Free (N/A)",
      value: 1,
      minWidth: 12,
    },
  ],
  otherSpaceBytes: 0,
  freeSpaceBytes: 0,
  usedSpaceBytes: 0,
}
