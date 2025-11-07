/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { useParams } from "react-router"
import { useApiEntitiesDataQuery } from "devices/api-device/feature"
import { useActiveDeviceQuery } from "devices/common/feature"
import { ApiDevice } from "devices/api-device/models"
import { ManageFiles2 } from "devices/common/ui"

export const List: FunctionComponent = () => {
  const { category } = useParams()
  const { data: device } = useActiveDeviceQuery<ApiDevice>()
  const { data: entities = [] } = useApiEntitiesDataQuery(category, device)

  const files = entities.map((entity) => {
    return {
      id: entity.id as string,
      name: entity.fileName as string,
      size: entity.fileSize as number,
      type: entity.extension as string,
    }
  })

  return (
    <ManageFiles2.List
      files={files}
      onDelete={() => {
        //
      }}
      onAdd={() => {
        //
      }}
      onExport={() => {
        //
      }}
    />
  )
}
