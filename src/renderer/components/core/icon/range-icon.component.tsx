/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import * as React from "react"
import Icon, {
  Props as IconProps,
} from "Renderer/components/core/icon/icon.component"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { Type } from "Renderer/components/core/icon/icon.config"

interface InteractiveIconProps {
  strength: number
  roaming?: boolean
}

const getInteractiveRangeIcon = (
  { strength, roaming }: InteractiveIconProps,
  rest: Partial<IconProps>
) => {
  switch (true) {
    case strength > 80 && roaming:
      return <Icon type={Type.VeryHighRangeWithRoaming} {...rest} />
    case strength > 60 && roaming:
      return <Icon type={Type.HighRangeWithRoaming} {...rest} />
    case strength > 40 && roaming:
      return <Icon type={Type.MediumRangeWithRoaming} {...rest} />
    case strength > 20 && roaming:
      return <Icon type={Type.LowRangeWithRoaming} {...rest} />
    case strength > 0 && roaming:
      return <Icon type={Type.VeryLowRangeWithRoaming} {...rest} />
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
  strength,
  roaming = false,
  ...rest
}) => {
  return <>{getInteractiveRangeIcon({ strength, roaming }, rest)}</>
}

export default RangeIcon
