import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
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
import SettingsToggler from "Renderer/components/rest/settings/settings-toggler.component"
import { noop } from "Renderer/utils/noop"
import { SettingsProps } from "Renderer/modules/settings/settings.component"
import { SettingsTestIds } from "Renderer/modules/settings/settings.enum"

export const SettingsTableRow = styled(TableRow)`
  grid-template-areas: "Checkbox Actions";
  grid-template-columns: 1fr 15rem;
  border-bottom: solid 0.1rem ${borderColor("list")};
`

export const Data = styled.div`
  grid-area: Checkbox;
  align-self: center;
`

export const SettingsLabel = styled(Name)`
  margin-left: 4rem;
`

export const SettingsDescriptionWrapper = styled.div`
  border-bottom: solid 0.1rem ${borderColor("list")};
`

export const SettingsDescription = styled(Text)`
  margin-left: 4rem;
  margin-bottom: 3.2rem;
`

export const SettingsWrapper = styled.section`
  padding-top: 3.2rem;
`

const SettingsUI: FunctionComponent<Omit<SettingsProps, "updateSettings">> = ({
  appAutostart,
  setAutostart = noop,
  appTethering,
  setTethering = noop,
}) => {
  return (
    <SettingsWrapper data-testid={SettingsTestIds.Wrapper}>
      <SettingsDescriptionWrapper data-testid={SettingsTestIds.Description}>
        <SettingsDescription
          displayStyle={TextDisplayStyle.MediumFadedLightText}
        >
          <FormattedMessage id="view.name.settings.description" />
        </SettingsDescription>
      </SettingsDescriptionWrapper>
      <SettingsTableRow
        checkMode={false}
        data-testid={SettingsTestIds.TableRow}
      >
        <Data>
          <SettingsLabel displayStyle={TextDisplayStyle.LargeText}>
            <FormattedMessage id="view.name.settings.autostartLabel" />
          </SettingsLabel>
        </Data>
        <ActionsWrapper>
          <SettingsToggler toggleValue={appAutostart} onToggle={setAutostart} />
        </ActionsWrapper>
      </SettingsTableRow>
      {/*TODO: Remove condition below when tethering will be available on phone*/}
      {process.env.NODE_ENV === "development" && (
        <SettingsTableRow
          checkMode={false}
          data-testid={SettingsTestIds.TableRow}
        >
          <Data>
            <SettingsLabel displayStyle={TextDisplayStyle.LargeText}>
              <FormattedMessage id="view.name.settings.tetheringLabel" />
            </SettingsLabel>
          </Data>
          <ActionsWrapper>
            <SettingsToggler
              toggleValue={appTethering}
              onToggle={setTethering}
            />
          </ActionsWrapper>
        </SettingsTableRow>
      )}
    </SettingsWrapper>
  )
}

export default SettingsUI
