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
  switch (true) {
    case status === 0:
      return <Icon type={Type.NoRange} testId="no-range" {...rest} />
    case status > 0 && status <= 20:
      return <Icon type={Type.VeryLowRange} testId="very-low-range" {...rest} />
    case status > 20 && status <= 40:
      return <Icon type={Type.LowRange} testId="low-range" {...rest} />
    case status > 40 && status <= 60:
      return <Icon type={Type.MediumRange} testId="medium-range" {...rest} />
    case status > 60 && status <= 80:
      return <Icon type={Type.HighRange} testId="high-range" {...rest} />
    case status > 80 && status <= 100:
      return (
        <Icon type={Type.VeryHighRange} testId="very-high-range" {...rest} />
      )
    default:
      return
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
