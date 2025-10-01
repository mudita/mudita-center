/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IconType } from "app-theme/models"
import { Icon, Typography } from "app-theme/ui"

interface ToastContentProps {
  key?: string
  text: string
  icon?: IconType
}

export const createManageFilesToastContent = ({
  key,
  icon = IconType.CheckBold,
  text,
}: ToastContentProps) => ({
  key,
  content: (
    <>
      <Icon type={icon} />
      <Typography.P1>{text}</Typography.P1>
    </>
  ),
})
