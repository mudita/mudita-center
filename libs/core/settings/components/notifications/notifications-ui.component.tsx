/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "Core/core/types/function-component.interface"
import { TextDisplayStyle } from "Core/__deprecated__/renderer/components/core/text/text.component"
import { FormattedMessage } from "react-intl"
import styled from "styled-components"
import { ActionsWrapper } from "Core/__deprecated__/renderer/components/rest/messages/threads-table.component"
import React from "react"
import {
  Data,
  SettingsDescription,
  SettingsDescriptionWrapper,
  SettingsLabel,
  SettingsTableRow,
} from "Core/settings/components/settings"
import { SettingsToggler } from "Core/settings/components/settings-toggler"
import { noop } from "Core/__deprecated__/renderer/utils/noop"

export const SettingsWrapper = styled.section`
  padding-top: 3.2rem;
`

interface Props {
  incomingCalls: boolean
  incomingMessages: boolean
  lowBattery: boolean
  osUpdates: boolean
  setIncomingCalls: (option: boolean) => void
  setIncomingMessages: (option: boolean) => void
  setLowBattery: (option: boolean) => void
  setOsUpdates: (option: boolean) => void
}

const NotificationsUI: FunctionComponent<Props> = ({
  incomingCalls,
  setIncomingCalls = noop,
  incomingMessages,
  setIncomingMessages = noop,
  lowBattery,
  setLowBattery = noop,
  osUpdates,
  setOsUpdates,
}) => {
  return (
    <SettingsWrapper>
      <SettingsDescriptionWrapper>
        <SettingsDescription displayStyle={TextDisplayStyle.Paragraph4}>
          <FormattedMessage id="module.settings.notificationsDescription" />
        </SettingsDescription>
      </SettingsDescriptionWrapper>
      <SettingsTableRow>
        <Data>
          <SettingsLabel displayStyle={TextDisplayStyle.Paragraph1}>
            <FormattedMessage id="module.settings.notificationsIncomingCallsNotificationsLabel" />
          </SettingsLabel>
        </Data>
        <ActionsWrapper>
          <SettingsToggler
            toggleValue={incomingCalls}
            onToggle={setIncomingCalls}
          />
        </ActionsWrapper>
      </SettingsTableRow>
      <SettingsTableRow>
        <Data>
          <SettingsLabel displayStyle={TextDisplayStyle.Paragraph1}>
            <FormattedMessage id="module.settings.notificationsIncomingMessagesNotifications" />
          </SettingsLabel>
        </Data>
        <ActionsWrapper>
          <SettingsToggler
            toggleValue={incomingMessages}
            onToggle={setIncomingMessages}
          />
        </ActionsWrapper>
      </SettingsTableRow>
      <SettingsTableRow>
        <Data>
          <SettingsLabel displayStyle={TextDisplayStyle.Paragraph1}>
            <FormattedMessage id="module.settings.notificationsLowBatteryNotifications" />
          </SettingsLabel>
        </Data>
        <ActionsWrapper>
          <SettingsToggler toggleValue={lowBattery} onToggle={setLowBattery} />
        </ActionsWrapper>
      </SettingsTableRow>
      <SettingsTableRow>
        <Data>
          <SettingsLabel displayStyle={TextDisplayStyle.Paragraph1}>
            <FormattedMessage id="module.settings.notificationsPureOsUpdatesNotifications" />
          </SettingsLabel>
        </Data>
        <ActionsWrapper>
          <SettingsToggler toggleValue={osUpdates} onToggle={setOsUpdates} />
        </ActionsWrapper>
      </SettingsTableRow>
    </SettingsWrapper>
  )
}

export default NotificationsUI