import * as React from "react"
import { Props as IconProps } from "Renderer/components/core/icon/icon.component"
import FunctionComponent from "Renderer/types/function-component.interface"
import {
  getInteractiveIconType,
  InteractiveIconProps,
} from "Renderer/components/core/icon/interactive-icon.config"

const InteractiveIcon: FunctionComponent<InteractiveIconProps & IconProps> = ({
  className,
  iconState,
  interactiveIconType,
  ...rest
}) => {
  return <>{getInteractiveIconType(iconState, interactiveIconType, rest)}</>
}

export default InteractiveIcon
