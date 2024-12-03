/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IconType, Subview } from "generic-view/utils"

interface CategoryListItemConfig {
  id: string
  name: string
  markerColor: string
  entitiesType: string
  icon: IconType
}

const CONFIG_MAP: Record<string, Omit<CategoryListItemConfig, "id">> = {
  audioFiles: {
    name: "Music",
    icon: IconType.MusicNote,
    markerColor: "#E38577",
    entitiesType: "audioFiles",
  },
  imageFiles: {
    name: "Photos",
    icon: IconType.PhotoCatalog,
    markerColor: "#0E7490",
    entitiesType: "imageFiles",
  },
  ebookFiles: {
    name: "Ebooks",
    icon: IconType.Book,
    markerColor: "#A8DADC",
    entitiesType: "ebookFiles",
  },
  applicationFiles: {
    name: "Apps",
    icon: IconType.Grid,
    markerColor: "#AEBEC9",
    entitiesType: "applicationFiles",
  },
}

function getConfigByEntityType(
  entityType: string,
  id: string
): CategoryListItemConfig | undefined {
  return { ...CONFIG_MAP[entityType], id } || undefined
}

const generateFileCategoryListItem = ({
  id,
  name,
  icon,
  markerColor,
  entitiesType,
}: CategoryListItemConfig): Subview => {
  return {
    [`${id}CategoryListItem`]: {
      component: "list-item",
      layout: {
        padding: "12px 32px 10px 32px",
        gridLayout: {
          rows: ["auto", "auto"],
          columns: ["auto", "65px"],
        },
      },
      config: {
        actions: [
          {
            type: "form-set-field",
            key: "activeFileCategoryId",
            value: id,
          },
        ],
      },
      dataProvider: {
        source: "form-fields",
        formKey: "fileManagerForm",
        fields: [
          {
            providerField: "activeFileCategoryId",
            componentField: "config.active",
            condition: "eq",
            value: id,
          },
        ],
      },
      childrenKeys: [
        `${id}CategoryListItemName`,
        `${id}CategoryListItemStorage`,
        `${id}CategoryListItemCountTextWrapper`,
      ],
    },
    [`${id}CategoryListItemName`]: {
      component: "block-plain",
      layout: {
        flexLayout: {
          direction: "row",
          alignItems: "center",
        },
      },
      childrenKeys: [
        `${id}CategoryListItemNameIcon`,
        `${id}CategoryListItemNameText`,
      ],
    },
    [`${id}CategoryListItemNameIcon`]: {
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
    [`${id}CategoryListItemNameText`]: {
      component: "h4-component",
      config: {
        text: name,
      },
    },
    [`${id}CategoryListItemStorage`]: {
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
        `${id}CategoryListItemStorageText`,
        `${id}CategoryListItemStorageMarker`,
      ],
    },
    [`${id}CategoryListItemStorageText`]: {
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
    [`${id}CategoryListItemStorageMarker`]: {
      component: "marker",
      layout: {
        width: "10px",
        margin: "0 0 0 8px",
      },
      config: {
        color: markerColor,
      },
    },
    [`${id}CategoryListItemCountTextWrapper`]: {
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
      childrenKeys: [`${id}CategoryListItemCountText`],
    },
    [`${id}CategoryListItemCountText`]: {
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

export const generateFileCategoryList = (entitiesTypes: string[]): Subview => {
  const initialListConfig: Subview = {
    fileCategoryList: {
      component: "block-plain",
      layout: {
        flexLayout: {
          direction: "column",
        },
      },
      childrenKeys: [],
    },
  }

  return entitiesTypes.reduce((previousValue, entitiesType, index) => {
    const config = getConfigByEntityType(entitiesType, String(index))
    if (!config) {
      return previousValue
    }
    const categoryItemKey = `${config.id}CategoryListItem`
    previousValue["fileCategoryList"]?.childrenKeys?.push(categoryItemKey)
    previousValue = {
      ...previousValue,
      ...generateFileCategoryListItem(config),
    }
    return previousValue
  }, initialListConfig)
}
