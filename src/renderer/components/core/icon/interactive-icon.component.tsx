import * as React from "react"
import { Props as IconProps } from "Renderer/components/core/icon/icon.component"
import FunctionComponent from "Renderer/types/function-component.interface"
import {
  getInteractiveIconType,
  InteractiveIconProps,
} from "Renderer/components/core/icon/interactive-icon.config"
import styled from "styled-components"

const Elo = styled.path`
  fill: red;
  width: 100px;
  height: 5px;
`

const InteractiveIcon: FunctionComponent<InteractiveIconProps & IconProps> = ({
  className,
  iconState,
  interactiveIconType,
  ...rest
}) => {
  return (
    <>
      <Elo />
      {getInteractiveIconType(iconState, interactiveIconType, rest)}
    </>
  )
}

export default InteractiveIcon
