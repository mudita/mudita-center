/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ComponentGenerator, IconType, Subview } from "generic-view/utils"
import { color } from "./color"
import { McFileManagerConfig } from "generic-view/models"

interface CategoryListItemConfig {
  id: string
  markerColor: (typeof color)[keyof typeof color]
  entitiesType: string
  icon: IconType
}

// TODO: Implement getting this data from the API
const CONFIG_MAP: Record<string, Omit<CategoryListItemConfig, "id">> = {
  audioFiles: {
    icon: IconType.MusicNote,
    markerColor: color.audioFiles,
    entitiesType: "audioFiles",
  },
  imageFiles: {
    icon: IconType.PhotoCatalog,
    markerColor: color.imageFiles,
    entitiesType: "imageFiles",
  },
  ebookFiles: {
    icon: IconType.Book,
    markerColor: color.ebookFiles,
    entitiesType: "ebookFiles",
  },
  applicationFiles: {
    icon: IconType.Grid,
    markerColor: color.applicationFiles,
    entitiesType: "applicationFiles",
  },
}

const getConfigByEntityType = (
  entityType: string,
  id: string
): CategoryListItemConfig | undefined => {
  return { ...CONFIG_MAP[entityType], id } || undefined
}

const generateFileCategoryListItem: ComponentGenerator<
  CategoryListItemConfig & { directoryPath: string; label: string }
> = (key, { id, label, icon, markerColor, entitiesType, directoryPath }) => {
  return {
    [`categoryListItem${key}${id}`]: {
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
            formKey: `storageForm${key}`,
            key: "activeCategory",
            value: directoryPath,
          },
        ],
      },
      dataProvider: {
        source: "form-fields",
        formKey: `storageForm${key}`,
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
        `categoryListItemName${key}${id}`,
        `categoryListItemStorage${key}${id}`,
        `categoryListItemCountTextWrapper${key}${id}`,
      ],
    },
    [`categoryListItemName${key}${id}`]: {
      component: "block-plain",
      layout: {
        flexLayout: {
          direction: "row",
          alignItems: "center",
        },
      },
      childrenKeys: [
        `categoryListItemNameIcon${key}${id}`,
        `categoryListItemNameText${key}${id}`,
      ],
    },
    [`categoryListItemNameIcon${key}${id}`]: {
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
    [`categoryListItemNameText${key}${id}`]: {
      component: "h4-component",
      config: {
        text: label,
      },
    },
    [`categoryListItemStorage${key}${id}`]: {
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
        `categoryListItemStorageText${key}${id}`,
        `categoryListItemStorageMarker${key}${id}`,
      ],
    },
    [`categoryListItemStorageText${key}${id}`]: {
      component: "p3-component",
      config: {
        text: "0",
        color: "black",
        textTransform: "format-bytes",
        textTransformOptions: {
          minUnit: "KB",
        },
      },
    },
    [`categoryListItemStorageMarker${key}${id}`]: {
      component: "marker",
      layout: {
        width: "10px",
        margin: "0 0 0 8px",
      },
      config: {
        color: markerColor,
      },
    },
    [`categoryListItemCountTextWrapper${key}${id}`]: {
      component: "p3-component",
      layout: {
        margin: "8px 0 0 0",
        gridPlacement: {
          row: 2,
          column: 1,
          width: 2,
          height: 1,
        },
      },
      childrenKeys: [`categoryListItemCountText${key}${id}`],
    },
    [`categoryListItemCountText${key}${id}`]: {
      component: "format-message",
      config: {
        messageTemplate:
          "{totalEntities} {totalEntities, plural, one {file} other {files}}",
      },
      dataProvider: {
        source: "entities-metadata",
        entitiesType,
        fields: [
          {
            providerField: "totalEntities",
            componentField: "data.fields.totalEntities",
          },
        ],
      },
    },
  }
}

export const generateFileCategoryListKey = (key: string) => {
  return `fileCategoryList${key}`
}

export const generateFileCategoryList: ComponentGenerator<
  McFileManagerConfig["categories"]
> = (key, categories) => {
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
    const config = getConfigByEntityType(category.entityType, String(index))
    if (!config) {
      return previousValue
    }
    const categoryItemKey = `categoryListItem${key}${config.id}`
    previousValue[
      generateFileCategoryListKey(key) as keyof typeof previousValue
    ]?.childrenKeys?.push(categoryItemKey)
    previousValue = {
      ...previousValue,
      ...generateFileCategoryListItem(key, {
        ...config,
        ...category,
      }),
    }
    return previousValue
  }, initialListConfig)
}
