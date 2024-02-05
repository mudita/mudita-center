/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useSelector } from "react-redux"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { screenTitleSelector } from "../selectors"

export const useScreenTitle = (viewKey: string) => {
  return useSelector((state: ReduxRootState) => {
    return screenTitleSelector(state, viewKey)
  })
}
