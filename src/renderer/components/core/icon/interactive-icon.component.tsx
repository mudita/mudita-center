import { Type } from "Renderer/components/core/icon/icon.config"
import * as React from "react"
import Icon, {
  Props as IconProps,
} from "Renderer/components/core/icon/icon.component"
import FunctionComponent from "Renderer/types/function-component.interface"

export enum InteractiveIconType {
  Range,
}

interface InteractiveIconProps {
  iconState: number
  interactiveIconType: InteractiveIconType
}

const getRangeIcon = (
  status: number,
  type: InteractiveIconType,
  rest: Partial<IconProps>
) => {
  if (status > 0 && status < 25) {
    return <Icon type={Type.VeryLowRange} {...rest} />
  } else {
    return <Icon type={Type.LowRange} {...rest} />
  }
}

const InteractiveIcon: FunctionComponent<InteractiveIconProps & IconProps> = ({
  className,
  iconState,
  interactiveIconType,
  ...rest
}) => {
  if (iconState === 0) {
    console.log("ślububububu")
  }
  return <>{getRangeIcon(iconState, interactiveIconType, rest)}</>
}

export default InteractiveIcon
