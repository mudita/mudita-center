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
import { useUsbAccessActionRequired } from "./usb-access/use-usb-access-action-required"
import { UsbAccessFlow } from "./usb-access/usb-access-flow"
import logger from "electron-log/renderer"

export const CheckInitRequirements = () => {
  const dispatch = useAppDispatch()
  const usbAccessActionRequired = useUsbAccessActionRequired()
  const [privacyPolicyStatus, setPrivacyPolicyStatus] = useState(
    RequirementStatus.Unknown
  )
  const [updateStatus, setUpdateStatus] = useState(RequirementStatus.Unknown)
  const [usbAccessStatus, setUsbAccessStatus] = useState(
    RequirementStatus.Unknown
  )

  // #1 Privacy Policy Step
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

  // #2 App Update Step
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

  // #3 USB Access Step
  useEffect(() => {
    if (updateStatus !== RequirementStatus.ActionNotRequired) {
      return
    }

    setUsbAccessStatus(usbAccessActionRequired)
  }, [updateStatus, usbAccessActionRequired])

  // #4 Initialize App Update Flow Finished
  useEffect(() => {
    if (usbAccessStatus !== RequirementStatus.Unknown) {
      logger.info("App initialization requirements check completed")
    }
  }, [usbAccessStatus, dispatch])

  const acceptPrivacyPolicy = useCallback(() => {
    setPrivacyPolicyStatus(RequirementStatus.ActionNotRequired)
  }, [])

  const handleUsbAccessFlowClose = useCallback(() => {
    setUsbAccessStatus(RequirementStatus.ActionNotRequired)
  }, [])

  return (
    <>
      <PrivacyPolicyFlow
        opened={privacyPolicyStatus === RequirementStatus.ActionRequired}
        onAccept={acceptPrivacyPolicy}
      />
      <AppUpdateFlow />
      <UsbAccessFlow
        status={usbAccessStatus}
        onClose={handleUsbAccessFlowClose}
      />
    </>
  )
}
