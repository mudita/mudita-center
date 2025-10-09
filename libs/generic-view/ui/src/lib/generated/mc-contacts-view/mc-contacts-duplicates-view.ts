/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ComponentGenerator } from "generic-view/utils"
import { McContactsDuplicatesView } from "generic-view/models"

export const generateMcContactsDuplicatesView: ComponentGenerator<
  McContactsDuplicatesView
> = (key, config) => {
  return {
    [key]: {
      component: "block-plain",
      config: {
        backgroundColor: "white",
      },
      childrenKeys: ["duplicatesList"],
    },
    duplicatesList: {
      component: "mc-contacts-duplicates",
      config: {
        loaderConfig: {
          entityTypes: ["contacts"],
          text: "Loading contacts, please wait...",
        },
      },
    },
  }
}
