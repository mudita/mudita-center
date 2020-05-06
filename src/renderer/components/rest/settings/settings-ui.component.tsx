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
import { FormattedMessage } from "react-intl"
import { borderColor } from "Renderer/styles/theming/theme-getters"
import SettingsToggler, {
  Option,
} from "Renderer/components/rest/settings/settings-toggler.component"
import { ToggleState } from "Renderer/modules/settings/settings-toggle-state.enum"
import { noop } from "Renderer/utils/noop"

export const SettingsTableRow = styled(TableRow)`
  grid-template-areas: "Checkbox Actions";
  grid-template-columns: 1fr 15rem;
  border-bottom: solid 0.1rem ${borderColor("listItem")};
`

export const Data = styled.div`
  grid-area: Checkbox;
  align-self: center;
`

export const SettingsLabel = styled(Name)`
  margin-left: 4rem;
`

export const SettingsDescriptionWrapper = styled.div`
  border-bottom: solid 0.1rem ${borderColor("listItem")};
`

export const SettingsDescription = styled(Text)`
  margin-left: 4rem;
  margin-bottom: 3.2rem;
`

export const SettingsWrapper = styled.section`
  padding-top: 3.2rem;
`

interface Props {
  autostart?: ToggleState
  setAutostart?: (option: Record<string, ToggleState>) => void
  tethering?: ToggleState
  setTethering?: (option: Record<string, ToggleState>) => void
}

const SettingsUI: FunctionComponent<Props> = ({
  autostart,
  setAutostart = noop,
  tethering,
  setTethering = noop,
}) => {
  return (
    <SettingsWrapper>
      <SettingsDescriptionWrapper>
        <SettingsDescription
          displayStyle={TextDisplayStyle.MediumFadedLightText}
        >
          <FormattedMessage id="view.name.settings.description" />
        </SettingsDescription>
      </SettingsDescriptionWrapper>
      <SettingsTableRow checkMode={false}>
        <Data>
          <SettingsLabel displayStyle={TextDisplayStyle.LargeText}>
            <FormattedMessage id="view.name.settings.autostartLabel" />
          </SettingsLabel>
        </Data>
        <ActionsWrapper>
          <SettingsToggler
            toggleValue={autostart}
            onToggle={setAutostart}
            optionToUpdate={Option.Autostart}
          />
        </ActionsWrapper>
      </SettingsTableRow>
      <SettingsTableRow checkMode={false}>
        <Data>
          <SettingsLabel displayStyle={TextDisplayStyle.LargeText}>
            <FormattedMessage id="view.name.settings.tetheringLabel" />
          </SettingsLabel>
        </Data>
        <ActionsWrapper>
          <SettingsToggler
            toggleValue={tethering}
            onToggle={setTethering}
            optionToUpdate={Option.Tethering}
          />
        </ActionsWrapper>
      </SettingsTableRow>
    </SettingsWrapper>
  )
}

export default SettingsUI
