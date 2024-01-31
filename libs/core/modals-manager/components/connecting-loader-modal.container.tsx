/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { defineMessages } from "react-intl"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import LoaderModal from "Core/ui/components/loader-modal/loader-modal.component"

const messages = defineMessages({
  subtitle: {
    id: "component.connectingLoaderModal.subtitle",
  },
})

const ConnectingLoaderModalContainer: FunctionComponent = () => {
  return (
    <LoaderModal
      data={{ "modal-id": "connecting-loader-modal" }}
      subtitle={intl.formatMessage(messages.subtitle)}
      open={false}
    />
  )
}

export default ConnectingLoaderModalContainer
