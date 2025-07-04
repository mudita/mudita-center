/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import styled, { css } from "styled-components"
import {
  Data,
  SettingsActionsWrapper,
  SettingsLabel,
  SettingsTableRow,
  SettingsWrapper,
} from "../settings/settings-ui.styled"
import { SettingsTestId } from "settings/models"
import { FormattedMessage } from "react-intl"
import {
  ButtonSize,
  ButtonTextModifier,
  ButtonType,
  LegacyButtonDisplayStyle,
  TextDisplayStyle,
} from "app-theme/models"
import { defineMessages, formatMessage } from "app-localize/utils"
import { Button, LegacyButton, LegacyText } from "app-theme/ui"
import { backgroundColor, borderColor, borderRadius } from "app-theme/utils"
import { AppLegalPaths } from "app-routing/models"

const AboutVersionTableRow = styled.div`
  border-bottom: solid 0.1rem ${borderColor("list")};
  height: 7.2rem;
  max-height: 7.2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const AboutActionContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-right: 3.2rem;
`

const AboutAvailableUpdate = styled(LegacyText)`
  margin-top: 0.8rem;
  display: inline-box;
  padding: 0.3rem 0.5rem;
  border-radius: ${borderRadius("medium")};
  background-color: ${backgroundColor("minor")};
  margin-right: 1.6rem;
`

const rotateAnimation = css`
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  animation: rotate 1s infinite ease-in-out;
`

const AboutUpdateButtonStyled = styled(LegacyButton)<{ $updating?: boolean }>`
  min-width: 17.6rem;
  display: flex;
  width: auto;

  svg {
    ${({ $updating }) => $updating && rotateAnimation}
  }
`

const messages = defineMessages({
  installedVersion: {
    id: "page.settingsAbout.installedVersion",
  },
  termsOfServiceLabel: {
    id: "page.settingsAbout.termsOfService",
  },
  privacyPolicyLabel: {
    id: "page.settingsAbout.privacyPolicy",
  },
  licenseLabel: {
    id: "page.settingsAbout.license",
  },
  learnMoreButton: {
    id: "page.settingsAbout.learnMore",
  },
  updateCheckButton: {
    id: "page.settingsAbout.systemCheckForUpdates",
  },
  updateAvailableButton: {
    id: "page.settingsAbout.appUpdateAction",
  },
  updateAvailableBadge: {
    id: "page.settingsAbout.availableVersion",
  },
  updateFailedBadge: {
    id: "page.settingsAbout.systemUpdateCheckFailed",
  },
  upToDateBadge: {
    id: "page.settingsAbout.systemUpdateUpToDate",
  },
})

interface AboutProps {
  appLatestVersion?: string
  appCurrentVersion?: string
  appUpdateAvailable?: boolean
  onAppUpdateAvailableCheck: () => void
  onProcessDownload: () => void
}

export const About: FunctionComponent<AboutProps> = ({
  appLatestVersion = "",
  appCurrentVersion,
  appUpdateAvailable,
  onAppUpdateAvailableCheck,
  onProcessDownload,
}) => {
  const appUpdateFlowShow = false

  const badgeText = appUpdateAvailable
    ? messages.updateAvailableBadge
    : messages.upToDateBadge

  return (
    <>
      <SettingsWrapper data-testid={SettingsTestId.AboutWrapper}>
        <AboutVersionTableRow>
          <Data>
            <SettingsLabel displayStyle={TextDisplayStyle.Paragraph1}>
              <FormattedMessage
                id={messages.installedVersion.id}
                values={{ version: appCurrentVersion }}
              />
            </SettingsLabel>
          </Data>
          <AboutActionContainer>
            <AboutAvailableUpdate
              displayStyle={TextDisplayStyle.Label}
              color="secondary"
            >
              {!appUpdateFlowShow && (
                <FormattedMessage
                  {...badgeText}
                  values={{ version: appLatestVersion }}
                />
              )}
            </AboutAvailableUpdate>
            <AboutUpdateButtonStyled
              displayStyle={LegacyButtonDisplayStyle.Primary}
              label={formatMessage(
                appUpdateAvailable
                  ? messages.updateAvailableButton
                  : messages.updateCheckButton
              )}
              onClick={
                appUpdateAvailable
                  ? onProcessDownload
                  : onAppUpdateAvailableCheck
              }
              data-testid={SettingsTestId.AboutUpdateButton}
            />
          </AboutActionContainer>
        </AboutVersionTableRow>
        <SettingsTableRow>
          <Data>
            <SettingsLabel displayStyle={TextDisplayStyle.Paragraph1}>
              <FormattedMessage id={messages.termsOfServiceLabel.id} />
            </SettingsLabel>
          </Data>
          <SettingsActionsWrapper>
            <Button
              to={AppLegalPaths.TermsOfService}
              target="appWindow"
              size={ButtonSize.AutoMin}
              data-testid={SettingsTestId.AboutTermsOfServiceButton}
              type={ButtonType.Text}
              modifiers={[
                ButtonTextModifier.Link,
                ButtonTextModifier.HoverBackground,
              ]}
              message={messages.learnMoreButton.id}
            />
          </SettingsActionsWrapper>
        </SettingsTableRow>
        <SettingsTableRow>
          <Data>
            <SettingsLabel displayStyle={TextDisplayStyle.Paragraph1}>
              <FormattedMessage id={messages.privacyPolicyLabel.id} />
            </SettingsLabel>
          </Data>
          <SettingsActionsWrapper>
            <Button
              to={AppLegalPaths.PrivacyPolicy}
              target="appWindow"
              size={ButtonSize.AutoMin}
              data-testid={SettingsTestId.AboutPrivacyPolicyButton}
              type={ButtonType.Text}
              modifiers={[
                ButtonTextModifier.Link,
                ButtonTextModifier.HoverBackground,
              ]}
              message={messages.learnMoreButton.id}
            />
          </SettingsActionsWrapper>
        </SettingsTableRow>
        <SettingsTableRow data-testid={SettingsTestId.AboutTableRow}>
          <Data>
            <SettingsLabel displayStyle={TextDisplayStyle.Paragraph1}>
              <FormattedMessage id={messages.licenseLabel.id} />
            </SettingsLabel>
          </Data>
          <SettingsActionsWrapper>
            <Button
              to={AppLegalPaths.License}
              target="appWindow"
              size={ButtonSize.AutoMin}
              data-testid={SettingsTestId.AboutLicenseButton}
              type={ButtonType.Text}
              modifiers={[
                ButtonTextModifier.Link,
                ButtonTextModifier.HoverBackground,
              ]}
              message={messages.learnMoreButton.id}
            />
          </SettingsActionsWrapper>
        </SettingsTableRow>
      </SettingsWrapper>
    </>
  )
}
