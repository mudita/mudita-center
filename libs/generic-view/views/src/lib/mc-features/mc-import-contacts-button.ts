/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { View, ViewGenerator } from "generic-view/utils"

export const generateMcImportContactsButton: ViewGenerator<View> = (config) => {
  // find entries to replace
  const entriesToGenerate =
    Object.entries(config).filter(([_, value]) => {
      return (value.component as string) === "mc-import-contacts-button"
    }) ?? []

  let fixedConfig = { ...config }

  // remove entries
  entriesToGenerate.forEach(([key]) => {
    delete fixedConfig[key]
  })

  // update children keys
  entriesToGenerate.forEach(([keyToGenerate]) => {
    const newKey = getImportContactsButtonKey(keyToGenerate)

    const newEntries = Object.entries(fixedConfig).map(([key, value]) => {
      return [
        key,
        {
          ...value,
          childrenKeys: [
            ...(value.childrenKeys?.map((item) => {
              return item === keyToGenerate ? newKey : item
            }) ?? []),
          ],
        },
      ]
    })

    fixedConfig = Object.fromEntries(newEntries as []) as View
  })

  // add import contact config
  entriesToGenerate.forEach(([key]) => {
    fixedConfig = { ...fixedConfig, ...getImportContactsButtonComponents(key) }
  })

  return fixedConfig
}

const getImportContactsButtonKey = (mcImportContactsButtonKey: string) => {
  return `${mcImportContactsButtonKey}_import-button`
}

const getImportContactsButtonComponents = (
  mcImportContactsButtonKey: string
) => {
  const importComponents: Omit<View, "main"> = {
    [getImportContactsButtonKey(mcImportContactsButtonKey)]: {
      component: "button-primary",
      config: {
        text: "import contacts",
        action: {
          type: "open-modal",
          modalKey: `${mcImportContactsButtonKey}_import-contacts-modal`,
          domain: "import-contacts",
        },
      },
      layout: {
        margin: "16px",
      },
    },
    [`${mcImportContactsButtonKey}_import-contacts-modal`]: {
      component: "modal",
      config: {
        size: "medium",
        maxHeight: 659,
      },
      childrenKeys: [
        `${mcImportContactsButtonKey}_import-contacts-modal-content`,
      ],
    },
    [`${mcImportContactsButtonKey}_import-contacts-modal-content`]: {
      component: "import-contacts",
      config: {
        features: [],
        modalKey: `${mcImportContactsButtonKey}_import-contacts-modal`,
      },
    },
  }
  return importComponents
}
