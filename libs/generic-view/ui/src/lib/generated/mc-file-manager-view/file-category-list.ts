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
}: CategoryItem): {
  [key: string]: ComponentPropsByName
} => {
  return {
    [`${id}CategoryListItem`]: {
      component: "list-item",
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
      childrenKeys: [`${id}CategoryListItemDescription`],
    },
    [`${id}CategoryListItemDescription`]: {
      component: "p3-component",
      config: {
        text: name,
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
