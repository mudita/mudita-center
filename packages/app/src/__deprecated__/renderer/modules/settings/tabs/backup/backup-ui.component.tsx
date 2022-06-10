/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import styled from "styled-components"
import {
  ActionsWrapper,
  Message,
} from "App/__deprecated__/renderer/components/rest/messages/threads-table.component"
import { borderColor } from "App/__deprecated__/renderer/styles/theming/theme-getters"
import { TextDisplayStyle } from "App/__deprecated__/renderer/components/core/text/text.component"
import { FormattedMessage } from "react-intl"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import ButtonComponent from "App/__deprecated__/renderer/components/core/button/button.component"
import { AppSettings } from "App/__deprecated__/main/store/settings.interface"
import {
  Data,
  SettingsLabel,
  SettingsTableRow,
} from "App/__deprecated__/renderer/modules/settings/components/settings-ui.component"

const BackupTableRow = styled(SettingsTableRow)`
  grid-template-areas: "Checkbox Actions";
  grid-template-columns: 1fr 20rem;
  border-bottom: solid 0.1rem ${borderColor("list")};
`

const BackupWrapper = styled.section``

const BackupActionsWrapper = styled(ActionsWrapper)`
  width: fit-content;
`
const BackupButtonComponent = styled(ButtonComponent)`
  padding: 0;
`

interface Props {
  backupLocation?: AppSettings["pureOsBackupLocation"]
  openDialog?: () => void
}

const BackupUI: FunctionComponent<Props> = ({ backupLocation, openDialog }) => (
  <BackupWrapper>
    <BackupTableRow>
      <Data>
        <SettingsLabel displayStyle={TextDisplayStyle.Paragraph1}>
          <FormattedMessage id="module.settings.backupLabel" />
          <Message
            displayStyle={TextDisplayStyle.Paragraph3}
            data-testid="backup-location"
            color="secondary"
          >
            {backupLocation}
          </Message>
        </SettingsLabel>
      </Data>
      <BackupActionsWrapper>
        <BackupButtonComponent
          onClick={openDialog}
          label={intl.formatMessage({
            id: "module.settings.backupButtonLabel",
          })}
        />
      </BackupActionsWrapper>
    </BackupTableRow>
  </BackupWrapper>
)

export default BackupUI
