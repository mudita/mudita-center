/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { Mode } from "Core/__deprecated__/common/enums/mode.enum"
import ErrorApp from "Core/core/components/apps/error-app.component"
import LicenseApp from "Core/core/components/apps/license-app.component"
import TermsOfServiceApp from "Core/core/components/apps/terms-of-service-app.component"
import PrivacyPolicyApp from "Core/core/components/apps/privacy-policy-app.component"
import SarApp from "Core/core/components/apps/sar-app.component"
import BaseAppContainer from "Core/core/components/apps/base-app/base-app-container.component"
import { useDevConsoleMock } from "shared/utils"

const AppsSwitch = () => {
  useDevConsoleMock()
  const mode = new URLSearchParams(window.location.search).get("mode")

  switch (mode) {
    case Mode.ServerError:
      return <ErrorApp />
    case Mode.License:
      return <LicenseApp />
    case Mode.TermsOfService:
      return <TermsOfServiceApp />
    case Mode.PrivacyPolicy:
      return <PrivacyPolicyApp />
    case Mode.Sar:
      return <SarApp />
    default:
      return <BaseAppContainer />
  }
}
export default AppsSwitch
