/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum AppLegalPaths {
  TermsOfService = "/legal/terms-of-service",
  PrivacyPolicy = "/legal/privacy-policy",
  License = "/legal/license",
}

export const AppLegalPathsTitles: Record<AppLegalPaths, string> = {
  [AppLegalPaths.TermsOfService]: "Mudita Center - Terms of Service",
  [AppLegalPaths.PrivacyPolicy]: "Mudita Center - Privacy Policy",
  [AppLegalPaths.License]: "Mudita Center - License Agreement",
}
