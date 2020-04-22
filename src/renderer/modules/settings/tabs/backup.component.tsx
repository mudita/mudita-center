import React, { useEffect, useState } from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import { getAppSettings } from "Renderer/requests/app-settings.request"
import { AppSettings } from "App/main/default-app-settings"
import Location from "Renderer/components/core/location/location.component"
import ButtonComponent from "Renderer/components/core/button/button.component"
import { LocationPath } from "Renderer/components/core/location/location.enum"
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
import { Size } from "Renderer/components/core/button/button.config"

const BackupTableRow = styled(TableRow)`
  grid-template-areas: "Checkbox Actions";
  grid-template-columns: 1fr 20rem;
  border-bottom: solid 0.2rem ${borderColor("listItem")};
`

const BackupDescriptionWrapper = styled.div`
  border-bottom: solid 0.2rem ${borderColor("listItem")};
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
// DO NOT REVIEW THIS CODE, IT'S FOR TESTING PURPOSES ONLY
const Backup: FunctionComponent = () => {
  const [settings, setSettings] = useState<AppSettings>()
  useEffect(() => {
    ;(async () => {
      setSettings(await getAppSettings())
    })()
  }, [])
  return (
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
          <Message displayStyle={TextDisplayStyle.MediumFadedLightText}>
            {settings?.pureOsBackupLocation}
          </Message>
        </BackupDataWrapper>
        <BackupActionsWrapper>
          <Location locationToUpdate={LocationPath.PureOsDownload}>
            <ButtonComponent
              labelMessage={{ id: "view.name.settings.backup.buttonLabel" }}
              size={Size.FixedBig}
            />
          </Location>
        </BackupActionsWrapper>
      </BackupTableRow>
    </BackupWrapper>
  )
}

export default Backup
