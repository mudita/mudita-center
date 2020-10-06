import React, { useLayoutEffect, useRef } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"

interface Props {
  active: boolean
}

const MessageRowContainer: FunctionComponent<Props> = ({
  children,
  active,
}) => {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (active) ref?.current?.scrollIntoView()
  }, [])

  return <div ref={ref}>{children}</div>
}

export default MessageRowContainer
