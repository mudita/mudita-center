/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AppSettings } from "app-settings/renderer"
import { useCallback, useEffect, useState } from "react"
import { AppUpdateFlow, checkForAppUpdate } from "app-updater/feature"
import { useAppDispatch } from "app-store/utils"
import { RequirementStatus } from "./requirement-status.type"
import { PrivacyPolicyFlow } from "./privacy-policy-flow"

export const CheckInitRequirements = () => {
  const dispatch = useAppDispatch()

  const [privacyPolicyStatus, setPrivacyPolicyStatus] = useState(
    RequirementStatus.Unknown
  )
  const [updateStatus, setUpdateStatus] = useState(RequirementStatus.Unknown)
  const [usbAccessStatus, setUsbAccessStatus] = useState(
    RequirementStatus.Unknown
  )

  useEffect(() => {
    async function handlePrivacyPolicyStep() {
      try {
        const accepted = await AppSettings.get("user.privacyPolicyAccepted")
        setPrivacyPolicyStatus(
          accepted
            ? RequirementStatus.ActionNotRequired
            : RequirementStatus.ActionRequired
        )
      } catch {
        setPrivacyPolicyStatus(RequirementStatus.ActionRequired)
      }
    }
    void handlePrivacyPolicyStep()
  }, [])

  useEffect(() => {
    if (privacyPolicyStatus !== RequirementStatus.ActionNotRequired) {
      return
    }

    async function handleUpdateStep() {
      try {
        const resp = await dispatch(checkForAppUpdate({ silent: true }))
        setUpdateStatus(
          resp.payload
            ? RequirementStatus.ActionRequired
            : RequirementStatus.ActionNotRequired
        )
      } catch {
        setUpdateStatus(RequirementStatus.ActionNotRequired)
      }
    }
    void handleUpdateStep()
  }, [privacyPolicyStatus, dispatch])

  useEffect(() => {
    if (updateStatus !== RequirementStatus.ActionNotRequired) {
      return
    }

    async function handleAccessUsbStep() {
      try {
        const required = false // TODO: Implement USB access check
        setUsbAccessStatus(
          required
            ? RequirementStatus.ActionRequired
            : RequirementStatus.ActionNotRequired
        )
      } catch {
        setUsbAccessStatus(RequirementStatus.ActionNotRequired)
      }
    }
    void handleAccessUsbStep()
  }, [updateStatus])

  const acceptPrivacyPolicy = useCallback(() => {
    setPrivacyPolicyStatus(RequirementStatus.ActionNotRequired)
  }, [])

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
