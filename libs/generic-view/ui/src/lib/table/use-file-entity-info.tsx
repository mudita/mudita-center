/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useSelector } from "react-redux"
import { selectEntityData } from "generic-view/store"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { activeDeviceIdSelector } from "active-device-registry/feature"

export const useFileEntityInfo = (options: {
  id?: string
  type: string
  pathField: string
}) => {
  const deviceId = useSelector(activeDeviceIdSelector)

  return useSelector((state: ReduxRootState) => {
    if (!options.id || !deviceId) {
      return undefined
    }
    return selectEntityData(state, {
      deviceId,
      entitiesType: options.type,
      entityId: options.id,
    })
  })
}
