/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect } from "react"
import { APIFC, IconType } from "generic-view/utils"
import { AppInstallationProgressConfig } from "generic-view/models"
import { Modal } from "../../interactive/modal/modal"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { defineMessages } from "react-intl"
import { ProgressBar } from "../../interactive/progress-bar/progress-bar"
import {
  closeModal,
  getAppinstallationProgressAction,
  openModal,
  selectActiveApiDeviceId,
  selectAppInstallationFileName,
  selectInstallationError,
  selectInstallationId,
  selectInstallationProgress,
} from "generic-view/store"
import { useDispatch, useSelector } from "react-redux"
import { Dispatch, ReduxRootState } from "Core/__deprecated__/renderer/store"

const messages = defineMessages({
  progressModalTitle: {
    id: "module.genericViews.appInstallation.progress.modalTitle",
  },
})

export const AppInstallationProgress: APIFC<
  undefined,
  AppInstallationProgressConfig
> = ({ config }) => {
  const dispatch = useDispatch<Dispatch>()
  const activeDeviceId = useSelector(selectActiveApiDeviceId) ?? ""

  const installationProgress = useSelector(selectInstallationProgress)
  const currentFileName = useSelector(selectAppInstallationFileName)
  const installationId = useSelector(selectInstallationId)
  const error = useSelector(selectInstallationError)

  useEffect(() => {
    if (installationId) {
      const interval = setInterval(() => {
        dispatch(
          getAppinstallationProgressAction({
            installationId,
            deviceId: activeDeviceId,
          })
        )
      }, 1000)

      if (installationProgress >= 100) {
        clearInterval(interval)
        dispatch(closeModal({ key: config.progressModalKey }))
        dispatch(
          openModal({
            key: config.completeModalKey,
          })
        )
      }

      if (error) {
        clearInterval(interval)
        dispatch(closeModal({ key: config.progressModalKey }))
        dispatch(
          openModal({
            key: config.errorModalKey,
          })
        )
      }

      return () => clearInterval(interval)
    }

    return
  }, [
    dispatch,
    installationId,
    installationProgress,
    activeDeviceId,
    error,
    config,
  ])

  return (
    <>
      <Modal.TitleIcon config={{ type: IconType.Grid }} />
      <Modal.Title>
        {intl.formatMessage(messages.progressModalTitle)}
      </Modal.Title>
      <ProgressBar
        config={{
          maxValue: 100,
        }}
        data={{
          value: installationProgress,
          message: currentFileName || "",
        }}
      />
    </>
  )
}
