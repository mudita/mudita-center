import FunctionComponent from "Renderer/types/function-component.interface"
import * as React from "react"
import styled from "styled-components"

interface Props {
  height?: number
  width?: number
}

const Svg = styled.svg``

const Battery: FunctionComponent<Props> = ({
  className,
  height = 16,
  width = 24,
  children,
}) => {
  return (
    <Svg className={className} width={width} height={height}>
      <rect width="21.6" height="15.36" fill="#6A6A6A" rx="1" />
      <path fill="#FFF" d="M1.2 1.28H20.4V14.08H1.2z" />
      {children}
      <path
        fill="#6A6A6A"
        d="M21.6 3.2H23c.552 0 1 .448 1 1v6.96c0 .552-.448 1-1 1h-1.4V3.2z"
      />
    </Svg>
  )
}

export default Battery
