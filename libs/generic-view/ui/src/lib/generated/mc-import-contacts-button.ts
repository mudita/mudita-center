/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ComponentGenerator } from "generic-view/utils"
import { McImportContactsButtonConfig } from "generic-view/models"

export const generateMcImportContactsButton: ComponentGenerator<
  McImportContactsButtonConfig
> = (key, config, layout) => {
  return {
    [key]: {
      component: "button-primary",
      config: {
        text: config.text,
        actions: [
          {
            type: "open-modal",
            modalKey: `${key}-modal`,
            domain: "import-contacts",
          },
        ],
      },
      layout,
    },
    [`${key}-modal`]: {
      component: "modal",
      config: {
        size: "small",
        maxHeight: 659,
      },
      childrenKeys: [`${key}-modal-content`],
    },
    [`${key}-modal-content`]: {
      component: "import-contacts",
      config: {
        features: [],
        modalKey: `${key}-contacts`,
      },
    },
  }
}
