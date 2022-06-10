/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { ActionsWrapper } from "App/__deprecated__/renderer/components/rest/messages/threads-table.component"
import { TextDisplayStyle } from "App/__deprecated__/renderer/components/core/text/text.component"
import { FormattedMessage } from "react-intl"
import ButtonComponent from "App/__deprecated__/renderer/components/core/button/button.component"
import { DisplayStyle } from "App/__deprecated__/renderer/components/core/button/button.config"
import {
  Data,
  SettingsLabel,
  SettingsTableRow,
  SettingsWrapper,
} from "App/__deprecated__/renderer/modules/settings/components/settings-ui.component"
import { AboutTestIds } from "App/__deprecated__/renderer/modules/settings/tabs/about/about.enum"
import {
  backgroundColor,
  borderRadius,
} from "App/__deprecated__/renderer/styles/theming/theme-getters"
import styled from "styled-components"
import Text from "App/__deprecated__/renderer/components/core/text/text.component"
import { borderColor } from "App/__deprecated__/renderer/styles/theming/theme-getters"
import { AppUpdateNotAvailable } from "App/__deprecated__/renderer/wrappers/app-update-step-modal/app-update.modals"

const AvailableUpdate = styled(Text)`
  margin-top: 0.8rem;
  display: inline-box;
  padding: 0.3rem 0.5rem;
  border-radius: ${borderRadius("medium")};
  background-color: ${backgroundColor("minor")};
  margin-right: 1.6rem;
`

const VersionTableRow = styled.div`
  border-bottom: solid 0.1rem ${borderColor("list")};
  height: 7.2rem;
  max-height: 7.2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const ActionContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-right: 3rem;
`

interface Props {
  openLicense: () => void
  openTermsOfService: () => void
  openPrivacyPolicy: () => void
  appLatestVersion?: string
  appCurrentVersion?: string
  appUpdateAvailable?: boolean
  appUpdateNotAvailableShow?: boolean
  onAppUpdateAvailableCheck: () => void
  hideAppUpdateNotAvailable: () => void
}

const AboutUI: FunctionComponent<Props> = ({
  openLicense,
  openTermsOfService,
  openPrivacyPolicy,
  appLatestVersion = "",
  appCurrentVersion,
  appUpdateNotAvailableShow = false,
  appUpdateAvailable,
  onAppUpdateAvailableCheck,
  hideAppUpdateNotAvailable,
}) => (
  <>
    <AppUpdateNotAvailable
      appCurrentVersion={appCurrentVersion}
      open={appUpdateNotAvailableShow}
      closeModal={hideAppUpdateNotAvailable}
    />
    <SettingsWrapper data-testid={AboutTestIds.Wrapper}>
      <VersionTableRow>
        <Data>
          <SettingsLabel displayStyle={TextDisplayStyle.Paragraph1}>
            <FormattedMessage
              id="module.settings.aboutInstalledVersion"
              values={{ version: appCurrentVersion }}
            />
          </SettingsLabel>
        </Data>
        {appUpdateAvailable ? (
          <ActionContainer>
            <AvailableUpdate
              displayStyle={TextDisplayStyle.Label}
              color="secondary"
            >
              <FormattedMessage
                id="module.settings.aboutAvailableVersion"
                values={{ version: appLatestVersion }}
              />
            </AvailableUpdate>
            <ButtonComponent
              labelMessage={{
                id: "module.settings.aboutAppUpdateAction",
              }}
              onClick={onAppUpdateAvailableCheck}
              data-testid={AboutTestIds.UpdateButton}
            />
          </ActionContainer>
        ) : (
          <ActionContainer>
            <AvailableUpdate
              displayStyle={TextDisplayStyle.Label}
              color="secondary"
            >
              <FormattedMessage id="module.overview.systemUpdateUpToDate" />
            </AvailableUpdate>
            <ButtonComponent
              labelMessage={{
                id: "module.overview.systemCheckForUpdates",
              }}
              data-testid={AboutTestIds.UpdateButton}
              onClick={onAppUpdateAvailableCheck}
            />
          </ActionContainer>
        )}
      </VersionTableRow>
      <SettingsTableRow>
        <Data>
          <SettingsLabel displayStyle={TextDisplayStyle.Paragraph1}>
            <FormattedMessage id="module.settings.aboutTermsOfService" />
          </SettingsLabel>
        </Data>
        <ActionsWrapper>
          <ButtonComponent
            data-testid={AboutTestIds.TermsOfServiceButton}
            displayStyle={DisplayStyle.ActionLink}
            labelMessage={{
              id: "module.settings.aboutLearnMore",
            }}
            onClick={openTermsOfService}
          />
        </ActionsWrapper>
      </SettingsTableRow>
      <SettingsTableRow>
        <Data>
          <SettingsLabel displayStyle={TextDisplayStyle.Paragraph1}>
            <FormattedMessage id="module.settings.aboutPrivacyPolicy" />
          </SettingsLabel>
        </Data>
        <ActionsWrapper>
          <ButtonComponent
            data-testid={AboutTestIds.PrivacyPolicyButton}
            displayStyle={DisplayStyle.ActionLink}
            labelMessage={{
              id: "module.settings.aboutLearnMore",
            }}
            onClick={openPrivacyPolicy}
          />
        </ActionsWrapper>
      </SettingsTableRow>
      <SettingsTableRow data-testid={AboutTestIds.TableRow}>
        <Data>
          <SettingsLabel displayStyle={TextDisplayStyle.Paragraph1}>
            <FormattedMessage id="module.settings.aboutLicense" />
          </SettingsLabel>
        </Data>
        <ActionsWrapper>
          <ButtonComponent
            data-testid={AboutTestIds.LicenseButton} 
            displayStyle={DisplayStyle.ActionLink}
            labelMessage={{
              id: "module.settings.aboutLearnMore",
            }}
            onClick={openLicense}
          />
        </ActionsWrapper>
      </SettingsTableRow>
    </SettingsWrapper>
  </>
)

export default AboutUI
