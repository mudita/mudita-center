/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ComponentGenerator } from "generic-view/utils"
import { McFileManagerConfig } from "generic-view/models"
import { generateStoragePage } from "./storage-page"
import { camelCase } from "lodash"
import {
  getFileManagerLoaderKey,
  getFileManagerMainStorageFormKey,
  getFileManagerStoragePageKey,
} from "./helpers"

export const generateMcFileManagerView: ComponentGenerator<
  McFileManagerConfig
> = (key, config, _layout, feature = "") => {
  const temporaryConfig = {
    ...config,
    categories: config.categories,
  }

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
      childrenKeys: [`${camelCase(feature)}fileManagerLoader`],
    },
    [getFileManagerLoaderKey(feature)]: {
      component: "entities-loader",
      config: {
        entityTypes: temporaryConfig.categories.map(
          (category) => category.entityType
        ),
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
      childrenKeys: [getFileManagerMainStorageFormKey(feature)],
    },
    [getFileManagerMainStorageFormKey(feature)]: {
      component: "form",
      config: {
        formOptions: {
          defaultValues: {
            activeStoragePath: temporaryConfig.storages[0].path,
          },
        },
      },
      childrenKeys: config.storages.map((_storage, index) => {
        return getFileManagerStoragePageKey(feature, index, "Storage")
      }),
    },
    ...temporaryConfig.storages.reduce((acc, storage, index) => {
      return {
        ...acc,
        ...generateStoragePage(getFileManagerStoragePageKey(feature, index), {
          mainFormKey: getFileManagerMainStorageFormKey(feature),
          storage,
          categories: temporaryConfig.categories,
        }),
      }
    }, {}),
  }
}
