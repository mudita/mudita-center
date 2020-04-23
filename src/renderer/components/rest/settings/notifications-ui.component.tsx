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
import { twoStateToggler } from "Renderer/modules/settings/settings-toggler-state"

interface Props {
  togglerState: typeof twoStateToggler
}

const NotificationsUI: FunctionComponent<Props> = ({ togglerState }) => {
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
            <FormattedMessage id="view.name.settings.notifications.incomingCallsNotificationsLabel" />
          </SettingsLabel>
        </Data>
        <ActionsWrapper>
          <SettingsToggler togglerState={togglerState} />
        </ActionsWrapper>
      </SettingsTableRow>
      <SettingsTableRow checkMode={false}>
        <Data>
          <SettingsLabel displayStyle={TextDisplayStyle.LargeText}>
            <FormattedMessage id="view.name.settings.notifications.incomingMessagesNotifications" />
          </SettingsLabel>
        </Data>
        <ActionsWrapper>
          <SettingsToggler togglerState={togglerState} />
        </ActionsWrapper>
      </SettingsTableRow>
      <SettingsTableRow checkMode={false}>
        <Data>
          <SettingsLabel displayStyle={TextDisplayStyle.LargeText}>
            <FormattedMessage id="view.name.settings.notifications.lowBatteryNotifications" />
          </SettingsLabel>
        </Data>
        <ActionsWrapper>
          <SettingsToggler togglerState={togglerState} />
        </ActionsWrapper>
      </SettingsTableRow>
      <SettingsTableRow checkMode={false}>
        <Data>
          <SettingsLabel displayStyle={TextDisplayStyle.LargeText}>
            <FormattedMessage id="view.name.settings.notifications.pureOsUpdatesNotifications" />
          </SettingsLabel>
        </Data>
        <ActionsWrapper>
          <SettingsToggler togglerState={togglerState} />
        </ActionsWrapper>
      </SettingsTableRow>
    </SettingsWrapper>
  )
}

export default NotificationsUI
