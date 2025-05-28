/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AppActions, AppUpdater } from "app-utils/renderer"
import { FunctionComponent, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  About,
  UpdateAvailableModal,
  UpdateDownloadedModal,
  UpdateFailedModal,
  UpdateNotAvailableModal,
  UpdateDownloadProgressModal,
  UpdateInstallProgressModal,
  UpdateCompletedModal,
} from "settings/ui"
import {
  setCheckingForUpdate,
  setCheckingForUpdateFailed,
  setCurrentVersion,
  setLatestVersion,
  toggleApplicationUpdateAvailable,
  showUpdateAvailableModal,
  hideUpdateAvailableModal,
  showUpdateNotAvailableModal,
  hideUpdateNotAvailableModal,
  showUpdateDownloadProgressModal,
  showUpdateDownloadedModal,
  showUpdateInstallProgressModal,
  showUpdateCompletedModal,
  showUpdateFailedModal,
  hideUpdateDownloadProgressModal,
  hideUpdateDownloadedModal,
  hideUpdateInstallProgressModal,
  hideUpdateCompletedModal,
  hideUpdateFailedModal,
  setUpdateInstallProgress,
  setUpdateDownloadProgress,
} from "../store/settings.actions"
import {
  selectCheckingForUpdate,
  selectCurrentVersion,
  selectLatestVersion,
  selectUpdateAvailable,
  selectUpdateAvailableModalOpen,
  selectUpdateNotAvailableModalOpen,
  selectUpdateDownloadProgressModalOpen,
  selectUpdateDownloadedModalOpen,
  selectUpdateInstallProgressModalOpen,
  selectUpdateCompletedModalOpen,
  selectUpdateFailedModalOpen,
  selectUpdateDownloadProgress,
  selectUpdateInstallProgress,
} from "../store/settings.selectors"

