/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { View } from "generic-view/utils"

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
        // {
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
