/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled, { css } from "styled-components"
import {
  Data,
  SettingsActionsWrapper,
  SettingsLabel,
  SettingsTableRow,
  SettingsWrapper,
} from "../settings/settings-ui.styled"
import {
  setCheckingForUpdate,
  setCheckingForUpdateFailed,
} from "settings/feature"
import { AppUpdater } from "app-utils/renderer"
import { SettingsTestId } from "settings/models"
import { selectCheckingForUpdateFailed } from "settings/feature"
import { FormattedMessage } from "react-intl"
import {
  LegacyIconType,
  LegacyButtonDisplayStyle,
  TextDisplayStyle,
} from "app-theme/models"
import { defineMessages, formatMessage } from "app-localize/utils"
import { LegacyButton, LegacyText } from "app-theme/ui"
import { backgroundColor, borderColor, borderRadius } from "app-theme/utils"

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
  margin-right: 3rem;
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
  openLicense: () => void
  openTermsOfService: () => void
  openPrivacyPolicy: () => void
  appLatestVersion?: string
  appCurrentVersion?: string
  appUpdateAvailable?: boolean
  onAppUpdateAvailableCheck: () => void
  hideAppUpdateNotAvailable: () => void
  checkingForUpdate: boolean
}

export const About: FunctionComponent<AboutProps> = ({
  openLicense,
  openTermsOfService,
  openPrivacyPolicy,
  appLatestVersion = "",
  appCurrentVersion,
  appUpdateAvailable,
  onAppUpdateAvailableCheck,
  hideAppUpdateNotAvailable,
  checkingForUpdate,
}) => {
  const dispatch = useDispatch()

  const checkingForUpdateFailed = useSelector(selectCheckingForUpdateFailed)
  const appUpdateFlowShow = false

  const appUpdateAvailableCheckHandler = () => {
    dispatch(setCheckingForUpdate(true))
    dispatch(setCheckingForUpdateFailed(false))
    void AppUpdater.checkForUpdates()
  }

  const handleProcessDownload = () => {
    void AppUpdater.downloadUpdate()
  }

  const badgeText = appUpdateAvailable
    ? messages.updateAvailableBadge
    : checkingForUpdateFailed
      ? messages.updateFailedBadge
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
              {!checkingForUpdate && !appUpdateFlowShow && (
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
              Icon={checkingForUpdate ? LegacyIconType.Refresh : undefined}
              onClick={
                appUpdateAvailable
                  ? handleProcessDownload
                  : appUpdateAvailableCheckHandler
              }
              disabled={checkingForUpdate}
              $updating={checkingForUpdate}
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
            <LegacyButton
              data-testid={SettingsTestId.AboutTermsOfServiceButton}
              displayStyle={LegacyButtonDisplayStyle.ActionLink}
              labelMessage={{
                id: messages.learnMoreButton.id,
              }}
              onClick={openTermsOfService}
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
            <LegacyButton
              data-testid={SettingsTestId.AboutPrivacyPolicyButton}
              displayStyle={LegacyButtonDisplayStyle.ActionLink}
              labelMessage={{
                id: messages.learnMoreButton.id,
              }}
              onClick={openPrivacyPolicy}
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
            <LegacyButton
              data-testid={SettingsTestId.AboutLicenseButton}
              displayStyle={LegacyButtonDisplayStyle.ActionLink}
              labelMessage={{
                id: messages.learnMoreButton.id,
              }}
              onClick={openLicense}
            />
          </SettingsActionsWrapper>
        </SettingsTableRow>
      </SettingsWrapper>
    </>
  )
}
