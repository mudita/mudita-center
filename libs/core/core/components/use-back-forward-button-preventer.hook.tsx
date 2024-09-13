/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useCallback, useEffect } from "react"

const useBackForwardButtonPreventer = () => {
  const handleMouseUp = useCallback((event: MouseEvent) => {
    if (event.button === 3 || event.button === 4) {
      event.preventDefault()
    }
  }, [])

  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp)
    return () => document.removeEventListener("mouseup", handleMouseUp)
  }, [handleMouseUp])
}

export default useBackForwardButtonPreventer
