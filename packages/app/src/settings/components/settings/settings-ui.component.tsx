/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import {
  ActionsWrapper,
  Name,
} from "App/__deprecated__/renderer/components/rest/messages/threads-table.component"
import Text, {
  TextDisplayStyle,
} from "App/__deprecated__/renderer/components/core/text/text.component"
import styled from "styled-components"
import { FormattedMessage } from "react-intl"
import { borderColor } from "App/__deprecated__/renderer/styles/theming/theme-getters"
import { SettingsToggler } from "App/settings/components/settings-toggler/settings-toggler.component"
import { SettingsTestIds } from "App/settings/components/settings/settings.enum"
import { IconButtonWithPrimaryTooltip } from "App/__deprecated__/renderer/components/core/icon-button-with-tooltip/icon-button-with-primary-tooltip.component"
import { defineMessages } from "react-intl"
import { Feature, flags } from "App/feature-flags"

export const SettingsTableRow = styled.div`
  display: grid;
  box-sizing: border-box;
  grid-template-areas: "Checkbox Actions";
  grid-template-columns: 1fr 16.4rem;
  border-bottom: solid 0.1rem ${borderColor("list")};
  height: 7.2rem;
  max-height: 7.2rem;
`

export const Data = styled.div`
  grid-area: Checkbox;
  align-self: center;
  display: flex;
  flex-direction: row;
`

export const SettingsLabel = styled(Name)`
  margin-left: 3.2rem;
  margin-bottom: 0;
  align-self: center;
`

export const SettingsDescriptionWrapper = styled.div`
  border-bottom: solid 0.1rem ${borderColor("list")};
`

export const SettingsDescription = styled(Text)`
  margin-left: 3.2rem;
  margin-bottom: 3.2rem;
`

export const SettingsTooltip = styled(IconButtonWithPrimaryTooltip)`
  margin-left: 0.4rem;
`

export const SettingsWrapper = styled.section``

interface Properties {
  autostart: boolean
  tethering: boolean
  collectingData: boolean | undefined
  toggleTethering: (value: boolean) => void
  toggleCollectionData: (value: boolean) => void
}

const messages = defineMessages({
  tooltipDescription: { id: "module.settings.collectingDataTooltip" },
})

export const SettingsUI: FunctionComponent<Properties> = ({
  tethering,
  toggleTethering,
  collectingData,
  toggleCollectionData,
}) => {
  return (
    <SettingsWrapper data-testid={SettingsTestIds.Wrapper}>
      {/*TODO: Remove condition below when tethering will be available on phone*/}
      {flags.get(Feature.TetheringEnabled) && (
        <SettingsTableRow data-testid={SettingsTestIds.TableRow}>
          <Data>
            <SettingsLabel displayStyle={TextDisplayStyle.Paragraph1}>
              <FormattedMessage id="module.settings.tetheringLabel" />
            </SettingsLabel>
          </Data>
          <ActionsWrapper>
            <SettingsToggler
              toggleValue={tethering}
              onToggle={toggleTethering}
            />
          </ActionsWrapper>
        </SettingsTableRow>
      )}
      <SettingsTableRow data-testid={SettingsTestIds.TableRow}>
        <Data>
          <SettingsLabel displayStyle={TextDisplayStyle.Paragraph1}>
            <FormattedMessage id="module.settings.collectingData" />
          </SettingsLabel>
          <SettingsTooltip description={messages.tooltipDescription} />
        </Data>
        <ActionsWrapper>
          <SettingsToggler
            toggleValue={collectingData}
            onToggle={toggleCollectionData}
          />
        </ActionsWrapper>
      </SettingsTableRow>
    </SettingsWrapper>
  )
}
