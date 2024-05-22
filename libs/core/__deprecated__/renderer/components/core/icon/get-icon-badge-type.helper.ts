/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IconBadgeType } from "Core/__deprecated__/renderer/components/core/icon/icon-badge-type.constant"

/**
 * The helper function getIconBadgeType is used to transform the value of the badge prop
 * into the appropriate IconBadgeType or undefined. The main purpose of this function
 * is to handle the case when the badge is of type boolean.
 *
 * @param badge - The value of the badge prop, which can be undefined, boolean, or IconBadgeType.
 * @returns IconBadgeType or undefined, depending on the value of badge.
 */
export const getIconBadgeType = (
  badge: undefined | boolean | IconBadgeType
): IconBadgeType | undefined => {
  if (badge === true) {
    return IconBadgeType.Badge
  } else if (badge === false || badge === undefined) {
    return undefined
  } else {
    return badge
  }
}
