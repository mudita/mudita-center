/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import React, { useEffect, useState } from "react"
import {
  AppUpdatePrivacyPolicy,
  AppUpdateRejected,
  AppUpdateError,
  AppUpdateProgress,
} from "App/__deprecated__/renderer/wrappers/app-update-step-modal/app-update.modals"
import registerDownloadedAppUpdateListener from "App/__deprecated__/main/functions/register-downloaded-app-update-listener"
import registerErrorAppUpdateListener from "App/__deprecated__/main/functions/register-error-app-update-listener"
import installAppUpdateRequest from "App/__deprecated__/renderer/requests/install-app-update.request"
import downloadAppUpdateRequest from "App/__deprecated__/renderer/requests/download-app-update.request"
import { ModalDialogProps } from "App/ui/components/modal-dialog"
import {
  trackCenterUpdate,
  TrackCenterUpdateState,
} from "App/analytic-data-tracker/helpers"

interface Props extends Partial<ModalDialogProps> {
  closeModal?: () => void
  appLatestVersion?: string
  appCurrentVersion?: string
  forced?: boolean
}

enum AppUpdateStep {
  Available,
  Updating,
  Error,
}

const AppUpdateStepModal: FunctionComponent<Props> = ({
  closeModal,
  appLatestVersion = "",
  appCurrentVersion = "",
  forced,
  ...props
}) => {
  const [appUpdateStep, setAppUpdateStep] = useState<AppUpdateStep>(
    AppUpdateStep.Available
  )
  const [appUpdateRejectedOpen, setAppUpdateRejectedOpen] =
    useState<boolean>(false)
  const onCloseModal = () => {
    setAppUpdateRejectedOpen(true)
  }

  useEffect(() => {
    const unregister = registerDownloadedAppUpdateListener(() => {
      void trackCenterUpdate({
        fromCenterVersion: appCurrentVersion,
        toCenterVersion: appLatestVersion,
        state: TrackCenterUpdateState.Start,
      })
      void installAppUpdateRequest()
    })

    return () => unregister()
  })

  useEffect(() => {
    const unregister = registerErrorAppUpdateListener(() => {
      void trackCenterUpdate({
        fromCenterVersion: appCurrentVersion,
        toCenterVersion: appLatestVersion,
        state: TrackCenterUpdateState.Fail,
      })
      setAppUpdateStep(AppUpdateStep.Error)
    })
    return () => unregister()
  })

  const handleProcessDownload = () => {
    void trackCenterUpdate({
      fromCenterVersion: appCurrentVersion ?? "",
      toCenterVersion: appLatestVersion ?? "",
      state: TrackCenterUpdateState.Download,
    })
    setAppUpdateStep(AppUpdateStep.Updating)
    void downloadAppUpdateRequest()
  }

  return (
    <>
      {!appUpdateRejectedOpen ? (
        <AppUpdatePrivacyPolicy
          open={appUpdateStep === AppUpdateStep.Available}
          onActionButtonClick={handleProcessDownload}
          appLatestVersion={appLatestVersion}
          appCurrentVersion={appCurrentVersion}
          closeModal={forced ? undefined : onCloseModal}
          {...props}
        />
      ) : (
        <AppUpdateRejected
          open={appUpdateRejectedOpen}
          closeModal={closeModal}
          onActionButtonClick={() => setAppUpdateRejectedOpen(false)}
          appLatestVersion={appLatestVersion}
          {...props}
        />
      )}
      <AppUpdateProgress
        open={appUpdateStep === AppUpdateStep.Updating}
        {...props}
      />
      <AppUpdateError
        open={appUpdateStep === AppUpdateStep.Error}
        closeModal={forced ? close : closeModal}
        {...props}
      />
    </>
  )
}

export default AppUpdateStepModal
