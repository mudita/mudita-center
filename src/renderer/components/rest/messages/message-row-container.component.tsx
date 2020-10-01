import React, { useLayoutEffect, useRef } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"

interface Props {
  scroll: boolean
}

const MessageRowContainer: FunctionComponent<Props> = ({
  children,
  scroll,
}) => {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (scroll) ref?.current?.scrollIntoView()
  })

  return <div ref={ref}>{children}</div>
}

export default MessageRowContainer
