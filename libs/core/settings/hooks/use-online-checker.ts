/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useState, useEffect } from "react"

export const useOnlineChecker = (): boolean => {
  const [online, setOnline] = useState(window.navigator.onLine)

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (window.navigator.onLine !== online) {
        setOnline(window.navigator.onLine)
      }
    }, 500)
    return () => clearInterval(intervalId)
  }, [online, setOnline])

  return online
}
