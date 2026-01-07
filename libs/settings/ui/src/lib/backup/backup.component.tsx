/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, useSyncExternalStore } from "react"
import styled from "styled-components"
import { SettingsData, SettingsTestId } from "settings/models"
import {
  Data,
  SettingsActionsWrapper,
  SettingsLabel,
  SettingsTableRow,
} from "../settings/settings-ui.styled"
import { ButtonSize, TextDisplayStyle } from "app-theme/models"
import { borderColor } from "app-theme/utils"
import { FormattedMessage } from "react-intl"
import { Button, LegacyText, Tooltip, Typography } from "app-theme/ui"
import { defineMessages } from "app-localize/utils"

const BackupWrapper = styled.section`
  overflow: hidden;
  display: flex;
  flex: 1;
`

const BackupTableRow = styled(SettingsTableRow)`
  grid-template-areas: "Checkbox Actions";
  grid-template-columns: 1fr 20.8rem;
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
  cursor: text;
`

const BackupActionsWrapper = styled(SettingsActionsWrapper)`
  width: fit-content;
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

const backupLocationTooltipSubscriber = (callback: () => void) => {
  window.addEventListener("resize", callback)
  return () => window.removeEventListener("resize", callback)
}

const backupLocationTooltipSnapshotGetter = () => {
  const element = document.querySelector(
    '[data-testid="backup-location"]'
  ) as HTMLElement
  if (!element) {
    return false
  }
  return element.offsetWidth < element.scrollWidth
}

export const Backup: FunctionComponent<BackupProps> = ({
  backupLocation,
  openDialog,
}) => {
  const showBackupLocationTooltip = useSyncExternalStore(
    backupLocationTooltipSubscriber,
    backupLocationTooltipSnapshotGetter
  )

  return (
    <BackupWrapper>
      <BackupTableRow>
        <BackupData>
          <SettingsLabel displayStyle={TextDisplayStyle.Paragraph1}>
            <FormattedMessage id={messages.label.id} />
          </SettingsLabel>
          <Tooltip
            offset={{
              x: 32,
              y: 8,
            }}
          >
            <Tooltip.Anchor>
              <BackupLocationLabel
                displayStyle={TextDisplayStyle.Paragraph3}
                data-testid="backup-location"
                color="secondary"
              >
                {backupLocation}
              </BackupLocationLabel>
            </Tooltip.Anchor>
            {showBackupLocationTooltip && (
              <Tooltip.Content>
                <Typography.P5 color={"black"}>{backupLocation}</Typography.P5>
              </Tooltip.Content>
            )}
          </Tooltip>
        </BackupData>
        <BackupActionsWrapper>
          <Button
            onClick={openDialog}
            size={ButtonSize.Large}
            message={messages.buttonLabel.id}
            data-testid={SettingsTestId.ChangeBackupLocationButton}
          />
        </BackupActionsWrapper>
      </BackupTableRow>
    </BackupWrapper>
  )
}
