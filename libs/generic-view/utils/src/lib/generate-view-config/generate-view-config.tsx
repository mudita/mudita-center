/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MainView, Subview, View } from "generic-view/utils"

export const generateViewConfig = (
  config: Omit<MainView, "childrenKeys">,
  features: Subview[]
): View => {
  return {
    main: {
      ...config,
      childrenKeys: getViewMainChildrenKeys(features),
    },
    ...features.filter(Boolean).reduce(
      (acc, feature) => ({
        ...acc,
        ...feature,
      }),
      {}
    ),
  }
}

const getViewMainChildrenKeys = (views: Subview[]) => {
  return views
    .map((view) => (view ? Object.keys(view)[0] : undefined))
    .filter(Boolean) as string[]
}
