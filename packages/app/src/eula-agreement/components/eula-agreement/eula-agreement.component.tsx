/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { useSelector } from "react-redux"
import { EULAAgreementProps } from "App/eula-agreement/components/eula-agreement/eula-agreement.interface"
import { AgreementModal } from "App/eula-agreement/components/agreement-modal"

// DEPRECATED
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"

export const EULAAgreement: FunctionComponent<EULAAgreementProps> = ({
  children,
}) => {
  const onboardingFinished = useSelector(
    (state: ReduxRootState) => state.device.status.onboardingFinished
  )

  return (
    <>
      <AgreementModal open={!onboardingFinished} />
      {children}
    </>
  )
}
