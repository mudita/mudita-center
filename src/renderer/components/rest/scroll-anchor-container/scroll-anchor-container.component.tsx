import React, { useLayoutEffect, useRef } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"

interface Props {
  active: boolean
}

const ScrollAnchorContainer: FunctionComponent<Props> = ({ active }) => {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (active) ref?.current?.scrollIntoView()
  }, [])

  return <span ref={ref} />
}

export default ScrollAnchorContainer
