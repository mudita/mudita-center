/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useSelector } from "react-redux"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"

export const useModalsQueue = (componentKey: string) => {
  const modalsQueue = useSelector(
    (state: ReduxRootState) => state.genericModals.queue
  )
  const modalOpened = Boolean(
    modalsQueue.find(
      (modal, index) =>
        modal.key === componentKey &&
        (modal.permanent || index === modalsQueue.length - 1)
    )
  )
  return { opened: modalOpened }
}
