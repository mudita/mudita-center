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
} from "../settings/settings-ui.styled"
import { TextDisplayStyle } from "app-theme/models"
import { borderColor } from "app-theme/utils"
import { FormattedMessage } from "react-intl"
import { LegacyButton } from "app-theme/ui"
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

const BackupActionsWrapper = styled.div`
  grid-area: Actions;
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
`

const BackupButtonComponent = styled(LegacyButton)`
  padding: 0;
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
          {/* <ElementWithTooltip
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
          </ElementWithTooltip> */}
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
