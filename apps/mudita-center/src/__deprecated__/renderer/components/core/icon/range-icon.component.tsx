/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import * as React from "react"
import Icon, {
  Props as IconProps,
} from "App/__deprecated__/renderer/components/core/icon/icon.component"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"

export interface RangeIconProps {
  strength: number
  roaming?: boolean
}

const getInteractiveRangeIcon = (
  { strength, roaming }: RangeIconProps,
  rest: Partial<IconProps>
) => {
  switch (true) {
    case strength > 80 && roaming:
      return <Icon type={IconType.VeryHighRangeWithRoaming} {...rest} />
    case strength > 60 && roaming:
      return <Icon type={IconType.HighRangeWithRoaming} {...rest} />
    case strength > 40 && roaming:
      return <Icon type={IconType.MediumRangeWithRoaming} {...rest} />
    case strength > 20 && roaming:
      return <Icon type={IconType.LowRangeWithRoaming} {...rest} />
    case strength > 0 && roaming:
      return <Icon type={IconType.VeryLowRangeWithRoaming} {...rest} />
    case strength > 80:
      return <Icon type={IconType.VeryHighRange} {...rest} />
    case strength > 60:
      return <Icon type={IconType.HighRange} {...rest} />
    case strength > 40:
      return <Icon type={IconType.MediumRange} {...rest} />
    case strength > 20:
      return <Icon type={IconType.LowRange} {...rest} />
    case strength > 0:
      return <Icon type={IconType.VeryLowRange} {...rest} />
    case strength === 0:
      return <Icon type={IconType.NoRange} {...rest} />
    default:
      return <Icon type={IconType.NoRange} {...rest} />
  }
}

const RangeIcon: FunctionComponent<RangeIconProps & IconProps> = ({
  strength,
  roaming = false,
  ...rest
}) => {
  return <>{getInteractiveRangeIcon({ strength, roaming }, rest)}</>
}

export default RangeIcon
