/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ComponentPropsByName, IconType } from "generic-view/utils"

interface CategoryListItemConfig {
  id: string
  name: string
  markerColor: string
  icon: IconType
}

const generateFileCategoryListItem = ({
  id,
  name,
  icon,
  markerColor,
}: CategoryListItemConfig): {
  [key: string]: ComponentPropsByName
} => {
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
        `${id}CategoryListItemCountText`,
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
        text: "0 KB",
        color: "black",
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
    [`${id}CategoryListItemCountText`]: {
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
      config: {
        text: "0 files",
      },
    },
  }
}

export const generateFileCategoryList = ({
  configs,
}: {
  configs: CategoryListItemConfig[]
}): {
  [key: string]: ComponentPropsByName
} => {
  const initialListConfig: { [key: string]: ComponentPropsByName } = {
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

  return configs.reduce((previousValue, config) => {
    const categoryItemKey = `${config.id}CategoryListItem`
    previousValue["fileCategoryList"]?.childrenKeys?.push(categoryItemKey)
    previousValue = {
      ...previousValue,
      ...generateFileCategoryListItem(config),
    }
    return previousValue
  }, initialListConfig)
}
