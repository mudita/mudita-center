/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useRef, useState, useEffect, useCallback } from "react"

export const useOverflowTitle = () => {
  const ref = useRef<HTMLDivElement>(null)
  const resizeTimeout = useRef<NodeJS.Timeout>(undefined)

  const [title, setTitle] = useState<string | undefined>(undefined)

  const checkOverflow = useCallback(() => {
    if (ref.current) {
      const isOverflowing = ref.current.scrollWidth > ref.current.clientWidth
      const text = ref.current.textContent

      if (isOverflowing && text) {
        setTitle(text)
      } else {
        setTitle(undefined)
      }
    }
  }, [])

  const handleResize = useCallback(() => {
    clearTimeout(resizeTimeout.current)
    resizeTimeout.current = setTimeout(() => {
      checkOverflow()
    }, 200)
  }, [checkOverflow])

  useEffect(() => {
    checkOverflow()

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      clearTimeout(resizeTimeout.current)
    }
  }, [checkOverflow, handleResize])

  return { ref, title }
}
