/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useEffect } from "react"
import modalService from "Core/__deprecated__/renderer/components/core/modal/modal.service"
import { modalEventEmitter, ModelEvent } from "Core/__deprecated__/renderer/components/core/modal/modal-service-emitter"

export const useModalClosedListener = () => {
  useEffect(() => {
    const handler = (forceEnabled: boolean) =>
      modalService.closeModal(forceEnabled)
    modalEventEmitter.on(ModelEvent.Close, handler)

    return () => {
      modalEventEmitter.off(ModelEvent.Close, handler)
    }
  }, [])
}
