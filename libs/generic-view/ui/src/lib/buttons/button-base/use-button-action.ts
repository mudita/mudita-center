/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  closeAllModals,
  closeDomainModals,
  closeModal,
  createEntityDataAction,
  deleteEntitiesDataAction,
  openModal,
  openToastAction,
  replaceModal,
  selectActiveApiDeviceId,
  startAppInstallationAction,
  useScreenTitle,
} from "generic-view/store"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import logger from "Core/__deprecated__/main/utils/logger"
import { ButtonActions } from "generic-view/models"
import { useViewFormContext } from "generic-view/utils"
import { useSelectFilesButtonAction } from "./use-select-files-button-action"
import { useUploadFilesButtonAction } from "./use-upload-files-button-action"
import { modalTransitionDuration } from "generic-view/theme"
import { useMtpUploadFilesButtonAction } from "./use-mtp-upload-files-button-action"

const MTP_AVAILABLE = false

export const useButtonAction = (viewKey: string) => {
  const dispatch = useDispatch<Dispatch>()
  const navigate = useHistory()
  const currentViewName = useScreenTitle(viewKey)!
  const getFormContext = useViewFormContext()
  const activeDeviceId = useSelector(selectActiveApiDeviceId)!
  const selectFiles = useSelectFilesButtonAction()
  // If MTP is available, then use MTP Action
  const uploadFiles = MTP_AVAILABLE
    ? useMtpUploadFilesButtonAction()
    : useUploadFilesButtonAction()

  return (actions: ButtonActions) =>
    runActions(actions)(
      {
        dispatch,
        navigate,
        currentViewName,
        getFormContext,
        activeDeviceId,
      },
      {
        selectFiles,
        uploadFiles,
      }
    )
}

export interface RunActionsProviders {
  dispatch: Dispatch
  navigate: ReturnType<typeof useHistory>
  currentViewName: string
  getFormContext: ReturnType<typeof useViewFormContext>
  activeDeviceId: string
}

interface CustomActions {
  selectFiles: ReturnType<typeof useSelectFilesButtonAction>
  uploadFiles: ReturnType<typeof useUploadFilesButtonAction>
}

const waitForModalTransition = () => {
  return new Promise((resolve) => setTimeout(resolve, modalTransitionDuration))
}

const runActions = (actions?: ButtonActions) => {
  return async (
    providers: RunActionsProviders,
    customActions: CustomActions
  ) => {
    if (!actions) return
    const {
      dispatch,
      navigate,
      currentViewName,
      getFormContext,
      activeDeviceId,
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
          await waitForModalTransition()
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
          await waitForModalTransition()
          break
        case "close-all-modals":
          dispatch(closeAllModals())
          await waitForModalTransition()
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
          getFormContext(action.formKey)?.setValue(action.key, action.value)
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
        case "select-files":
          {
            const selected = await customActions.selectFiles(action)
            if (!selected) {
              return
            }
          }
          break
        case "upload-files":
          await customActions.uploadFiles(action, {
            onValidationFailure: async () => {
              await runActions(action.preActions?.validationFailure)(
                providers,
                customActions
              )
            },
            onSuccess: async () => {
              await runActions(action.postActions?.success)(
                providers,
                customActions
              )
            },
            onFailure: async () => {
              await runActions(action.postActions?.failure)(
                providers,
                customActions
              )
            },
          })
          break
        case "start-app-installation":
          await dispatch(
            startAppInstallationAction({
              filePath: action.filePath,
              deviceId: activeDeviceId,
              fileName: action.fileName,
              onSuccess: () => {
                return runActions(action.postActions?.success)(
                  providers,
                  customActions
                )
              },
              onError: async () => {
                await runActions(action.postActions?.failure)(
                  providers,
                  customActions
                )
              },
            })
          )
          break
        case "entities-delete":
          await dispatch(
            deleteEntitiesDataAction({
              entitiesType: action.entitiesType,
              ids: action.ids,
              deviceId: activeDeviceId,
              onSuccess: () => {
                return runActions(action.postActions?.success)(
                  providers,
                  customActions
                )
              },
              onError: async () => {
                await runActions(action.postActions?.failure)(
                  providers,
                  customActions
                )
              },
            })
          )
          break
        case "entity-create":
          await dispatch(
            createEntityDataAction({
              data: action.data,
              entitiesType: action.entitiesType,
              deviceId: activeDeviceId,
              onSuccess: async () => {
                await runActions(action.postActions?.success)(
                  providers,
                  customActions
                )
              },
              onError: async () => {
                await runActions(action.postActions?.failure)(
                  providers,
                  customActions
                )
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
        default:
          break
      }
    }
  }
}
