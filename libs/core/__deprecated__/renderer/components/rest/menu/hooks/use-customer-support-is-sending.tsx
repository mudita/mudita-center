/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useEffect, useState } from "react"
import { ipcRenderer } from "electron-better-ipc"
import { HelpActions } from "Core/__deprecated__/common/enums/help-actions.enum"

export const useCustomerSupportIsSending = () => {
  const [isSending, setSending] = useState<boolean>(false)

  useEffect(() => {
    ipcRenderer.answerMain(
      HelpActions.CustomerIsSendingToRenderer,
      (sending: boolean) => {
        setSending(sending)
      }
    )
  }, [])

  return isSending
}
