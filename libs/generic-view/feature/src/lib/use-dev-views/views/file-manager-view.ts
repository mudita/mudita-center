/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FileManagerMarkerColor } from "generic-view/models"
import { IconType, View } from "generic-view/utils"

// @ts-ignore
export const fileManagerView: View = {
  main: {
    component: "mc-file-manager-view",
    config: {
      storages: [
        {
          label: "Phone Storage",
          path: "/storage/emulated/0/",
        },
        // {
        //   label: "SD Card",
        //   path: "/storage/external_sd/",
        // }
      ],
      categories: [
        {
          icon: IconType.MusicNote,
          markerColor: FileManagerMarkerColor.audioFiles,
          label: "Music",
          fileListEmptyStateDescription:
            "Add music files from your computer and they’ll transfer to your device automatically.",
          directoryPath: "Music/",
          supportedFileTypes: ["mp3", "wav", "flac"],
          entityType: "audioFiles",
        },
        {
          label: "Photos",
          fileListEmptyStateDescription:
            "Add image files from your computer and they’ll transfer to your device automatically.",
          icon: IconType.PhotoCatalog,
          markerColor: FileManagerMarkerColor.imageFiles,
          directoryPath: "Pictures/",
          supportedFileTypes: ["jpg", "jpeg", "png"],
          entityType: "imageFiles",
        },
        {
          icon: IconType.Book,
          markerColor: FileManagerMarkerColor.ebookFiles,
          label: "E-books",
          fileListEmptyStateDescription:
            "Add E-book or PDF files from your computer and they’ll transfer to your device automatically.",
          directoryPath: "Documents/",
          supportedFileTypes: ["pdf", "epub"],
          entityType: "ebookFiles",
        },
        {
          icon: IconType.Grid,
          markerColor: FileManagerMarkerColor.applicationFiles,
          label: "Apps",
          fileListEmptyStateDescription:
            "Add android app (.apk) files and install them from here. As Kompakt is a minimalist E-ink device some apps may not work correctly. ",
          entityType: "applicationFiles",
          directoryPath: "/media/apps",
          supportedFileTypes: ["apk"],
        },
      ],
    },
    // @ts-ignore
    screenTitle: "Manage Files",
  },
}
