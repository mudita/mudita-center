/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import styled from "styled-components"
import {
  ActionsWrapper,
  DataWrapper,
  Message,
  Name,
  TableRow,
} from "Renderer/components/rest/messages/threads-table.component"
import { borderColor } from "Renderer/styles/theming/theme-getters"
import { TextDisplayStyle } from "Renderer/components/core/text/text.component"
import { FormattedMessage } from "react-intl"
import { intl } from "Renderer/utils/intl"
import ButtonComponent from "App/renderer/components/core/button/button.component"
import { AppSettings } from "App/main/store/settings.interface"

const BackupTableRow = styled(TableRow)`
  grid-template-areas: "Checkbox Actions";
  grid-template-columns: 1fr 20rem;
  border-bottom: solid 0.1rem ${borderColor("list")};
`

const BackupWrapper = styled.section``

const BackupDataWrapper = styled(DataWrapper)`
  margin-left: 4rem;
`

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
    <BackupTableRow checkMode={false}>
      <BackupDataWrapper>
        <Name displayStyle={TextDisplayStyle.LargeText}>
          <FormattedMessage id="module.settings.backupLabel" />
        </Name>
        <Message
          displayStyle={TextDisplayStyle.MediumFadedLightText}
          data-testid="backup-location"
        >
          {backupLocation}
        </Message>
      </BackupDataWrapper>
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
