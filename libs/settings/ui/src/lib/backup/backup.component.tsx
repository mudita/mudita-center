/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import styled from "styled-components"
import { SettingsData, SettingsTestId } from "settings/models"
import {
  Data,
  SettingsTableRow,
  SettingsLabel,
  SettingsActionsWrapper,
} from "../settings/settings-ui.styled"
import { TextDisplayStyle } from "app-theme/models"
import { borderColor, backgroundColor, borderRadius } from "app-theme/utils"
import { FormattedMessage } from "react-intl"
import {
  ElementWithTooltipPlace,
  LegacyButton,
  LegacyElementWithTooltip,
  LegacyText,
} from "app-theme/ui"
import { defineMessages, formatMessage } from "app-localize/utils"

const BackupWrapper = styled.section`
  overflow: hidden;
  display: flex;
  flex: 1;
`

const BackupTableRow = styled(SettingsTableRow)`
  grid-template-areas: "Checkbox Actions";
  grid-template-columns: 1fr 20rem;
  border-bottom: solid 0.1rem ${borderColor("list")};
  width: 100%;
`

const BackupData = styled(Data)`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-template-areas:
    "Label"
    "Message";
`

const BackupLocationLabel = styled(LegacyText)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0 3.2rem;
  grid-area: Message;
`

const BackupActionsWrapper = styled(SettingsActionsWrapper)`
  width: fit-content;
`

const BackupButtonComponent = styled(LegacyButton)`
  padding: 0;
`

const TooltipText = styled.div`
  width: 80%;
  background-color: ${backgroundColor("disabled")};
  padding: 0.4rem 0.8rem;
  border-radius: ${borderRadius("medium")};
  word-break: break-word;
`

interface BackupProps {
  backupLocation: SettingsData["osBackupLocation"]
  openDialog?: () => void
}

const messages = defineMessages({
  label: {
    id: "page.settingsBackup.label",
  },
  buttonLabel: {
    id: "page.settingsBackup.buttonLabel",
  },
})

export const Backup: FunctionComponent<BackupProps> = ({
  backupLocation,
  openDialog,
}) => {
  return (
    <BackupWrapper>
      <BackupTableRow>
        <BackupData>
          <SettingsLabel displayStyle={TextDisplayStyle.Paragraph1}>
            <FormattedMessage id={messages.label.id} />
          </SettingsLabel>
          <LegacyElementWithTooltip
            showIfTextEllipsis
            Element={
              <BackupLocationLabel
                displayStyle={TextDisplayStyle.Paragraph3}
                data-testid="backup-location"
                color="secondary"
              >
                {backupLocation}
              </BackupLocationLabel>
            }
            place={ElementWithTooltipPlace.BottomStart}
          >
            <TooltipText>
              <LegacyText
                displayStyle={TextDisplayStyle.Label}
                color="primary"
                element={"p"}
                message={backupLocation}
              >
                {backupLocation}
              </LegacyText>
            </TooltipText>
          </LegacyElementWithTooltip>
        </BackupData>
        <BackupActionsWrapper>
          <BackupButtonComponent
            onClick={openDialog}
            label={formatMessage(messages.buttonLabel)}
            data-testid={SettingsTestId.ChangeBackupLocationButton}
          />
        </BackupActionsWrapper>
      </BackupTableRow>
    </BackupWrapper>
  )
}