export const SettingsAboutPage: FunctionComponent = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    AppActions.getAppVersion().then((version) => {
      dispatch(setCurrentVersion(version))
    })

    AppUpdater.onAvailableUpdateEvent((version) => {
      dispatch(setLatestVersion(version))
      dispatch(toggleApplicationUpdateAvailable(true))
      dispatch(setCheckingForUpdate(false))
      dispatch(setCheckingForUpdateFailed(false))
      dispatch(showUpdateAvailableModal())
    })

    AppUpdater.onNotAvailableUpdateEvent(() => {
      dispatch(toggleApplicationUpdateAvailable(false))
      dispatch(setCheckingForUpdate(false))
      dispatch(setCheckingForUpdateFailed(false))
      dispatch(showUpdateNotAvailableModal())
    })

    AppUpdater.onUpdateErrorEvent(() => {
      dispatch(setCheckingForUpdate(false))
      dispatch(setCheckingForUpdateFailed(true))
      dispatch(showUpdateFailedModal())
    })
    AppUpdater.onUpdateDownloadProgress((percent) => {
      dispatch(setUpdateDownloadProgress(percent))
    })

    AppUpdater.onUpdateInstallProgress((percent) => {
      dispatch(setUpdateInstallProgress(percent))
    })
  }, [dispatch])

  const legalWindows = {
    license: {
      path: "/license",
      title: "Mudita Center - License",
    },
    terms: {
      path: "/terms-of-service",
      title: "Mudita Center - Terms of Service",
    },
    policy: {
      path: "/privacy-policy",
      title: "Mudita Center - Privacy Policy",
    },
  }

  const openLicenseWindow = () => {
    AppActions.openLegalWindow(
      legalWindows.license.path,
      legalWindows.license.title
    )
  }

  const openTermsOfServiceWindow = () => {
    AppActions.openLegalWindow(
      legalWindows.terms.path,
      legalWindows.terms.title
    )
  }

  const openPrivacyPolicyWindow = () => {
    AppActions.openLegalWindow(
      legalWindows.policy.path,
      legalWindows.policy.title
    )
  }

  const handleAppUpdateAvailableCheck = () => {
    dispatch(setCheckingForUpdate(true))
    dispatch(setCheckingForUpdateFailed(false))
    AppUpdater.checkForUpdates()
  }

  const hideAppUpdateNotAvailable = () => {
    dispatch(hideUpdateNotAvailableModal())
  }

  const handleDownloadUpdate = () => {
    dispatch(hideUpdateAvailableModal())
    dispatch(showUpdateDownloadProgressModal())
    AppUpdater.downloadUpdate()
  }

  const handleInstallUpdate = () => {
    dispatch(hideUpdateDownloadedModal())
    dispatch(showUpdateInstallProgressModal())
    AppUpdater.installUpdate()
  }

  const handleCancelUpdate = () => {
    AppUpdater.cancelDownload()
  }

  const latestVersion = useSelector(selectLatestVersion)
  const currentVersion = useSelector(selectCurrentVersion)
  const updateAvailable = useSelector(selectUpdateAvailable)
  const checkingForUpdate = useSelector(selectCheckingForUpdate)

  const isUpdateAvailableModalOpen = useSelector(selectUpdateAvailableModalOpen)
  const isUpdateNotAvailableModalOpen = useSelector(
    selectUpdateNotAvailableModalOpen
  )
  const isUpdateDownloadProgressModalOpen = useSelector(
    selectUpdateDownloadProgressModalOpen
  )
  const isUpdateDownloadedModalOpen = useSelector(
    selectUpdateDownloadedModalOpen
  )
  const isUpdateInstallProgressModalOpen = useSelector(
    selectUpdateInstallProgressModalOpen
  )
  const isUpdateCompletedModalOpen = useSelector(selectUpdateCompletedModalOpen)
  const isUpdateFailedModalOpen = useSelector(selectUpdateFailedModalOpen)

  const downloadProgress = useSelector(selectUpdateDownloadProgress)
  const installProgress = useSelector(selectUpdateInstallProgress)

  return (
    <>
      <About
        openLicense={openLicenseWindow}
        openTermsOfService={openTermsOfServiceWindow}
        openPrivacyPolicy={openPrivacyPolicyWindow}
        appLatestVersion={latestVersion}
        appCurrentVersion={currentVersion}
        appUpdateAvailable={updateAvailable}
        onAppUpdateAvailableCheck={handleAppUpdateAvailableCheck}
        hideAppUpdateNotAvailable={hideAppUpdateNotAvailable}
        checkingForUpdate={checkingForUpdate}
      />
      <UpdateAvailableModal
        opened={isUpdateAvailableModalOpen}
        onClose={() => dispatch(hideUpdateAvailableModal())}
        onDownload={() => handleDownloadUpdate}
        latestVersion={latestVersion}
      />
      <UpdateNotAvailableModal
        opened={isUpdateNotAvailableModalOpen}
        onClose={() => dispatch(hideUpdateNotAvailableModal())}
        currentVersion={currentVersion}
      />
      <UpdateDownloadProgressModal
        opened={isUpdateDownloadProgressModalOpen}
        progressPercent={downloadProgress}
        onClose={() => dispatch(hideUpdateDownloadProgressModal())}
        onCancel={handleCancelUpdate}
      />
      <UpdateDownloadedModal
        opened={isUpdateDownloadedModalOpen}
        onClose={() => dispatch(hideUpdateDownloadedModal())}
        onUpdate={() => handleInstallUpdate}
        latestVersion={latestVersion}
      />
      <UpdateInstallProgressModal
        opened={isUpdateInstallProgressModalOpen}
        progressPercent={installProgress}
        onClose={() => dispatch(hideUpdateInstallProgressModal())}
        onCancel={handleCancelUpdate}
      />
      <UpdateCompletedModal
        opened={isUpdateCompletedModalOpen}
        onClose={() => dispatch(hideUpdateCompletedModal())}
      />
      <UpdateFailedModal
        opened={isUpdateFailedModalOpen}
        onClose={() => dispatch(hideUpdateFailedModal())}
      />
    </>
  )
}
