/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ComponentGenerator } from "generic-view/utils"
import { McFileManagerConfig } from "generic-view/models"
import { generateStoragePage, generateStoragePageKey } from "./storage-page"

export const generateMcFileManagerView: ComponentGenerator<
  McFileManagerConfig
> = (key, config) => {
  return {
    [key]: {
      component: "block-plain",
      config: {
        backgroundColor: "white",
      },
      layout: {
        width: "100%",
        height: "100%",
        gridLayout: {
          rows: ["1fr"],
          columns: ["1fr"],
        },
      },
      childrenKeys: ["fileManagerLoader"],
    },
    fileManagerLoader: {
      component: "entities-loader",
      config: {
        entityTypes: config.categories.map((category) => category.entityType),
        text: "Loading, please wait...",
      },
      layout: {
        flexLayout: {
          rowGap: "24px",
          direction: "column",
          justifyContent: "center",
          alignItems: "center",
        },
        gridPlacement: {
          row: 1,
          column: 1,
          width: 1,
          height: 2,
        },
      },
      childrenKeys: ["mainStorageForm"],
    },
    mainStorageForm: {
      component: "form",
      config: {
        formOptions: {
          defaultValues: {
            activeStoragePath: config.storages[0].path,
          },
        },
      },
      childrenKeys: config.storages.map((_storage, index) =>
        generateStoragePageKey(index.toString())
      ),
    },
    ...config.storages.reduce((acc, storage, index) => {
      return {
        ...acc,
        ...generateStoragePage(index.toString(), {
          storage,
          categories: config.categories,
        }),
      }
    }, {}),
  }
}
