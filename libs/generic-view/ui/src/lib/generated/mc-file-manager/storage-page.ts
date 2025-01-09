/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ComponentGenerator, IconType, Subview } from "generic-view/utils"
import { McFileManagerConfig } from "generic-view/models"
import {
  generateStorageSummaryBar,
  generateStorageSummaryBarKey,
} from "./storage-summary-bar"
import {
  generateFileCategoryList,
  generateFileCategoryListKey,
} from "./file-category-list"
import { generateOtherFilesList } from "./other-files-list"
import { generateFileListWrapper } from "./file-list"

export const generateStoragePageKey = (key: string) => `storage${key}`

export const generateStoragePage: ComponentGenerator<
  {
    storage: McFileManagerConfig["storages"][number]
    categories: McFileManagerConfig["categories"]
  },
  NonNullable<Subview>
> = (key, config) => {
  const storageFormKey = `storageForm${key}`
  return {
    [generateStoragePageKey(key)]: {
      component: "conditional-renderer",
      dataProvider: {
        source: "form-fields",
        formKey: "mainStorageForm",
        fields: [
          {
            providerField: "activeStoragePath",
            componentField: "data.render",
            condition: "eq",
            value: config.storage.path,
          },
        ],
      },
      childrenKeys: [storageFormKey],
    },
    [storageFormKey]: {
      component: "form",
      config: {
        formOptions: {
          defaultValues: {
            activeCategory: config.categories[0].directoryPath,
            categories: config.categories.map(
              (category) => category.directoryPath
            ),
          },
        },
      },
      childrenKeys: [`fileManagerWrapper${key}`],
    },
    [`fileManagerWrapper${key}`]: {
      component: "block-plain",
      layout: {
        flexLayout: {
          direction: "row",
        },
      },
      childrenKeys: [`fileCategoriesContainer${key}`, `fileListWrapper${key}`],
    },
    [`fileCategoriesContainer${key}`]: {
      component: "block-plain",
      layout: {
        flexPlacement: {
          grow: 1,
        },
      },
      childrenKeys: [
        `storageSummary${key}`,
        generateFileCategoryListKey(key),
        `fileCategoryOtherFilesItem${key}`,
      ],
    },
    [`storageSummary${key}`]: {
      component: "block-plain",
      layout: {
        padding: "32px 32px 64px 32px",
        flexLayout: {
          direction: "column",
        },
      },
      childrenKeys: [
        `storageSummaryHeader${key}`,
        `storageSummaryContent${key}`,
      ],
    },
    [`storageSummaryHeader${key}`]: {
      component: "h3-component",
      layout: {
        margin: "0 0 24px 0",
      },
      config: {
        text: "Phone storage",
      },
    },
    [`storageSummaryContent${key}`]: {
      component: "block-plain",
      layout: {
        gridLayout: {
          rows: ["auto", "auto"],
          columns: ["auto", "auto"],
        },
      },
      childrenKeys: [
        `storageSummaryUsedText${key}`,
        `storageSummaryFreeText${key}`,
        generateStorageSummaryBarKey(key),
      ],
    },
    [`storageSummaryUsedText${key}`]: {
      component: "p3-component",
      config: {
        // TODO: Refactor to template after https://appnroll.atlassian.net/browse/CP-3275
        text: "Used: 0 KB",
        color: "black",
      },
      layout: {
        gridPlacement: {
          row: 1,
          column: 1,
          width: 1,
          height: 1,
        },
      },
    },
    [`storageSummaryFreeText${key}`]: {
      component: "p3-component",
      config: {
        text: "0",
        color: "grey2",
        textTransform: "format-bytes",
        textTransformOptions: {
          minUnit: "KB",
        },
      },
      layout: {
        gridPlacement: {
          row: 1,
          column: 2,
          width: 1,
          height: 1,
        },
        flexLayout: {
          direction: "row",
          justifyContent: "flex-end",
        },
      },
    },
    ...generateStorageSummaryBar(
      key,
      config.categories.map((category) => category.entityType)
    ),
    ...generateFileCategoryList(key, config.categories),
    [`fileCategoryOtherFilesItem${key}`]: {
      component: "block-plain",
      layout: {
        padding: "28px 32px 10px 32px",
        gridLayout: {
          rows: [],
          columns: ["auto", "auto"],
          justifyContent: "space-between",
        },
      },
      childrenKeys: [
        `fileCategoryOtherFilesItemName${key}`,
        `fileCategoryOtherFilesItemInfoIconWrapper${key}`,
      ],
    },
    [`fileCategoryOtherFilesItemName${key}`]: {
      component: "block-plain",
      layout: {
        flexLayout: {
          direction: "row",
          alignItems: "center",
        },
      },
      childrenKeys: [
        `fileCategoryOtherFilesItemNameText${key}`,
        `fileCategoryOtherFilesItemNameSize${key}`,
      ],
    },
    [`fileCategoryOtherFilesItemNameText${key}`]: {
      component: "h4-component",
      config: {
        text: "Other files",
      },
    },
    [`fileCategoryOtherFilesItemNameSize${key}`]: {
      component: "p3-component",
      layout: {
        margin: "0 0 0 3px",
      },
      config: {
        // TODO: Refactor to template after https://appnroll.atlassian.net/browse/CP-3275
        text: "(0 KB)",
        color: "black",
      },
    },
    [`fileCategoryOtherFilesItemInfoIconWrapper${key}`]: {
      component: "block-plain",
      childrenKeys: [`fileCategoryOtherFilesItemInfoIconTooltip${key}`],
    },
    [`fileCategoryOtherFilesItemInfoIconTooltip${key}`]: {
      component: "tooltip",
      config: {
        offset: {
          x: 10,
          y: 0,
        },
        placement: "bottom-left",
      },
      childrenKeys: [
        `fileCategoryOtherFilesItemInfoIconTooltipAnchor${key}`,
        `fileCategoryOtherFilesItemInfoIconTooltipContent${key}`,
      ],
    },
    [`fileCategoryOtherFilesItemInfoIconTooltipAnchor${key}`]: {
      component: "tooltip.anchor",
      childrenKeys: [`fileCategoryOtherFilesItemInfoIcon${key}`],
    },
    [`fileCategoryOtherFilesItemInfoIcon${key}`]: {
      component: "icon",
      layout: {
        width: "25px",
        height: "auto",
      },
      config: {
        type: IconType.Information,
        color: "black",
        size: "small",
      },
    },
    [`fileCategoryOtherFilesItemInfoIconTooltipContent${key}`]: {
      component: "tooltip.content",
      childrenKeys: [`otherFilesList${key}`],
    },
    // TODO: Implement getting this data from the API
    ...generateOtherFilesList(key, [
      { id: "0", name: "Apps" },
      { id: "1", name: "System" },
      { id: "2", name: "Other" },
    ]),
    ...generateFileListWrapper(key, config),
  }
}
