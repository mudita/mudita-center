/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useSettings } from "app-settings/renderer"
import { useHasSerialPortAccess } from "./use-usb-access"

export const useUsbAccessStatus = () => {
  const settings = useSettings()
  const query = useHasSerialPortAccess()

  const isLoading = settings.isLoading || query.isLoading
  const isError = settings.isError || query.isError || query.data?.ok === false

  return {
    isLoading,
    isError,
    hasAccess: query.data?.ok === true ? Boolean(query.data.data) : undefined,
    restartRequired: Boolean(settings.data?.restartRequiredForSerialPortAccess),
  }
}
