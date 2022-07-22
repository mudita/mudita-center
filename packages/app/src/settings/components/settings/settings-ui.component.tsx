/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { ActionsWrapper } from "App/__deprecated__/renderer/components/rest/messages/threads-table.component"
import { TextDisplayStyle } from "App/__deprecated__/renderer/components/core/text/text.component"
import { FormattedMessage } from "react-intl"
import { SettingsToggler } from "App/settings/components/settings-toggler/settings-toggler.component"
import { SettingsTestIds } from "App/settings/components/settings/settings.enum"
import { defineMessages } from "react-intl"
import { Feature, flags } from "App/feature-flags"
import {
  SettingsWrapper,
  SettingsTableRow,
  Data,
  SettingsLabel,
  SettingsTooltip,
} from "App/settings/components/settings/settings-ui.styled"
import { Properties } from "App/settings/components/settings/settings-ui.interface"

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
