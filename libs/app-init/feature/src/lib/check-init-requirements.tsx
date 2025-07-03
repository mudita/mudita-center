/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AppSettings } from "app-settings/renderer"
import { FunctionComponent, useCallback, useEffect, useState } from "react"
import { PrivacyPolicyModal } from "app-init/ui"
import { AppActions, useUniqueTrack } from "app-utils/renderer"
import { AnalyticsEventCategory } from "app-utils/models"
import { AppUpdateFlow, checkForAppUpdate } from "app-updater/feature"
import { useAppDispatch } from "app-store/utils"

enum Status {
  Unknown = "unknown",
  ActionRequired = "action-required",
  ActionNotRequired = "action-not-required",
}

export const CheckInitRequirements = () => {
  const dispatch = useAppDispatch()

  const [privacyPolicyStatus, setPrivacyPolicyStatus] = useState(Status.Unknown)
  const [updateStatus, setUpdateStatus] = useState(Status.Unknown)
  const [usbAccessStatus, setUsbAccessStatus] = useState(Status.Unknown)

  const acceptPrivacyPolicy = useCallback(() => {
    setPrivacyPolicyStatus(Status.ActionNotRequired)
  }, [])

  useEffect(() => {
    if (privacyPolicyStatus === Status.Unknown) {
      void (async () => {
        const accepted = await AppSettings.get("user.privacyPolicyAccepted")
        setPrivacyPolicyStatus(
          accepted ? Status.ActionNotRequired : Status.ActionRequired
        )
      })()
    }
  }, [privacyPolicyStatus])

  useEffect(() => {
    if (privacyPolicyStatus !== Status.ActionNotRequired) {
      return
    }
    if (updateStatus === Status.Unknown) {
      void (async () => {
        const resp = await dispatch(checkForAppUpdate({ silent: true }))
        setUpdateStatus(
          resp.payload ? Status.ActionRequired : Status.ActionNotRequired
        )
      })()
    }
  }, [dispatch, privacyPolicyStatus, updateStatus])

  useEffect(() => {
    if (
      privacyPolicyStatus !== Status.ActionNotRequired ||
      updateStatus !== Status.ActionNotRequired
    ) {
      return
    }
    if (usbAccessStatus === Status.Unknown) {
      void (async () => {
        const required = false // TODO: Implement USB access check
        setUsbAccessStatus(
          required ? Status.ActionRequired : Status.ActionNotRequired
        )
      })()
    }
  }, [privacyPolicyStatus, updateStatus, usbAccessStatus])

  return (
    <>
      <PrivacyPolicyFlow
        status={privacyPolicyStatus}
        onAccept={acceptPrivacyPolicy}
      />
      <AppUpdateFlow />
      {/* TODO: Implement flow for USB access check  */}
    </>
  )
}

const PrivacyPolicyFlow: FunctionComponent<{
  status: Status
  onAccept: VoidFunction
}> = ({ status, onAccept }) => {
  const uniqueTrack = useUniqueTrack()

  const acceptPrivacyPolicy = async () => {
    await AppSettings.set({
      user: {
        privacyPolicyAccepted: true,
      },
    })
    void uniqueTrack({
      e_c: AnalyticsEventCategory.CenterVersion,
      e_a: import.meta.env.VITE_APP_VERSION,
    })
    onAccept()
  }

  const closePrivacyPolicy = () => {
    AppActions.close()
  }

  return (
    <PrivacyPolicyModal
      opened={status === Status.ActionRequired}
      onAccept={acceptPrivacyPolicy}
      onClose={closePrivacyPolicy}
    />
  )
}
