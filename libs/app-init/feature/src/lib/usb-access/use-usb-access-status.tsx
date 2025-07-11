/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useSettingsOnce } from "app-settings/renderer"
import { useHasSerialPortAccessOnce } from "./use-usb-access"

export const useUsbAccessStatus = () => {
  const settings = useSettingsOnce()
  const query = useHasSerialPortAccessOnce()

  const isLoading = settings.isLoading || query.isLoading
  const isError = settings.isError || query.isError || query.data?.ok === false

  return {
    isLoading,
    isError,
    hasAccess: query.data?.ok === true ? Boolean(query.data.data) : undefined,
    restartRequired: Boolean(settings.data?.restartRequiredForSerialPortAccess),
  }
}
