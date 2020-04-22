import React, { ChangeEvent, useEffect, useReducer, useState } from "react"

import FunctionComponent from "Renderer/types/function-component.interface"
import { Link } from "react-router-dom"
import { URL_ONBOARDING } from "Renderer/constants/urls"
import {
  getAppSettings,
  resetAppSettings,
} from "Renderer/requests/app-settings.request"
import InputCheckbox from "Renderer/components/core/input-checkbox/input-checkbox.component"
import { AppSettings } from "App/main/default-app-settings"
import { InputText } from "Renderer/components/core/input-text/input-text.elements"
import Location from "Renderer/components/core/location/location.component"
import ButtonComponent from "Renderer/components/core/button/button.component"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
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
import ButtonToggler, {
  ButtonTogglerItem,
} from "Renderer/components/core/button-toggler/button-toggler.component"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { FormattedMessage } from "react-intl"

const BackupTableRow = styled(TableRow)`
  grid-template-areas: "Checkbox Actions";
  grid-template-columns: 1fr 15rem;
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
// DO NOT REVIEW THIS CODE, IT'S FOR TESTING PURPOSES ONLY
const Backup: FunctionComponent = () => {
  // const [settings, setSettings] = useState<AppSettings>()
  // const [ignored, forceUpdate] = useReducer(x => x + 1, 0)
  //
  // useEffect(() => {
  //   ;(async () => {
  //     setSettings(await getAppSettings())
  //   })()
  // }, [ignored])
  //
  // const toggleAutostart = async (event: ChangeEvent<HTMLInputElement>) => {
  //   if (settings) {
  //     setSettings({ ...settings, appAutostart: event.target.checked })
  //   }
  // }
  //
  // const changeBackupLocation = (event: ChangeEvent<HTMLInputElement>) => {
  //   if (settings) {
  //     setSettings({ ...settings, pureOsBackupLocation: event.target.value })
  //   }
  // }
  //
  // const changeDownloadLocation = (event: ChangeEvent<HTMLInputElement>) => {
  //   if (settings) {
  //     setSettings({ ...settings, pureOsDownloadLocation: event.target.value })
  //   }
  // }
  //
  // const reset = async () => {
  //   await resetAppSettings()
  //   forceUpdate()
  // }

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
            lala
          </Message>
        </BackupDataWrapper>
        <ActionsWrapper>
          <Location locationToUpdate={LocationPath.PureOsDownload}>
            <ButtonComponent
              labelMessage={{ id: "view.name.settings.backup.buttonLabel" }}
            />
          </Location>
        </ActionsWrapper>
      </BackupTableRow>
    </BackupWrapper>
  )
}

export default Backup
