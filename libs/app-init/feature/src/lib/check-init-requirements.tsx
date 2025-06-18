/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AppSettings } from "app-settings/renderer"
import { useCallback, useEffect, useState } from "react"
import { PrivacyPolicyModal } from "app-init/ui"
import { AppActions, useUniqueTrack } from "app-utils/renderer"
import { AnalyticsEventCategory } from "app-utils/models"

enum RequirementsStatus {
  Unknown,
  PrivacyPolicyAcceptRequired,
  ForceUpdateRequired,
  UsbAccessRequired,
}

export const CheckInitRequirements = () => {
  const [status, setStatus] = useState(RequirementsStatus.Unknown)
  const uniqueTrack = useUniqueTrack()

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
    void uniqueTrack({
      e_c: AnalyticsEventCategory.CenterVersion,
      e_a: import.meta.env.VITE_APP_VERSION,
    })
    setStatus(RequirementsStatus.Unknown)
  }

  const closePrivacyPolicy = () => {
    AppActions.close()
  }

  const openPrivacyPolicyContent = async () => {
    // TODO: Implement privacy policy window opening
  }

  const isForceUpdateRequired = async () => {
    console.log("Checking for force update...")
    // TODO: Implement force update check
    return false
  }

  const isUsbAccessRequired = async () => {
    console.log("Checking for USB access...")
    // TODO: Implement USB access check
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
      onClose={closePrivacyPolicy}
      onLinkClick={openPrivacyPolicyContent}
    />
    // TODO: Implement modals for force update and USB access
  )
}
