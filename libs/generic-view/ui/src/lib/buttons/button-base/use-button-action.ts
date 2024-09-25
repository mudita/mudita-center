/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  closeAllModals,
  closeDomainModals,
  closeModal,
  deleteEntitiesDataAction,
  openModal,
  openToast,
  replaceModal,
  selectActiveApiDeviceId,
  useScreenTitle,
} from "generic-view/store"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import { useFormContext } from "react-hook-form"
import logger from "Core/__deprecated__/main/utils/logger"
import { ButtonActions } from "generic-view/models"

export const useButtonAction = (viewKey: string) => {
  const dispatch = useDispatch<Dispatch>()
  const navigate = useHistory()
  const currentViewName = useScreenTitle(viewKey)
  const formContext = useFormContext()
  const activeDeviceId = useSelector(selectActiveApiDeviceId)!

  return async (actions?: ButtonActions) => {
    if (!actions) return
    for (const action of actions) {
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
        case "form-set-field":
          formContext.setValue(action.key, action.value)
          break
        case "form-toggle-field":
          if (typeof formContext.getValues(action.key) === "boolean") {
            formContext.setValue(action.key, !formContext.getValues(action.key))
          } else if (typeof formContext.getValues(action.key) === "undefined") {
            logger.error(`Tried to toggle not existing field: ${action.key}`)
          } else {
            logger.error(`Tried to toggle non-boolean field: ${action.key}`)
          }
          break
        case "form-reset":
          formContext.reset()
          break
        case "entities-delete":
          await dispatch(
            deleteEntitiesDataAction({
              entitiesType: action.entitiesType,
              ids: action.ids,
              deviceId: activeDeviceId,
            })
          )
          break
        case "open-toast":
          dispatch(openToast(action.toastKey))
          break
        case "custom":
          action.callback()
          break
        default:
          break
      }
    }
  }
}
