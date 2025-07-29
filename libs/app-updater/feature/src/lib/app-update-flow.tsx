/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, memo, useEffect } from "react"
import {
  UpdateCheckingModal,
  UpdateAvailableModal,
  UpdateErrorModal,
  UpdateInProgressModal,
  UpdateNotAvailableModal,
} from "app-updater/ui"
import { useSelector } from "react-redux"
import {
  ModalsState,
  selectAppUpdaterDownloadProgress,
  selectAppUpdaterForceUpdate,
  selectAppUpdaterModalsState,
  selectAppUpdaterNewVersion,
} from "./store/app-updater.selectors"
import { useAppDispatch } from "app-store/utils"
import {
  cancelAppUpdate,
  checkAppVersion,
  downloadAndInstallAppUpdate,
  setAppUpdaterDownloadProgress,
} from "./store/app-updater.actions"
import { AppUpdater } from "app-updater/renderer"

interface Props {
  onClose: VoidFunction
}

export const AppUpdateFlow: FunctionComponent<Props> = memo(({ onClose }) => {
  const dispatch = useAppDispatch()
  const newVersion = useSelector(selectAppUpdaterNewVersion)
  const isForcedUpdate = useSelector(selectAppUpdaterForceUpdate)
  const downloadProgress = useSelector(selectAppUpdaterDownloadProgress)
  const modalsState = useSelector(selectAppUpdaterModalsState)

  const handleCancel = () => {
    dispatch(cancelAppUpdate())
    onClose()
  }

  const handleDownload = () => {
    dispatch(downloadAndInstallAppUpdate())
  }

  useEffect(() => {
    AppUpdater.onProgress((percent) => {
      dispatch(setAppUpdaterDownloadProgress(percent))
    })
  }, [dispatch])

  useEffect(() => {
    dispatch(checkAppVersion())
  }, [dispatch])

  return (
    <>
      <UpdateCheckingModal
        opened={modalsState === ModalsState.CheckingForUpdate}
        onClose={handleCancel}
      />
      <UpdateAvailableModal
        opened={modalsState === ModalsState.UpdateAvailable}
        version={newVersion || ""}
        onClose={isForcedUpdate ? undefined : handleCancel}
        onUpdate={handleDownload}
      />
      <UpdateNotAvailableModal
        opened={modalsState === ModalsState.UpdateNotAvailable}
        onClose={handleCancel}
      />
      <UpdateInProgressModal
        opened={modalsState === ModalsState.DownloadInProgress}
        progress={downloadProgress}
      />
      <UpdateErrorModal
        opened={modalsState === ModalsState.Error}
        onClose={handleCancel}
      />
    </>
  )
})
