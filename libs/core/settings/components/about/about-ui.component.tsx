/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useState } from "react"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { ActionsWrapper } from "Core/__deprecated__/renderer/components/rest/messages/threads-table.component"
import { TextDisplayStyle } from "Core/__deprecated__/renderer/components/core/text/text.component"
import ButtonComponent from "Core/__deprecated__/renderer/components/core/button/button.component"
import { DisplayStyle } from "Core/__deprecated__/renderer/components/core/button/button.config"
import {
  Data,
  SettingsLabel,
  SettingsTableRow,
  SettingsWrapper,
} from "Core/settings/components/settings"
import { AboutTestIds } from "Core/settings/components/about/about.enum"
import {
  backgroundColor,
  borderRadius,
} from "Core/core/styles/theming/theme-getters"
import styled from "styled-components"
import Text from "Core/__deprecated__/renderer/components/core/text/text.component"
import { borderColor } from "Core/core/styles/theming/theme-getters"
import { AppUpdateNotAvailable } from "Core/__deprecated__/renderer/wrappers/app-update-step-modal/app-update.modals"
import { UpdateFailedModal } from "Core/settings/components/about/update-failed-modal.component"
import { AboutLoaderModal } from "Core/settings/components/about/about-loader.component"
import { ModalLayers } from "Core/modals-manager/constants/modal-layers.enum"
import { defineMessages, FormattedMessage } from "react-intl"
import UpdateButtonComponent from "Core/__deprecated__/renderer/components/rest/news/update-button/update-button.component"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { useDispatch, useSelector } from "react-redux"
import { ModalStateKey, showModal } from "Core/modals-manager"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { setCheckingForUpdateFailed } from "Core/settings/actions/base.action"

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
const StyledUpdateButton = styled(UpdateButtonComponent)`
  min-width: 17.6rem;
`

const messages = defineMessages({
  updateCheckButton: {
    id: "module.overview.systemCheckForUpdates",
  },
  updateAvailableButton: {
    id: "module.settings.aboutAppUpdateAction",
  },
  updateAvailableBadge: {
    id: "module.settings.aboutAvailableVersion",
  },
  updateFailedBadge: {
    id: "module.overview.systemUpdateCheckFailed",
  },
  upToDateBadge: {
    id: "module.overview.systemUpdateUpToDate",
  },
})

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
  checkingForUpdate: boolean
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
  checkingForUpdate,
}) => {
  const dispatch = useDispatch()
  const [updateCheck, setUpdateCheck] = useState(false)
  const { checkingForUpdateFailed } = useSelector(
    (state: ReduxRootState) => state.settings
  )
  const { appUpdateFlowShow } = useSelector(
    (state: ReduxRootState) => state.modalsManager
  )
  const appUpdateAvailableCheckHandler = () => {
    dispatch(setCheckingForUpdateFailed(false))
    setUpdateCheck(true)
    onAppUpdateAvailableCheck()
  }
  const hideAppUpdateNotAvailableHandler = () => {
    setUpdateCheck(false)
    hideAppUpdateNotAvailable()
  }
  const hideAppUpdateFailedHandler = () => {
    setUpdateCheck(false)
    hideAppUpdateNotAvailable()
  }

  const showUpToDateModal =
    !checkingForUpdateFailed && !checkingForUpdate && updateCheck

  const handleProcessDownload = () => {
    void dispatch(showModal(ModalStateKey.AppUpdateFlow))
  }

  const badgeText = appUpdateAvailable
    ? messages.updateAvailableBadge
    : checkingForUpdateFailed
    ? messages.updateFailedBadge
    : messages.upToDateBadge
  return (
    <>
      <UpdateFailedModal
        open={checkingForUpdateFailed && updateCheck && !appUpdateAvailable}
        closeModal={hideAppUpdateFailedHandler}
        layer={ModalLayers.UpdateApp}
      />
      <AboutLoaderModal
        open={checkingForUpdate}
        layer={ModalLayers.UpdateApp}
      />
      {showUpToDateModal && (
        <AppUpdateNotAvailable
          appCurrentVersion={appCurrentVersion}
          open={appUpdateNotAvailableShow && !checkingForUpdateFailed}
          closeModal={hideAppUpdateNotAvailableHandler}
          layer={ModalLayers.UpdateApp}
        />
      )}
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
          <ActionContainer>
            <AvailableUpdate
              displayStyle={TextDisplayStyle.Label}
              color="secondary"
            >
              {!checkingForUpdate && !appUpdateFlowShow && (
                <FormattedMessage
                  {...badgeText}
                  values={{ version: appLatestVersion }}
                />
              )}
            </AvailableUpdate>
            <StyledUpdateButton
              displayStyle={DisplayStyle.Primary}
              updating={checkingForUpdate}
              label={intl.formatMessage(
                appUpdateAvailable
                  ? messages.updateAvailableButton
                  : messages.updateCheckButton
              )}
              data-testid={AboutTestIds.UpdateButton}
              onClick={
                appUpdateAvailable
                  ? handleProcessDownload
                  : appUpdateAvailableCheckHandler
              }
            />
          </ActionContainer>
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
}

export default AboutUI
