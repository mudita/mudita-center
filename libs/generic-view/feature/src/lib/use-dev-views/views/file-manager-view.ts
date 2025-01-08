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
      entityTypes: [
        {
          entityType: "audioFiles",
          storagePath: "/media/audio",
          supportedFileTypes: ["mp3", "wav", "flac"],
        },
        {
          entityType: "imageFiles",
          storagePath: "/media/images",
          supportedFileTypes: ["jpg", "jpeg", "png"],
        },
        {
          entityType: "ebookFiles",
          storagePath: "/media/ebooks",
          supportedFileTypes: ["pdf", "epub"],
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
