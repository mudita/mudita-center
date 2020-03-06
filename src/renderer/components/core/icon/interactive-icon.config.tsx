import Icon, {
  Props as IconProps,
} from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import * as React from "react"

export enum InteractiveIconType {
  Range,
}

export interface InteractiveIconProps {
  iconState: number
  interactiveIconType: InteractiveIconType
}

export const getInteractiveRangeIcon = (
  status: number,
  rest: Partial<IconProps>
) => {
  if (status > 0 && status < 5) {
    return <Icon type={Type.VeryLowRange} testId="very-low-range" {...rest} />
  } else if (status >= 5 && status < 25) {
    return <Icon type={Type.LowRange} testId="low-range" {...rest} />
  } else if (status >= 25 && status < 50) {
    return <Icon type={Type.MediumRange} testId="medium-range" {...rest} />
  } else if (status >= 50 && status < 75) {
    return <Icon type={Type.HighRange} testId="high-range" {...rest} />
  } else {
    return <Icon type={Type.VeryHighRange} testId="very-high-range" {...rest} />
  }
}

export const getInteractiveIconType = (
  status: number,
  type: InteractiveIconType,
  rest: Partial<IconProps>
) => {
  switch (type) {
    case InteractiveIconType.Range:
      return getInteractiveRangeIcon(status, rest)
    // place for other icons
    default:
      return
  }
}
