/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { MutableRefObject, useEffect } from "react"

const useOutsideClick = (
  ref: MutableRefObject<HTMLElement | undefined | null>,
  callback: () => void
) => {
  const handleClick = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      callback()
    }
  }

  // The useCapture is set as true in order to avoid click event being fired after a commit phase.
  useEffect(() => {
    document.addEventListener("click", handleClick, true)

    return () => {
      document.removeEventListener("click", handleClick, true)
    }
  })
}

export default useOutsideClick
