/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useCallback, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { isValidPath } from "Core/__deprecated__/renderer/constants/urls"

const AltLinkDownloadPreventer: FunctionComponent = ({ children }) => {
  const history = useHistory()

  const handleClick = useCallback(
    (event: MouseEvent) => {
      if (event.altKey && event.target) {
        return
      }

      const parentAnchor = (event.target as HTMLElement).closest("a")

      if (!parentAnchor) {
        return
      }

      event.preventDefault()
      const href = parentAnchor.getAttribute("href")?.replace("#", "")

      if (href && isValidPath(href)) {
        history.push(href)
      }
    },
    [history]
  )

  useEffect(() => {
    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [handleClick])

  return <>{children}</>
}

export default AltLinkDownloadPreventer
