/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Subview } from "../models/api-views.types"

export const getViewMainChildrenKeys = (views: Subview[]) => {
  return views
    .map((view) => (view ? Object.keys(view)[0] : undefined))
    .filter(Boolean) as string[]
}
