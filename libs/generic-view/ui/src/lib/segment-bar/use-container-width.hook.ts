/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useLayoutEffect, useRef, useState } from "react"

export const useContainerWidth = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(0)

  useLayoutEffect(() => {
    if (ref.current) {
      setContainerWidth(ref.current.offsetWidth)
    }
  }, [ref])

  return { ref, containerWidth }
}
