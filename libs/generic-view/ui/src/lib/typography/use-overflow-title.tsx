/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useRef, useState, useEffect } from "react"

export const useOverflowTitle = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [title, setTitle] = useState<string | undefined>(undefined)

  useEffect(() => {
    let resizeTimeout: NodeJS.Timeout

    const checkOverflow = () => {
      if (containerRef.current) {
        const isOverflowing =
          containerRef.current.scrollWidth > containerRef.current.clientWidth
        const text = containerRef.current.textContent

        if (isOverflowing && text) {
          setTitle(text)
        } else {
          setTitle(undefined)
        }
      }
    }

    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        checkOverflow()
      }, 200)
    }

    checkOverflow()

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      clearTimeout(resizeTimeout)
    }
  }, [])

  return { containerRef, title }
}
