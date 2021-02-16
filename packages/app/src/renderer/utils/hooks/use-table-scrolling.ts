/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { useState } from "react"

const useTableScrolling = () => {
  const [scrollable, setScrollingAbility] = useState(true)

  const disableScroll = () => setScrollingAbility(false)
  const enableScroll = () => setScrollingAbility(true)

  return {
    disableScroll,
    enableScroll,
    scrollable,
  }
}

export default useTableScrolling
