/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { selectActiveApiDeviceId, selectEntitiesData } from "generic-view/store"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"

function useTemporaryHeadlineMessage(
  currentLocation: { id: string } | string | undefined
) {
  const [headlineMessage, setHeadlineMessage] = useState("")
  const deviceId = useSelector(selectActiveApiDeviceId)!
  const entitiesData = useSelector((state: ReduxRootState) =>
    selectEntitiesData(state, {
      entitiesType: "contacts",
      deviceId,
    })
  )

  useEffect(() => {
    if (typeof currentLocation === "string") {
      setHeadlineMessage(currentLocation)
    }

    if (currentLocation === "Contacts") {
      const ContactsLength = entitiesData?.length ?? 0
      const message =
        ContactsLength < 1 ? "Contacts" : `Contacts (${ContactsLength})`
      setHeadlineMessage(message)
    }
  }, [currentLocation, entitiesData?.length])

  return headlineMessage
}

export default useTemporaryHeadlineMessage
