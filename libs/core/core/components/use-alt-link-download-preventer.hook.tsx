/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useCallback, useEffect } from "react"

const useAltLinkDownloadPreventer = () => {
  const handleClick = useCallback((event: MouseEvent) => {
    const parentAnchor = event.target
      ? (event.target as HTMLElement)?.closest("a")
      : undefined

    if (event.altKey && parentAnchor) {
      event.preventDefault()
    }
  }, [])

  useEffect(() => {
    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [handleClick])
}

export default useAltLinkDownloadPreventer
