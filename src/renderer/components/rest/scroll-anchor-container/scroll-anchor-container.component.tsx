/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import React, { useLayoutEffect, useRef } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"

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
