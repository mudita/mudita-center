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
  openToastAction,
  replaceModal,
  selectActiveApiDeviceId,
  useFormField,
  useScreenTitle,
} from "generic-view/store"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import logger from "Core/__deprecated__/main/utils/logger"
import { ButtonActions } from "generic-view/models"
import { useViewFormContext } from "generic-view/utils"

export const useButtonAction = (viewKey: string) => {
  const dispatch = useDispatch<Dispatch>()
  const navigate = useHistory()
  const currentViewName = useScreenTitle(viewKey)!
  const getFormContext = useViewFormContext()
  const activeDeviceId = useSelector(selectActiveApiDeviceId)!
  const { setField, resetField } = useFormField()

  return (actions: ButtonActions) =>
    runActions(actions)({
      dispatch,
      navigate,
      currentViewName,
      getFormContext,
      activeDeviceId,
      setField,
      resetField,
    })
}

interface RunActionsProviders {
  dispatch: Dispatch
  navigate: ReturnType<typeof useHistory>
  currentViewName: string
  getFormContext: ReturnType<typeof useViewFormContext>
  activeDeviceId: string
  setField: ReturnType<typeof useFormField>["setField"]
  resetField: ReturnType<typeof useFormField>["resetField"]
}

const runActions = (actions?: ButtonActions) => {
  return async (providers: RunActionsProviders) => {
    if (!actions) return

    const {
      dispatch,
      navigate,
      currentViewName,
      getFormContext,
      activeDeviceId,
      setField,
      resetField,
    } = providers

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
          getFormContext(action.formKey).setValue(action.key, action.value)
          break
        case "form-toggle-field": {
          const formContext = getFormContext(action.formKey)
          if (typeof formContext.getValues(action.key) === "boolean") {
            formContext.setValue(action.key, !formContext.getValues(action.key))
          } else if (typeof formContext.getValues(action.key) === "undefined") {
            logger.error(`Tried to toggle not existing field: ${action.key}`)
          } else {
            logger.error(`Tried to toggle non-boolean field: ${action.key}`)
          }
          break
        }
        case "form-reset":
          getFormContext(action.formKey)?.reset()
          break
        case "form-set-field-v2":
          setField(action.fieldKey, action.value, {
            customFormName: action.formName,
          })
          break
        case "form-reset-v2":
          resetField(action.fieldKey, {
            customFormName: action.formName,
          })
          break
        case "entities-delete":
          await dispatch(
            deleteEntitiesDataAction({
              entitiesType: action.entitiesType,
              ids: action.ids,
              deviceId: activeDeviceId,
              onSuccess: () => {
                return runActions(action.postActions?.success)(providers)
              },
              onError: () => {
                return runActions(action.postActions?.failure)(providers)
              },
            })
          )
          break
        case "open-toast":
          await dispatch(openToastAction(action.toastKey))
          break
        case "custom":
          action.callback()
          break
      }
    }
  }
}
