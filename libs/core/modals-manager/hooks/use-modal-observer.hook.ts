/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useEffect, useRef } from "react"
import { useDispatch } from "react-redux"
import { ModalsManagerItem, setVisibleModals } from "Core/modals-manager"

export const useModalObserver = () => {
  const dispatch = useDispatch()
  const previousModalsState = useRef<ModalsManagerItem[]>([])

  useEffect(() => {
    const checkForModal = () => {
      const modals: ModalsManagerItem[] = [
        ...document.querySelectorAll(".ReactModalPortal"),
      ].map((modal) => {
        const childWithId = modal.querySelector("[data-modal-id]")
        const id = childWithId?.getAttribute("data-modal-id") ?? undefined

        return {
          id: id,
          isPresent: !!modal && modal.children.length > 0,
        }
      })
      if (JSON.stringify(modals) !== JSON.stringify(previousModalsState.current)) {
        dispatch(setVisibleModals(modals))
        previousModalsState.current = modals
      }
    }

    const observer = new MutationObserver(checkForModal)

    observer.observe(document.body, { childList: true, subtree: true })

    checkForModal()

    return () => {
      observer.disconnect()
    }
  }, [dispatch])
}
