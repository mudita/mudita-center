/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useEffect, useState } from "react"

export const useCustomerSupportIsSending = () => {
  const [isSending, setSending] = useState(
    localStorage.getItem("customerSupportIsSending")
  )

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSending(localStorage.getItem("customerSupportIsSending"))
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return isSending === "true" ? true : false
}
