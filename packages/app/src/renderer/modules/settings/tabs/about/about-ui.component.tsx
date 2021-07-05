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
  SettingsDescription,
  SettingsDescriptionWrapper,
  SettingsLabel,
  SettingsTableRow,
  SettingsWrapper,
} from "Renderer/components/rest/settings/settings-ui.component"
import { AboutTestIds } from "./about.enum"

interface AboutProps {
  openLicense: () => void
}

const AboutUI: FunctionComponent<AboutProps> = ({ openLicense }) => (
  <SettingsWrapper data-testid={AboutTestIds.Wrapper}>
    <SettingsDescriptionWrapper data-testid={AboutTestIds.Description}>
      <SettingsDescription displayStyle={TextDisplayStyle.MediumFadedLightText}>
        <FormattedMessage id="module.settings.aboutDescription" />
      </SettingsDescription>
    </SettingsDescriptionWrapper>
    <SettingsTableRow checkMode={false} data-testid={AboutTestIds.TableRow}>
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
          onClick={openLicense}
        />
      </ActionsWrapper>
    </SettingsTableRow>
  </SettingsWrapper>
)

export default AboutUI
