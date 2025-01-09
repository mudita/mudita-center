/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ComponentGenerator, Subview } from "generic-view/utils"

interface OtherFilesListItemConfig {
  id: string
  name: string
}

const generateOtherFilesListItem: ComponentGenerator<
  OtherFilesListItemConfig
> = (key, { id, name }: OtherFilesListItemConfig): Subview => {
  return {
    [`otherFilesListItem${key}${id}`]: {
      component: "block-plain",
      layout: {
        flexLayout: {
          direction: "row",
        },
      },
      childrenKeys: [
        `otherFilesListItemMarker${key}${id}`,
        `otherFilesListItemText${key}${id}`,
      ],
    },
    [`otherFilesListItemMarker${key}${id}`]: {
      component: "p5-component",
      layout: {
        margin: "0 6px",
      },
      config: {
        text: "▪",
        color: "grey1",
      },
    },
    [`otherFilesListItemText${key}${id}`]: {
      component: "p5-component",
      config: {
        text: name,
        color: "grey1",
      },
    },
  }
}

export const generateOtherFilesList: ComponentGenerator<
  OtherFilesListItemConfig[]
> = (key, configs): Subview => {
  const initialListConfig: Subview = {
    [`otherFilesList${key}`]: {
      component: "block-plain",
      layout: {
        padding: "6px 0",
        flexLayout: {
          direction: "column",
        },
      },
      childrenKeys: [],
    },
  }

  return configs.reduce((previousValue, config) => {
    const categoryItemKey = `otherFilesListItem${key}${config.id}`
    previousValue[
      `otherFilesList${key}` as keyof typeof previousValue
    ]?.childrenKeys?.push(categoryItemKey)
    previousValue = {
      ...previousValue,
      ...generateOtherFilesListItem(key, config),
    }
    return previousValue
  }, initialListConfig)
}
