import Icon, {
  Props as IconProps,
} from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import * as React from "react"

export interface InteractiveIconProps {
  strenght: number
}

export const getInteractiveRangeIcon = (
  strength: number,
  rest: Partial<IconProps>
) => {
  switch (true) {
    case strength === 0:
      return <Icon type={Type.NoRange} {...rest} />
    case strength > 0 && strength <= 20:
      return <Icon type={Type.VeryLowRange} {...rest} />
    case strength > 20 && strength <= 40:
      return <Icon type={Type.LowRange} {...rest} />
    case strength > 40 && strength <= 60:
      return <Icon type={Type.MediumRange} {...rest} />
    case strength > 60 && strength <= 80:
      return <Icon type={Type.HighRange} {...rest} />
    case strength > 80 && strength <= 100:
      return <Icon type={Type.VeryHighRange} {...rest} />
    default:
      return
  }
}
