/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AppSettings } from "app-settings/renderer"
import { useCallback, useEffect, useState } from "react"
import { PrivacyPolicyModal } from "app-init/ui"
import { AppActions } from "app-utils/renderer"

enum RequirementsStatus {
  Unknown,
  PrivacyPolicyAcceptRequired,
  ForceUpdateRequired,
  UsbAccessRequired,
}

export const CheckInitRequirements = () => {
  const [status, setStatus] = useState(RequirementsStatus.Unknown)

  const isPrivacyPolicyRequired = async () => {
    const privacyPolicyAccepted = await AppSettings.get(
      "user.privacyPolicyAccepted"
    )
    return !privacyPolicyAccepted
  }

  const acceptPrivacyPolicy = async () => {
    await AppSettings.set({
      user: {
        privacyPolicyAccepted: true,
      },
    })
    setStatus(RequirementsStatus.Unknown)
  }

  const openPrivacyPolicyContent = async () => {
    // Open privacy policy in a new window
  }

  const isForceUpdateRequired = async () => {
    console.log("Checking for force update...")
    //
    return false
  }

  const isUsbAccessRequired = async () => {
    console.log("Checking for USB access...")
    //
    return false
  }

  const checkRequirements = useCallback(async () => {
    if (await isPrivacyPolicyRequired()) {
      setStatus(RequirementsStatus.PrivacyPolicyAcceptRequired)
      return
    }
    if (await isForceUpdateRequired()) {
      setStatus(RequirementsStatus.ForceUpdateRequired)
      return
    }
    if (await isUsbAccessRequired()) {
      setStatus(RequirementsStatus.UsbAccessRequired)
      return
    }
  }, [])

  useEffect(() => {
    void checkRequirements()
  }, [checkRequirements, status])

  return (
    <PrivacyPolicyModal
      opened={status === RequirementsStatus.PrivacyPolicyAcceptRequired}
      onAccept={acceptPrivacyPolicy}
      onClose={AppActions.close}
      onLinkClick={openPrivacyPolicyContent}
    />
  )
}
