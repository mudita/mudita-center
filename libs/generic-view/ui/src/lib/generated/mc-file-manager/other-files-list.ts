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
    [`${key}${id}otherFilesListItem`]: {
      component: "block-plain",
      layout: {
        flexLayout: {
          direction: "row",
        },
      },
      childrenKeys: [
        `${key}${id}otherFilesListItemMarker`,
        `${key}${id}otherFilesListItemText`,
      ],
    },
    [`${key}${id}otherFilesListItemMarker`]: {
      component: "typography.p5",
      layout: {
        margin: "0 6px",
      },
      config: {
        text: "▪",
        color: "grey1",
      },
    },
    [`${key}${id}otherFilesListItemText`]: {
      component: "typography.p5",
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
    [`${key}otherFilesList`]: {
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
    const categoryItemKey = `${key}${config.id}otherFilesListItem`
    previousValue[
      `${key}otherFilesList` as keyof typeof previousValue
    ]?.childrenKeys?.push(categoryItemKey)
    previousValue = {
      ...previousValue,
      ...generateOtherFilesListItem(key, config),
    }
    return previousValue
  }, initialListConfig)
}
