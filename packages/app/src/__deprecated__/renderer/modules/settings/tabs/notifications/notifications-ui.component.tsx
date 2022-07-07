/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { TextDisplayStyle } from "App/__deprecated__/renderer/components/core/text/text.component"
import { FormattedMessage } from "react-intl"
import styled from "styled-components"
import { ActionsWrapper } from "App/__deprecated__/renderer/components/rest/messages/threads-table.component"
import React from "react"
import {
  Data,
  SettingsDescription,
  SettingsDescriptionWrapper,
  SettingsLabel,
  SettingsTableRow,
} from "App/__deprecated__/renderer/modules/settings/components/settings/settings-ui.component"
import SettingsToggler from "App/__deprecated__/renderer/modules/settings/components/settings-toggler/settings-toggler.component"
import { noop } from "App/__deprecated__/renderer/utils/noop"

export const SettingsWrapper = styled.section`
  padding-top: 3.2rem;
`

interface Props {
  appIncomingCalls?: boolean
  appIncomingMessages?: boolean
  appLowBattery?: boolean
  appOsUpdates?: boolean
  setIncomingCalls?: (option: boolean) => void
  setIncomingMessages?: (option: boolean) => void
  setLowBattery?: (option: boolean) => void
  setOsUpdates?: (option: boolean) => void
}

const NotificationsUI: FunctionComponent<Props> = ({
  appIncomingCalls,
  setIncomingCalls = noop,
  appIncomingMessages,
  setIncomingMessages = noop,
  appLowBattery,
  setLowBattery = noop,
  appOsUpdates,
  setOsUpdates = noop,
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
            toggleValue={appIncomingCalls}
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
            toggleValue={appIncomingMessages}
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
          <SettingsToggler
            toggleValue={appLowBattery}
            onToggle={setLowBattery}
          />
        </ActionsWrapper>
      </SettingsTableRow>
      <SettingsTableRow>
        <Data>
          <SettingsLabel displayStyle={TextDisplayStyle.Paragraph1}>
            <FormattedMessage id="module.settings.notificationsPureOsUpdatesNotifications" />
          </SettingsLabel>
        </Data>
        <ActionsWrapper>
          <SettingsToggler toggleValue={appOsUpdates} onToggle={setOsUpdates} />
        </ActionsWrapper>
      </SettingsTableRow>
    </SettingsWrapper>
  )
}

export default NotificationsUI
