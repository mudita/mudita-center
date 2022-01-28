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
} from "Renderer/modules/settings/components/settings-ui.component"
import { AboutTestIds } from "Renderer/modules/settings/tabs/about/about.enum"
import {
  letterSpacing,
  backgroundColor,
} from "Renderer/styles/theming/theme-getters"
import styled from "styled-components"
import Text from "Renderer/components/core/text/text.component"
import { borderColor } from "Renderer/styles/theming/theme-getters"
import { AppUpdateNotAvailable } from "Renderer/wrappers/app-update-step-modal/app-update.modals"
import { flags, Feature } from "App/feature-flags"

const AvailableUpdate = styled(Text)`
  margin-top: 0.8rem;
  text-transform: none;
  display: inline-box;
  padding: 0.3rem 0.5rem;
  border-radius: 0.4rem;
  letter-spacing: ${letterSpacing("small")}rem;
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
      {flags.get(Feature.MCVersion) && (
        <VersionTableRow>
          <Data>
            <SettingsLabel displayStyle={TextDisplayStyle.BiggerText}>
              <FormattedMessage
                id="module.settings.aboutInstalledVersion"
                values={{ version: appCurrentVersion }}
              />
            </SettingsLabel>
          </Data>
          {appUpdateAvailable ? (
            <ActionContainer>
              <AvailableUpdate displayStyle={TextDisplayStyle.SmallFadedText}>
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
              <AvailableUpdate displayStyle={TextDisplayStyle.SmallFadedText}>
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
      )}
      <SettingsTableRow>
        <Data>
          <SettingsLabel displayStyle={TextDisplayStyle.BiggerText}>
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
      <SettingsTableRow>
        <Data>
          <SettingsLabel displayStyle={TextDisplayStyle.BiggerText}>
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
      <SettingsTableRow data-testid={AboutTestIds.TableRow}>
        <Data>
          <SettingsLabel displayStyle={TextDisplayStyle.BiggerText}>
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
  </>
)

export default AboutUI
