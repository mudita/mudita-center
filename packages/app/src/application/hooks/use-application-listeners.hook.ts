/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useEffect } from "react"
import {
  registerAgreementStatusListener,
  removeAgreementStatusListener,
} from "App/application/listeners"
import { Event } from "electron"

export const useApplicationListener = (
  onAgreementStatusChangeListener: (status: boolean) => void
): void => {
  useEffect(() => {
    const listener = (_: Event, value: boolean) => {
      onAgreementStatusChangeListener(value)
    }

    registerAgreementStatusListener(listener)

    return () => {
      removeAgreementStatusListener(listener)
    }
  }, [onAgreementStatusChangeListener])
}
