/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useEffect } from "react"
import { useSelector } from "react-redux"
import { selectActiveDevice } from "../selectors/active-device"

export const useOutbox = () => {
  const activeDevice = useSelector(selectActiveDevice)

  useEffect(() => {
    if (activeDevice) {
      console.log("run outbox action")
    }
  }, [activeDevice])
}
