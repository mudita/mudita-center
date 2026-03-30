/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { LicenseComponentTestIds } from "settings/models"
import { LegalArticle } from "../settings/legal-ui.styled"
import { Typography } from "app-theme/ui"

interface Props {
  licenses: {
    packages: {
      name: string
      version: string
    }[]
    license: string
  }[]
}

export const License: FunctionComponent<Props> = ({ licenses }) => (
  <LegalArticle data-testid={LicenseComponentTestIds.Wrapper}>
    <Typography.H3 data-testid={LicenseComponentTestIds.Title}>
      Notice for Mudita Center
    </Typography.H3>
    <Typography.P3>
      Please note that we provide an open source software notice with this app.
      You can access this notice via app menu. The grant of license to open
      source software is separate from grant of license by Mudita governed by
      the Terms of Service.
    </Typography.P3>
    <Typography.P3>WARRANTY DISCLAIMER</Typography.P3>
    <Typography.P3>
      THE OPEN SOURCE SOFTWARE IN THIS APP IS DISTRIBUTED IN THE HOPE THAT IT
      WILL BE USEFUL, WITHOUT ANY WARRANTY OR IMPLIED WARRANTY, MERCHANTABILITY
      OR FITNESS FOR ANY PARTICULAR PURPOSE. SEE THE LICENSE TEXTS BELOW FOR
      DETAILS.
    </Typography.P3>
    {licenses.map((license, index) => (
      <section key={index}>
        {license.packages.length > 1 ? (
          <Typography.P3>Notice for files:</Typography.P3>
        ) : (
          <Typography.P3>Notice for file:</Typography.P3>
        )}
        <Typography.P3>
          {license.packages.map((pkg, pkgIndex) => (
            <span key={pkgIndex}>
              &quot;{pkg.name}&quot;: &quot;{pkg.version}&quot;
            </span>
          ))}
        </Typography.P3>
        <Typography.P3>{license.license}</Typography.P3>
      </section>
    ))}
  </LegalArticle>
)
