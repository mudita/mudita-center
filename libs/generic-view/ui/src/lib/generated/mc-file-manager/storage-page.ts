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

export const generateStoragePage: ComponentGenerator<
  {
    mainFormKey: string
    storage: McFileManagerConfig["storages"][number]
    categories: McFileManagerConfig["categories"]
  },
  NonNullable<Subview>
> = (key, config) => {
  const storageFormKey = `${key}storageForm`
  return {
    [`${key}Storage`]: {
      component: "conditional-renderer",
      dataProvider: {
        source: "form-fields",
        formKey: `${config.mainFormKey}`,
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
            upload: {
              current: "",
              all: [],
            },
          },
        },
      },
      childrenKeys: [`${key}fileManagerWrapper`],
    },
    [`${key}fileManagerWrapper`]: {
      component: "block-plain",
      layout: {
        flexLayout: {
          direction: "row",
        },
      },
      childrenKeys: [`${key}fileCategoriesContainer`, `${key}fileListWrapper`],
    },
    [`${key}fileCategoriesContainer`]: {
      component: "block-plain",
      layout: {
        flexPlacement: {
          grow: 1,
        },
      },
      childrenKeys: [
        `${key}storageSummary`,
        generateFileCategoryListKey(key),
        `${key}fileCategoryOtherFilesItem`,
      ],
    },
    [`${key}storageSummary`]: {
      component: "block-plain",
      layout: {
        padding: "32px 32px 64px 32px",
        flexLayout: {
          direction: "column",
        },
      },
      childrenKeys: [
        `${key}storageSummaryHeader`,
        `${key}storageSummaryContent`,
      ],
    },
    [`${key}storageSummaryHeader`]: {
      component: "typography.h3",
      layout: {
        margin: "0 0 24px 0",
      },
      config: {
        text: config.storage.label,
      },
    },
    [`${key}storageSummaryContent`]: {
      component: "block-plain",
      layout: {
        gridLayout: {
          rows: ["auto", "auto"],
          columns: ["auto", "auto"],
        },
      },
      childrenKeys: [
        `${key}storageSummaryUsedText`,
        `${key}storageSummaryFreeText`,
        generateStorageSummaryBarKey(key),
      ],
    },
    [`${key}storageSummaryUsedText`]: {
      component: "typography.p3",
      config: {
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
    [`${key}storageSummaryFreeText`]: {
      component: "typography.p3",
      config: {
        text: "0",
        color: "grey2",
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
    ...generateFileCategoryList(key, config),
    [`${key}fileCategoryOtherFilesItem`]: {
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
        `${key}fileCategoryOtherFilesItemName`,
        `${key}fileCategoryOtherFilesItemInfoIconWrapper`,
      ],
    },
    [`${key}fileCategoryOtherFilesItemName`]: {
      component: "block-plain",
      layout: {
        flexLayout: {
          direction: "row",
          alignItems: "center",
        },
      },
      childrenKeys: [
        `${key}fileCategoryOtherFilesItemNameText`,
        `${key}fileCategoryOtherFilesItemNameSize`,
      ],
    },
    [`${key}fileCategoryOtherFilesItemNameText`]: {
      component: "typography.h4",
      config: {
        text: "Other files",
      },
    },
    [`${key}fileCategoryOtherFilesItemNameSize`]: {
      component: "typography.p3",
      layout: {
        margin: "0 0 0 3px",
      },
      config: {
        text: "(0 KB)",
        color: "black",
      },
    },
    [`${key}fileCategoryOtherFilesItemInfoIconWrapper`]: {
      component: "block-plain",
      childrenKeys: [`${key}fileCategoryOtherFilesItemInfoIconTooltip`],
    },
    [`${key}fileCategoryOtherFilesItemInfoIconTooltip`]: {
      component: "tooltip",
      config: {
        offset: {
          x: 10,
          y: 0,
        },
        placement: "bottom-left",
      },
      childrenKeys: [
        `${key}fileCategoryOtherFilesItemInfoIconTooltipAnchor`,
        `${key}fileCategoryOtherFilesItemInfoIconTooltipContent`,
      ],
    },
    [`${key}fileCategoryOtherFilesItemInfoIconTooltipAnchor`]: {
      component: "tooltip.anchor",
      childrenKeys: [`${key}fileCategoryOtherFilesItemInfoIcon`],
    },
    [`${key}fileCategoryOtherFilesItemInfoIcon`]: {
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
    [`${key}fileCategoryOtherFilesItemInfoIconTooltipContent`]: {
      component: "tooltip.content",
      childrenKeys: [`${key}otherFilesList`],
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
