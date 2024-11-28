/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Subview } from "generic-view/utils"

interface OtherFilesListItemConfig {
  id: string
  name: string
}

const generateOtherFilesListItem = ({
  id,
  name,
}: OtherFilesListItemConfig): Subview => {
  return {
    [`${id}otherFilesListItem`]: {
      component: "block-plain",
      layout: {
        flexLayout: {
          direction: "row",
        },
      },
      childrenKeys: [
        `${id}otherFilesListItemMarker`,
        `${id}otherFilesListItemText`,
      ],
    },
    [`${id}otherFilesListItemMarker`]: {
      component: "p5-component",
      layout: {
        margin: "0 6px",
      },
      config: {
        text: "▪",
        color: "grey1",
      },
    },
    [`${id}otherFilesListItemText`]: {
      component: "p5-component",
      config: {
        text: name,
        color: "grey1",
      },
    },
  }
}

export const generateOtherFilesList = ({
  configs,
}: {
  configs: OtherFilesListItemConfig[]
}): Subview => {
  const initialListConfig: Subview = {
    otherFilesList: {
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
    const categoryItemKey = `${config.id}otherFilesListItem`
    previousValue["otherFilesList"]?.childrenKeys?.push(categoryItemKey)
    previousValue = {
      ...previousValue,
      ...generateOtherFilesListItem(config),
    }
    return previousValue
  }, initialListConfig)
}
