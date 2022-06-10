/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useLayoutEffect, useRef } from "react"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"

interface Props {
  active: boolean
}

const ScrollAnchorContainer: FunctionComponent<Props> = ({ active }) => {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (active) {
      ref?.current?.scrollIntoView()
    }
  }, [])

  return <span ref={ref} />
}

export default ScrollAnchorContainer
