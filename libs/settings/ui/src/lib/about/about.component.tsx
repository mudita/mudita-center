/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import styled from "styled-components"
import {
  Data,
  SettingsActionsWrapper,
  SettingsLabel,
  SettingsTableRow,
  SettingsWrapper,
} from "../settings/settings-ui.styled"
import { SettingsTestId } from "settings/models"
import { FormattedMessage } from "react-intl"
import { LegacyButtonDisplayStyle, TextDisplayStyle } from "app-theme/models"
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

const AboutUpdateButton = styled(LegacyButton)`
  min-width: 17.6rem;
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
  appUpdateNotAvailableShow?: boolean
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
  appUpdateNotAvailableShow = false,
  appUpdateAvailable,
  onAppUpdateAvailableCheck,
  hideAppUpdateNotAvailable,
  checkingForUpdate,
}) => {
  // const { checkingForUpdateFailed } = useSelector(
  //   (state: ReduxRootState) => state.settings
  // )
  const checkingForUpdateFailed = false

  // const { appUpdateFlowShow } = useSelector(
  //   (state: ReduxRootState) => state.modalsManager
  // )
  const appUpdateFlowShow = false

  const appUpdateAvailableCheckHandler = () => {
    console.log("appUpdateAvailableCheckHandler")
    // dispatch(setCheckingForUpdateFailed(false))
    // setUpdateCheck(true)
    // onAppUpdateAvailableCheck()
  }

  const handleProcessDownload = () => {
    console.log("handleProcessDownload")
    // void dispatch(showModal(ModalStateKey.AppUpdateFlow))
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
            <AboutUpdateButton
              displayStyle={LegacyButtonDisplayStyle.Primary}
              // updating={checkingForUpdate}
              label={formatMessage(
                appUpdateAvailable
                  ? messages.updateAvailableButton
                  : messages.updateCheckButton
              )}
              data-testid={SettingsTestId.AboutUpdateButton}
              onClick={
                appUpdateAvailable
                  ? handleProcessDownload
                  : appUpdateAvailableCheckHandler
              }
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
