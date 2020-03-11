import * as React from "react"
import { Props as IconProps } from "Renderer/components/core/icon/icon.component"
import FunctionComponent from "Renderer/types/function-component.interface"
import {
  getInteractiveRangeIcon,
  InteractiveIconProps,
} from "Renderer/components/core/icon/range-icon.config"

const RangeIcon: FunctionComponent<InteractiveIconProps & IconProps> = ({
  strenght,
  ...rest
}) => {
  return <>{getInteractiveRangeIcon(strenght, rest)}</>
}

export default RangeIcon
