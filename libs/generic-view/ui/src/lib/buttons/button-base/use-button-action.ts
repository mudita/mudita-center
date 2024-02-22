/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  closeAllModals,
  closeDomainModals,
  closeModal,
  getFile,
  openModal,
  replaceModal,
  selectActiveDevice,
  sendFile,
  useScreenTitle,
} from "generic-view/store"
import { ButtonAction } from "generic-view/utils"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router"
import { Dispatch, ReduxRootState } from "Core/__deprecated__/renderer/store"
import { getPaths } from "shared/app-state"
import { PayloadAction } from "@reduxjs/toolkit"
import { ResultObject } from "Core/core/builder"
import { platform } from "Core/__deprecated__/renderer/utils/platform"

export const useButtonAction = (viewKey: string) => {
  const dispatch = useDispatch<Dispatch>()
  const navigate = useHistory()
  const currentViewName = useScreenTitle(viewKey)
  const restore = useButtonRestoreAction()
  const backup = useButtonBackupAction()

  return (action: ButtonAction) => {
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
      case "restore-data":
        void restore()
        break
      case "backup-data":
        void backup()
        break
    }
  }
}

const useButtonRestoreAction = () => {
  const dispatch = useDispatch<Dispatch>()
  const osBackupLocation = useSelector(
    (state: ReduxRootState) => state.settings.osBackupLocation
  )
  const deviceId = useSelector(selectActiveDevice)

  return async () => {
    const { payload: getPathsPayload } = (await dispatch(
      getPaths({
        properties: ["openFile"],
        defaultPath: osBackupLocation,
      })
    )) as PayloadAction<ResultObject<string[] | undefined>>
    const location = getPathsPayload.ok && (getPathsPayload.data as string[])[0]
    if (location && deviceId) {
      const [fileName] = location
        .split(platform.windows() ? "\\" : "/")
        .reverse()
      dispatch(
        sendFile({
          deviceId: deviceId,
          filePath: location,
          targetPath: `/storage/emulated/0/Documents/${fileName}`,
        })
      )
    }
  }
}

const useButtonBackupAction = () => {
  const dispatch = useDispatch<Dispatch>()
  const deviceId = useSelector(selectActiveDevice)

  return async () => {
    if (deviceId) {
      dispatch(
        getFile({
          deviceId: deviceId,
          filePath: `/storage/emulated/0/Documents/example3.png`,
          targetPath: `/Users/mike/Downloads/example-get.png`,
        })
      )
    }
  }
}
