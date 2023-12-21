/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { AgreementModal } from "Core/eula-agreement/components/agreement-modal"

const EULAAgreementContainer: FunctionComponent = () => {
  return <AgreementModal open />
}

export default EULAAgreementContainer
