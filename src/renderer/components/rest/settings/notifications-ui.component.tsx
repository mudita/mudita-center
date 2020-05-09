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
import { noop } from "Renderer/utils/noop"

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
            toggleValue={appIncomingCalls}
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
            toggleValue={appIncomingMessages}
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
          <SettingsToggler
            toggleValue={appLowBattery}
            onToggle={setLowBattery}
          />
        </ActionsWrapper>
      </SettingsTableRow>
      <SettingsTableRow checkMode={false}>
        <Data>
          <SettingsLabel displayStyle={TextDisplayStyle.LargeText}>
            <FormattedMessage id="view.name.settings.notifications.pureOsUpdatesNotifications" />
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
