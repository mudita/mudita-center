/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useCallback, useEffect } from "react"

const useAltLinkDownloadPreventerEffect = () => {
  const handleClick = useCallback((event: MouseEvent) => {
    if (event.altKey && !event.target) {
      return
    }

    const parentAnchor = (event.target as HTMLElement).closest("a")

    if (!parentAnchor) {
      return
    }

    event.preventDefault()
  }, [])

  useEffect(() => {
    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [handleClick])
}

export default useAltLinkDownloadPreventerEffect
