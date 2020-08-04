import React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled from "styled-components"
import {
  ActionsWrapper,
  DataWrapper,
  Message,
  Name,
  TableRow,
} from "Renderer/components/rest/messages/topics-table.component"
import { borderColor } from "Renderer/styles/theming/theme-getters"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { FormattedMessage } from "react-intl"
import { intl } from "Renderer/utils/intl"
import ButtonComponent from "App/renderer/components/core/button/button.component"
import { AppSettings } from "App/main/store/settings.interface"

const BackupTableRow = styled(TableRow)`
  grid-template-areas: "Checkbox Actions";
  grid-template-columns: 1fr 20rem;
  border-bottom: solid 0.1rem ${borderColor("list")};
`

const BackupDescriptionWrapper = styled.div`
  border-bottom: solid 0.1rem ${borderColor("list")};
`

const BackupDescription = styled(Text)`
  margin-left: 4rem;
  margin-bottom: 3.2rem;
`

const BackupWrapper = styled.section`
  padding-top: 3.2rem;
`

const BackupDataWrapper = styled(DataWrapper)`
  margin-left: 4rem;
`

const BackupActionsWrapper = styled(ActionsWrapper)`
  width: fit-content;
`
interface Props {
  backupLocation?: AppSettings["pureOsBackupLocation"]
  openDialog?: () => void
}

const BackupUI: FunctionComponent<Props> = ({ backupLocation, openDialog }) => (
  <BackupWrapper>
    <BackupDescriptionWrapper>
      <BackupDescription displayStyle={TextDisplayStyle.MediumFadedLightText}>
        <FormattedMessage id="view.name.settings.backup.description" />
      </BackupDescription>
    </BackupDescriptionWrapper>
    <BackupTableRow checkMode={false}>
      <BackupDataWrapper>
        <Name displayStyle={TextDisplayStyle.LargeText}>
          <FormattedMessage id="view.name.settings.backup.label" />
        </Name>
        <Message
          displayStyle={TextDisplayStyle.MediumFadedLightText}
          data-testid="backup-location"
        >
          {backupLocation}
        </Message>
      </BackupDataWrapper>
      <BackupActionsWrapper>
        <ButtonComponent
          onClick={openDialog}
          label={intl.formatMessage({
            id: "view.name.settings.backup.buttonLabel",
          })}
        />
      </BackupActionsWrapper>
    </BackupTableRow>
  </BackupWrapper>
)

export default BackupUI
