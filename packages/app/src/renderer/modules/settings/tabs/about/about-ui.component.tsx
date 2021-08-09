/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { ActionsWrapper } from "Renderer/components/rest/messages/threads-table.component"
import { TextDisplayStyle } from "Renderer/components/core/text/text.component"
import { FormattedMessage } from "react-intl"
import ButtonComponent from "App/renderer/components/core/button/button.component"
import { DisplayStyle } from "App/renderer/components/core/button/button.config"
import {
  Data,
  SettingsLabel,
  SettingsTableRow,
  SettingsWrapper,
} from "Renderer/components/rest/settings/settings-ui.component"
import { AboutTestIds } from "Renderer/modules/settings/tabs/about/about.enum"

interface AboutProps {
  openLicense: () => void
  openTermsOfService: () => void
  openPrivacyPolicy: () => void
}

const AboutUI: FunctionComponent<AboutProps> = ({ openLicense, openTermsOfService, openPrivacyPolicy }) => (
  <SettingsWrapper data-testid={AboutTestIds.Wrapper}>
    <SettingsTableRow checkMode={false} >
      <Data>
        <SettingsLabel displayStyle={TextDisplayStyle.LargeText}>
          <FormattedMessage id="module.settings.aboutTermsOfService" />
        </SettingsLabel>
      </Data>
      <ActionsWrapper>
        <ButtonComponent
          displayStyle={DisplayStyle.Link3}
          labelMessage={{
            id: "module.settings.aboutLearnMore",
          }}
          onClick={openTermsOfService}
        />
      </ActionsWrapper>
    </SettingsTableRow>
    <SettingsTableRow checkMode={false}>
      <Data>
        <SettingsLabel displayStyle={TextDisplayStyle.LargeText}>
          <FormattedMessage id="module.settings.aboutPrivacyPolicy" />
        </SettingsLabel>
      </Data>
      <ActionsWrapper>
        <ButtonComponent
          displayStyle={DisplayStyle.Link3}
          labelMessage={{
            id: "module.settings.aboutLearnMore",
          }}
          onClick={openPrivacyPolicy}
        />
      </ActionsWrapper>
    </SettingsTableRow>
    <SettingsTableRow checkMode={false} data-testid={AboutTestIds.TableRow}>
      <Data>
        <SettingsLabel displayStyle={TextDisplayStyle.LargeText}>
          <FormattedMessage id="module.settings.aboutLicense" />
        </SettingsLabel>
      </Data>
      <ActionsWrapper>
        <ButtonComponent
          displayStyle={DisplayStyle.Link3}
          labelMessage={{
            id: "module.settings.aboutLearnMore",
          }}
          onClick={openLicense}
        />
      </ActionsWrapper>
    </SettingsTableRow>
  </SettingsWrapper>
)

export default AboutUI
