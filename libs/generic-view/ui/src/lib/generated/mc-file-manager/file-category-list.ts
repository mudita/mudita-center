/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ComponentGenerator, IconType, Subview } from "generic-view/utils"
import {
  FileManagerMarkerColor,
  McFileManagerConfig,
} from "generic-view/models"
import { fileCounterDataProvider } from "./file-counter-data-provider"

interface CategoryListItemConfig {
  id: string
  markerColor: FileManagerMarkerColor
  entityType: string
  icon: IconType
}

const generateFileCategoryListItem: ComponentGenerator<
  CategoryListItemConfig & {
    storagePath: string
    directoryPath: string
    label: string
  }
> = (
  key,
  { id, label, icon, markerColor, entityType, storagePath, directoryPath }
) => {
  return {
    [`${key}${id}categoryListItem`]: {
      component: "list-item",
      layout: {
        padding: "12px 32px 10px 32px",
        gridLayout: {
          rows: ["auto", "auto"],
          columns: ["auto", "100px"],
        },
      },
      config: {
        actions: [
          {
            type: "form-set-field",
            formKey: `${key}storageForm`,
            key: "activeCategory",
            value: directoryPath,
          },
        ],
      },
      dataProvider: {
        source: "form-fields",
        formKey: `${key}storageForm`,
        fields: [
          {
            providerField: "activeCategory",
            componentField: "config.active",
            condition: "eq",
            value: directoryPath,
          },
        ],
      },
      childrenKeys: [
        `${key}${id}categoryListItemName`,
        `${key}${id}categoryListItemStorage`,
        `${key}${id}categoryListItemCountTextWrapper`,
      ],
    },
    [`${key}${id}categoryListItemName`]: {
      component: "block-plain",
      layout: {
        flexLayout: {
          direction: "row",
          alignItems: "center",
        },
      },
      childrenKeys: [
        `${key}${id}categoryListItemNameIcon`,
        `${key}${id}categoryListItemNameText`,
      ],
    },
    [`${key}${id}categoryListItemNameIcon`]: {
      component: "icon",
      layout: {
        width: "24px",
        margin: "0 8px 0 0",
        gridPlacement: {
          row: 1,
          column: 1,
          width: 1,
          height: 1,
        },
      },
      config: {
        type: icon,
      },
    },
    [`${key}${id}categoryListItemNameText`]: {
      component: "typography.h4",
      config: {
        text: label,
      },
    },
    [`${key}${id}categoryListItemStorage`]: {
      component: "block-plain",
      layout: {
        gridPlacement: {
          row: 1,
          column: 2,
          width: 1,
          height: 1,
        },
        flexLayout: {
          direction: "row",
          alignItems: "center",
          justifyContent: "flex-end",
        },
      },
      childrenKeys: [
        `${key}${id}categoryListItemStorageText`,
        `${key}${id}categoryListItemStorageMarker`,
      ],
    },
    [`${key}${id}categoryListItemStorageText`]: {
      component: "typography.p3",
      config: {
        text: "0 KB",
        color: "black",
      },
    },
    [`${key}${id}categoryListItemStorageMarker`]: {
      component: "marker",
      layout: {
        width: "10px",
        margin: "0 0 0 8px",
      },
      config: {
        color: markerColor,
      },
    },
    [`${key}${id}categoryListItemCountTextWrapper`]: {
      component: "typography.p3",
      layout: {
        margin: "8px 0 0 0",
        gridPlacement: {
          row: 2,
          column: 1,
          width: 2,
          height: 1,
        },
      },
      childrenKeys: [`${key}${id}CategoryListItemCountText`],
    },
    [`${key}${id}CategoryListItemCountText`]: {
      component: "format-message",
      config: {
        messageTemplate:
          "{totalEntities} {totalEntities, plural, one {file} other {files}}",
      },
      ...fileCounterDataProvider(entityType, storagePath),
    },
  }
}

export const generateFileCategoryListKey = (key: string) => {
  return `${key}fileCategoryList`
}

export const generateFileCategoryList: ComponentGenerator<{
  categories: McFileManagerConfig["categories"]
  storage: McFileManagerConfig["storages"][number]
}> = (key, { categories, storage }) => {
  const initialListConfig: Subview = {
    [generateFileCategoryListKey(key)]: {
      component: "block-plain",
      layout: {
        flexLayout: {
          direction: "column",
        },
      },
      childrenKeys: [],
    },
  }

  return categories.reduce((previousValue, category, index) => {
    const id = String(index)
    const categoryItemKey = `${key}${id}categoryListItem`
    previousValue[
      generateFileCategoryListKey(key) as keyof typeof previousValue
    ]?.childrenKeys?.push(categoryItemKey)
    previousValue = {
      ...previousValue,
      ...generateFileCategoryListItem(key, {
        id,
        ...category,
        storagePath: storage.path,
      }),
    }
    return previousValue
  }, initialListConfig)
}
