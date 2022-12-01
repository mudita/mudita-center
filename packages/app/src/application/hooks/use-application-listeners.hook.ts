/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useEffect } from "react"
import {
  registerAgreementStatusListener,
  removeAgreementStatusListener,
} from "App/application/listeners"
import { ApplicationHookProps } from "App/application/types"

export const useApplicationListener = ({
  onAgreementStatusChangeListener,
}: ApplicationHookProps): void => {
  useEffect(() => {
    registerAgreementStatusListener((_, value: boolean) =>
      onAgreementStatusChangeListener(value)
    )

    return () => {
      removeAgreementStatusListener(onAgreementStatusChangeListener)
    }
  }, [onAgreementStatusChangeListener])
}
