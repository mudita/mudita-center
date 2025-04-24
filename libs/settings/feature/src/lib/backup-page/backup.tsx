/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import styled from "styled-components"
import { AppSettings } from "app-settings/renderer"

export const SettingsBackupPage: FunctionComponent = () => {
  const changeSettings = async () => {
    const settings = await AppSettings.get()
    AppSettings.set({
      user: {
        privacyPolicyAccepted: !settings.user.privacyPolicyAccepted,
      },
    })
  }

  return (
    <BackupWrapper>
      {/* <BackupTableRow>
        <BackupData>
          <SettingsLabel displayStyle={TextDisplayStyle.Paragraph1}>
            <FormattedMessage id="module.settings.backupLabel" />
          </SettingsLabel>
          <ElementWithTooltip
            showIfTextEllipsis
            Element={
              <Message
                displayStyle={TextDisplayStyle.Paragraph3}
                data-testid="backup-location"
                color="secondary"
              >
                {backupLocation}
              </Message>
            }
            place={ElementWithTooltipPlace.BottomRight}
          >
            <TextTooltip description={backupLocation} />
          </ElementWithTooltip>
        </BackupData>
        <BackupActionsWrapper>
          <BackupButtonComponent
            onClick={openDialog}
            label={intl.formatMessage({
              id: "module.settings.backupButtonLabel",
            })}
            data-testid={SettingsBackupTestIds.ChangeLocationButton}
          />
        </BackupActionsWrapper>
      </BackupTableRow> */}
      <h1>Settings Backup Page</h1>
      <p>This is the backup page for the settings module.</p>
      <button onClick={changeSettings}>Change Settings</button>
    </BackupWrapper>
  )
}
