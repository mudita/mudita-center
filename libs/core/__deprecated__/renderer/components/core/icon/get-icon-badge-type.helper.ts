/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IconBadgeType } from "Core/__deprecated__/renderer/components/core/icon/icon-badge-type.constant"

export const getIconBadgeType = (
  badge: undefined | boolean | IconBadgeType,
): IconBadgeType | undefined => {
  if (badge === true || badge === IconBadgeType.Badge) {
    return IconBadgeType.Badge
  } else if (badge === IconBadgeType.BadgeWithCounter) {
    return IconBadgeType.BadgeWithCounter
  } else {
    return undefined
  }
}
