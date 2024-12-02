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
        "audioFiles",
        "imageFiles",
        "ebookFiles",
        "applicationFiles",
      ],
    },
    // @ts-ignore
    screenTitle: "Manage Files",
  },
}
