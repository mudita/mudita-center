/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useState } from "react"

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
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
