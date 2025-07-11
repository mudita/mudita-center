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
import { RequirementStatus } from "./requirement-status.type"

export const CheckInitRequirements = () => {
  const dispatch = useAppDispatch()

  const [privacyPolicyStatus, setPrivacyPolicyStatus] = useState(
    RequirementStatus.Unknown
  )
  const [updateStatus, setUpdateStatus] = useState(RequirementStatus.Unknown)
  const [usbAccessStatus, setUsbAccessStatus] = useState(
    RequirementStatus.Unknown
  )

  const acceptPrivacyPolicy = useCallback(() => {
    setPrivacyPolicyStatus(RequirementStatus.ActionNotRequired)
  }, [])

  useEffect(() => {
    if (privacyPolicyStatus === RequirementStatus.Unknown) {
      void (async () => {
        const accepted = await AppSettings.get("user.privacyPolicyAccepted")
        setPrivacyPolicyStatus(
          accepted
            ? RequirementStatus.ActionNotRequired
            : RequirementStatus.ActionRequired
        )
      })()
    }

    if (privacyPolicyStatus !== RequirementStatus.ActionNotRequired) {
      return
    }
    if (updateStatus === RequirementStatus.Unknown) {
      void (async () => {
        const resp = await dispatch(checkForAppUpdate({ silent: true }))
        setUpdateStatus(
          resp.payload
            ? RequirementStatus.ActionRequired
            : RequirementStatus.ActionNotRequired
        )
      })()
    }

    if (updateStatus !== RequirementStatus.ActionNotRequired) {
      return
    }
    if (usbAccessStatus === RequirementStatus.Unknown) {
      void (async () => {
        const required = false // TODO: Implement USB access check
        setUsbAccessStatus(
          required
            ? RequirementStatus.ActionRequired
            : RequirementStatus.ActionNotRequired
        )
      })()
    }
  }, [dispatch, privacyPolicyStatus, updateStatus, usbAccessStatus])

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
  status: RequirementStatus
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
      opened={status === RequirementStatus.ActionRequired}
      onAccept={acceptPrivacyPolicy}
      onClose={closePrivacyPolicy}
    />
  )
}
