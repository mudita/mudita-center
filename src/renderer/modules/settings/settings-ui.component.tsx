import React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import {
  ActionsWrapper,
  Name,
  TableRow,
} from "Renderer/components/rest/messages/topics-table.component"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import styled from "styled-components"
import ButtonToggler, {
  ButtonTogglerItem,
} from "Renderer/components/core/button-toggler/button-toggler.component"
import { FormattedMessage } from "react-intl"
import { borderColor } from "Renderer/styles/theming/theme-getters"
import { twoStateToggler } from "Renderer/modules/settings/settings.component"

const SettingsTableRow = styled(TableRow)`
  grid-template-areas: "Checkbox Checkbox Actions Actions";
  grid-template-columns: 11rem 1fr 15rem;
  border-bottom: solid 0.2rem ${borderColor("listItem")};
`

const Data = styled.div`
  grid-area: Checkbox;
  align-self: center;
`

const SettingsLabel = styled(Name)`
  margin-left: 4rem;
`

const SettingsToggler = styled(ButtonToggler)`
  margin-right: 4rem;
`

const SettingsTogglerItem = styled(ButtonTogglerItem)`
  padding: 0 3.6rem;
  width: 75%;
`

const SettingsDescriptionWrapper = styled.div`
  border-bottom: solid 0.2rem ${borderColor("listItem")};
`

const SettingsDescription = styled(Text)`
  margin-left: 4rem;
  margin-bottom: 3.2rem;
`

const SettingsWrapper = styled.section`
  padding-top: 3.2rem;
`

interface Props {
  autostartStatus?: string
  tetheringStatus?: string
  setAutostartStatus: (label: string) => void
  setTetheringStatus: (label: string) => void
  togglerState: typeof twoStateToggler
}

const SettingsUI: FunctionComponent<Props> = ({
  autostartStatus,
  tetheringStatus,
  setAutostartStatus,
  setTetheringStatus,
  togglerState,
}) => {
  return (
    <SettingsWrapper>
      <SettingsDescriptionWrapper>
        <SettingsDescription
          displayStyle={TextDisplayStyle.MediumFadedLightText}
        >
          <FormattedMessage id="view.name.settings.backup.description" />
        </SettingsDescription>
      </SettingsDescriptionWrapper>
      <SettingsTableRow checkMode={false}>
        <Data>
          <SettingsLabel displayStyle={TextDisplayStyle.LargeText}>
            <FormattedMessage id="view.name.settings.backup.autostartLabel" />
          </SettingsLabel>
        </Data>
        <ActionsWrapper>
          <SettingsToggler filled>
            {togglerState.map(label => {
              const changeStatus = () => setAutostartStatus(label)
              return (
                <SettingsTogglerItem
                  key={label}
                  label={label}
                  onClick={changeStatus}
                  active={autostartStatus === label}
                />
              )
            })}
          </SettingsToggler>
        </ActionsWrapper>
      </SettingsTableRow>
      <SettingsTableRow checkMode={false}>
        <Data>
          <SettingsLabel displayStyle={TextDisplayStyle.LargeText}>
            <FormattedMessage id="view.name.settings.backup.tetheringLabel" />
          </SettingsLabel>
        </Data>
        <ActionsWrapper>
          <SettingsToggler filled>
            {togglerState.map(label => {
              const changeStatus = () => setTetheringStatus(label)
              return (
                <SettingsTogglerItem
                  key={label}
                  label={label}
                  onClick={changeStatus}
                  active={tetheringStatus === label}
                />
              )
            })}
          </SettingsToggler>
        </ActionsWrapper>
      </SettingsTableRow>
    </SettingsWrapper>
  )
}

export default SettingsUI
