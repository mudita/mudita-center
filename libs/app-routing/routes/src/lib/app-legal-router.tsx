/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { LegalLayout } from "app-routing/feature"
import { Route } from "react-router"
import {
  LicensePage,
  PrivacyPolicyPage,
  TermsOfServicePage,
} from "settings/feature"
import { AppLegalPaths } from "app-routing/models"

export const useAppLegalRouter = () => {
  return (
    <Route element={<LegalLayout />}>
      <Route
        path={AppLegalPaths.TermsOfService}
        element={<TermsOfServicePage />}
      />
      <Route
        path={AppLegalPaths.PrivacyPolicy}
        element={<PrivacyPolicyPage />}
      />
      <Route path={AppLegalPaths.License} element={<LicensePage />} />
    </Route>
  )
}
