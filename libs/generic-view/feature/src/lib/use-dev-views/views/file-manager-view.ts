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
          directoryPath: "Music/",
          supportedFileTypes: ["mp3", "wav", "flac"],
          entityType: "audioFiles",
        },
        {
          label: "Photos",
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
          directoryPath: "Documents/",
          supportedFileTypes: ["pdf", "epub"],
          entityType: "ebookFiles",
        },
        // {
        //   icon: IconType.Grid,
        //   markerColor: FileManagerMarkerColor.applicationFiles,
        //   entityType: "applicationFiles",
        //   storagePath: "/media/apps",
        //   supportedFileTypes: ["apk"],
        // }
      ],
    },
    // @ts-ignore
    screenTitle: "Manage Files",
  },
}
