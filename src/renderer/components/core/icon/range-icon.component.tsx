import * as React from "react"
import Icon, {
  Props as IconProps,
} from "Renderer/components/core/icon/icon.component"
import FunctionComponent from "Renderer/types/function-component.interface"
import { Type } from "Renderer/components/core/icon/icon.config"

interface InteractiveIconProps {
  strenght: number
}

const getInteractiveRangeIcon = (
  strength: number,
  rest: Partial<IconProps>
) => {
  switch (true) {
    case strength > 80:
      return <Icon type={Type.VeryHighRange} {...rest} />
    case strength > 60:
      return <Icon type={Type.HighRange} {...rest} />
    case strength > 40:
      return <Icon type={Type.MediumRange} {...rest} />
    case strength > 20:
      return <Icon type={Type.LowRange} {...rest} />
    case strength > 0:
      return <Icon type={Type.VeryLowRange} {...rest} />
    case strength === 0:
      return <Icon type={Type.NoRange} {...rest} />
    default:
      return <Icon type={Type.NoRange} {...rest} />
  }
}

const RangeIcon: FunctionComponent<InteractiveIconProps & IconProps> = ({
  strenght,
  ...rest
}) => {
  return <>{getInteractiveRangeIcon(strenght, rest)}</>
}

export default RangeIcon
