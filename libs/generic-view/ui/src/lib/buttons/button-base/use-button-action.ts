/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  closeAllModals,
  closeDomainModals,
  closeModal,
  openModal,
  replaceModal,
  useScreenTitle,
} from "generic-view/store"
import { ButtonAction } from "generic-view/utils"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router"
import { Dispatch } from "Core/__deprecated__/renderer/store"

export const useButtonAction = (viewKey: string) => {
  const dispatch = useDispatch<Dispatch>()
  const navigate = useHistory()
  const currentViewName = useScreenTitle(viewKey)

  return (action?: ButtonAction) => {
    if (!action) return
    switch (action.type) {
      case "open-modal":
        dispatch(
          openModal({
            key: action.modalKey,
            domain: action.domain,
            permanent: action.permanent,
          })
        )
        break
      case "close-modal":
        dispatch(closeModal({ key: action.modalKey }))
        break
      case "replace-modal":
        dispatch(
          replaceModal({
            key: action.modalKey,
            domain: action.domain,
            permanent: action.permanent,
          })
        )
        break
      case "close-domain-modals":
        dispatch(closeDomainModals({ domain: action.domain }))
        break
      case "close-all-modals":
        dispatch(closeAllModals())
        break
      case "navigate":
        navigate.push({
          pathname: `/generic/${action.viewKey}`,
          state: {
            previousViewName: currentViewName,
          },
        })
        break
      case "custom":
        action.callback()
        break
      default:
        break
    }
  }
}
