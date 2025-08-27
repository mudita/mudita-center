/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ComponentProps, FunctionComponent, useMemo } from "react"
import { Icon } from "../icon/icon"
import { IconType } from "app-theme/models"

interface Props {
  batteryPercentage: number
  size?: ComponentProps<typeof Icon>["size"]
}

export const BatteryIcon: FunctionComponent<Props> = ({
  batteryPercentage,
  size,
}) => {
  const iconType = useMemo(() => {
    if (batteryPercentage > 95) return IconType.Battery5
    if (batteryPercentage >= 70) return IconType.Battery4
    if (batteryPercentage >= 40) return IconType.Battery3
    if (batteryPercentage >= 20) return IconType.Battery2
    if (batteryPercentage >= 10) return IconType.Battery1
    return IconType.Battery0
  }, [batteryPercentage])

  return <Icon type={iconType} size={size} />
}
