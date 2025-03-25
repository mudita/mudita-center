/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { LegacyIcon, Props as IconProps } from "./icon.component"
import { LegacyIconType } from "app-theme/models"
import { FunctionComponent } from "react"

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
      return (
        <LegacyIcon type={LegacyIconType.VeryHighRangeWithRoaming} {...rest} />
      )
    case strength > 60 && roaming:
      return <LegacyIcon type={LegacyIconType.HighRangeWithRoaming} {...rest} />
    case strength > 40 && roaming:
      return (
        <LegacyIcon type={LegacyIconType.MediumRangeWithRoaming} {...rest} />
      )
    case strength > 20 && roaming:
      return <LegacyIcon type={LegacyIconType.LowRangeWithRoaming} {...rest} />
    case strength > 0 && roaming:
      return (
        <LegacyIcon type={LegacyIconType.VeryLowRangeWithRoaming} {...rest} />
      )
    case strength > 80:
      return <LegacyIcon type={LegacyIconType.VeryHighRange} {...rest} />
    case strength > 60:
      return <LegacyIcon type={LegacyIconType.HighRange} {...rest} />
    case strength > 40:
      return <LegacyIcon type={LegacyIconType.MediumRange} {...rest} />
    case strength > 20:
      return <LegacyIcon type={LegacyIconType.LowRange} {...rest} />
    case strength > 0:
      return <LegacyIcon type={LegacyIconType.VeryLowRange} {...rest} />
    case strength === 0:
      return <LegacyIcon type={LegacyIconType.NoRange} {...rest} />
    default:
      return <LegacyIcon type={LegacyIconType.NoRange} {...rest} />
  }
}

export const RangeIcon: FunctionComponent<RangeIconProps & IconProps> = ({
  strength,
  roaming = false,
  ...rest
}) => {
  return <>{getInteractiveRangeIcon({ strength, roaming }, rest)}</>
}
