/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "Core/core/types/function-component.interface"
import React, { useEffect, useState } from "react"
import {
  AppUpdatePrivacyPolicy,
  AppUpdateRejected,
  AppUpdateError,
  AppUpdateProgress,
} from "Core/__deprecated__/renderer/wrappers/app-update-step-modal/app-update.modals"
import { answerMain } from "shared/utils"
import {
  AppUpdateEvent,
  downloadAppUpdateRequest,
  installAppUpdateRequest,
} from "electron/application-updater"
import { ModalDialogProps } from "Core/ui/components/modal-dialog"
import {
  trackCenterUpdate,
  TrackCenterUpdateState,
} from "Core/analytic-data-tracker/helpers"

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
    return answerMain(AppUpdateEvent.Downloaded, () => {
      void trackCenterUpdate({
        fromCenterVersion: appCurrentVersion,
        toCenterVersion: appLatestVersion,
        state: TrackCenterUpdateState.Start,
      })
      void installAppUpdateRequest()
    })
  })

  useEffect(() => {
    return answerMain(AppUpdateEvent.Error, () => {
      void trackCenterUpdate({
        fromCenterVersion: appCurrentVersion,
        toCenterVersion: appLatestVersion,
        state: TrackCenterUpdateState.Fail,
      })
      setAppUpdateStep(AppUpdateStep.Error)
    })
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
