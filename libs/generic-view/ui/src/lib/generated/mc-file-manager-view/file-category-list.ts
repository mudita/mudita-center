/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ComponentPropsByName, IconType } from "generic-view/utils"

interface CategoryItem {
  id: string
  name: string
  entitiesType: string
  icon: IconType
}

const generateFileCategoryListItem = ({
  id,
  name,
  icon,
}: CategoryItem): {
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
      component: "p3-component",
      layout: {
        gridPlacement: {
          row: 1,
          column: 2,
          width: 1,
          height: 1,
        },
      },
      config: {
        text: "",
        color: "black",
      },
    },
    [`${id}CategoryListItemCountText`]: {
      component: "p3-component",
      layout: {
        margin: "10px 0 0 0",
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
  categories,
}: {
  categories: CategoryItem[]
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

  return categories.reduce((previousValue, category) => {
    const categoryItemKey = `${category.id}CategoryListItem`
    previousValue["fileCategoryList"]?.childrenKeys?.push(categoryItemKey)
    previousValue = {
      ...previousValue,
      ...generateFileCategoryListItem(category),
    }
    return previousValue
  }, initialListConfig)
}
