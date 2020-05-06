import FunctionComponent from "Renderer/types/function-component.interface"
import { TextDisplayStyle } from "Renderer/components/core/text/text.component"
import { FormattedMessage } from "react-intl"
import { ActionsWrapper } from "Renderer/components/rest/messages/topics-table.component"
import React from "react"
import {
  Data,
  SettingsDescription,
  SettingsDescriptionWrapper,
  SettingsLabel,
  SettingsTableRow,
  SettingsWrapper,
} from "Renderer/components/rest/settings/settings-ui.component"
import SettingsToggler from "Renderer/components/rest/settings/settings-toggler.component"
import { ToggleState } from "Renderer/modules/settings/settings-toggle-state.enum"

interface Props {
  incomingCalls?: ToggleState
  setIncomingCalls: (label: ToggleState) => void
  incomingMessages?: ToggleState
  setIncomingMessages: (label: ToggleState) => void
  lowBattery?: ToggleState
  setLowBattery: (label: ToggleState) => void
  osUpdates?: ToggleState
  setOsUpdates: (label: ToggleState) => void
}

const NotificationsUI: FunctionComponent<Props> = ({
  incomingCalls,
  setIncomingCalls,
  incomingMessages,
  setIncomingMessages,
  lowBattery,
  setLowBattery,
  osUpdates,
  setOsUpdates,
}) => {
  return (
    <SettingsWrapper>
      <SettingsDescriptionWrapper>
        <SettingsDescription
          displayStyle={TextDisplayStyle.MediumFadedLightText}
        >
          <FormattedMessage id="view.name.settings.notifications.description" />
        </SettingsDescription>
      </SettingsDescriptionWrapper>
      <SettingsTableRow checkMode={false}>
        <Data>
          <SettingsLabel displayStyle={TextDisplayStyle.LargeText}>
            <FormattedMessage id="view.name.settings.notifications.incomingCallsNotificationsLabel" />
          </SettingsLabel>
        </Data>
        <ActionsWrapper>
          <SettingsToggler
            toggleValue={incomingCalls}
            onToggle={setIncomingCalls}
          />
        </ActionsWrapper>
      </SettingsTableRow>
      <SettingsTableRow checkMode={false}>
        <Data>
          <SettingsLabel displayStyle={TextDisplayStyle.LargeText}>
            <FormattedMessage id="view.name.settings.notifications.incomingMessagesNotifications" />
          </SettingsLabel>
        </Data>
        <ActionsWrapper>
          <SettingsToggler
            toggleValue={incomingMessages}
            onToggle={setIncomingMessages}
          />
        </ActionsWrapper>
      </SettingsTableRow>
      <SettingsTableRow checkMode={false}>
        <Data>
          <SettingsLabel displayStyle={TextDisplayStyle.LargeText}>
            <FormattedMessage id="view.name.settings.notifications.lowBatteryNotifications" />
          </SettingsLabel>
        </Data>
        <ActionsWrapper>
          <SettingsToggler toggleValue={lowBattery} onToggle={setLowBattery} />
        </ActionsWrapper>
      </SettingsTableRow>
      <SettingsTableRow checkMode={false}>
        <Data>
          <SettingsLabel displayStyle={TextDisplayStyle.LargeText}>
            <FormattedMessage id="view.name.settings.notifications.pureOsUpdatesNotifications" />
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
