/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { defineMessages } from "react-intl"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import LoaderModal from "Core/ui/components/loader-modal/loader-modal.component"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { isAnyOtherModalPresentSelector } from "Core/modals-manager/selectors/is-any-other-modal-present.selector"

const CONNECTING_LOADER_MODAL_ID = "connecting-loader-modal"

const messages = defineMessages({
  subtitle: {
    id: "component.connectingLoaderModal.subtitle",
  },
})

const ConnectingLoaderModalContainer: FunctionComponent = () => {
  const isAnyOtherModalPresent = useSelector((state: ReduxRootState) =>
    isAnyOtherModalPresentSelector(state, CONNECTING_LOADER_MODAL_ID)
  )

  useEffect(() => {
    console.log("isAnyOtherModalPresent: ", isAnyOtherModalPresent)
  }, [isAnyOtherModalPresent])

  return (
    <LoaderModal
      data={{ "modal-id": CONNECTING_LOADER_MODAL_ID }}
      subtitle={intl.formatMessage(messages.subtitle)}
      open={false}
    />
  )
}

export default ConnectingLoaderModalContainer
