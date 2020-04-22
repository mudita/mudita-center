import FunctionComponent from "Renderer/types/function-component.interface"
import { TextDisplayStyle } from "Renderer/components/core/text/text.component"
import { FormattedMessage } from "react-intl"
import { ActionsWrapper } from "Renderer/components/rest/messages/topics-table.component"
import { intl } from "Renderer/utils/intl"
import React from "react"
import {
  Data,
  SettingsDescription,
  SettingsDescriptionWrapper,
  SettingsLabel,
  SettingsTableRow,
  SettingsToggler,
  SettingsTogglerItem,
  SettingsWrapper,
} from "Renderer/modules/settings/settings-ui.component"
import {
  ToggleState,
  twoStateToggler,
} from "Renderer/modules/settings/settings.component"

interface Props {
  incomingCallsNotifications?: string
  incomingMessagesNotifications?: string
  lowBatteryNotifications?: string
  pureOsUpdatesNotifications?: string
  setIncomingCallsNotifications: (label: ToggleState) => void
  setIncomingMessagesNotifications: (label: ToggleState) => void
  setLowBatteryNotifications: (label: ToggleState) => void
  setPureOsUpdatesNotifications: (label: ToggleState) => void
  togglerState: typeof twoStateToggler
}

const NotificationsUI: FunctionComponent<Props> = ({
  incomingCallsNotifications,
  incomingMessagesNotifications,
  lowBatteryNotifications,
  pureOsUpdatesNotifications,
  setIncomingCallsNotifications,
  setIncomingMessagesNotifications,
  setLowBatteryNotifications,
  setPureOsUpdatesNotifications,
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
            <FormattedMessage id="view.name.settings.notifications.incomingCallsNotificationsLabel" />
          </SettingsLabel>
        </Data>
        <ActionsWrapper>
          <SettingsToggler filled>
            {togglerState.map(label => {
              const changeStatus = () => setIncomingCallsNotifications(label)
              return (
                <SettingsTogglerItem
                  key={label}
                  label={intl.formatMessage({
                    id: label,
                  })}
                  onClick={changeStatus}
                  active={incomingCallsNotifications === label}
                />
              )
            })}
          </SettingsToggler>
        </ActionsWrapper>
      </SettingsTableRow>
      <SettingsTableRow checkMode={false}>
        <Data>
          <SettingsLabel displayStyle={TextDisplayStyle.LargeText}>
            <FormattedMessage id="view.name.settings.notifications.incomingMessagesNotifications" />
          </SettingsLabel>
        </Data>
        <ActionsWrapper>
          <SettingsToggler filled>
            {togglerState.map(label => {
              const changeStatus = () => setIncomingMessagesNotifications(label)
              return (
                <SettingsTogglerItem
                  key={label}
                  label={intl.formatMessage({
                    id: label,
                  })}
                  onClick={changeStatus}
                  active={incomingMessagesNotifications === label}
                />
              )
            })}
          </SettingsToggler>
        </ActionsWrapper>
      </SettingsTableRow>
      <SettingsTableRow checkMode={false}>
        <Data>
          <SettingsLabel displayStyle={TextDisplayStyle.LargeText}>
            <FormattedMessage id="view.name.settings.notifications.lowBatteryNotifications" />
          </SettingsLabel>
        </Data>
        <ActionsWrapper>
          <SettingsToggler filled>
            {togglerState.map(label => {
              const changeStatus = () => setLowBatteryNotifications(label)
              return (
                <SettingsTogglerItem
                  key={label}
                  label={intl.formatMessage({
                    id: label,
                  })}
                  onClick={changeStatus}
                  active={lowBatteryNotifications === label}
                />
              )
            })}
          </SettingsToggler>
        </ActionsWrapper>
      </SettingsTableRow>
      <SettingsTableRow checkMode={false}>
        <Data>
          <SettingsLabel displayStyle={TextDisplayStyle.LargeText}>
            <FormattedMessage id="view.name.settings.notifications.pureOsUpdatesNotifications" />
          </SettingsLabel>
        </Data>
        <ActionsWrapper>
          <SettingsToggler filled>
            {togglerState.map(label => {
              const changeStatus = () => setPureOsUpdatesNotifications(label)
              return (
                <SettingsTogglerItem
                  key={label}
                  label={intl.formatMessage({
                    id: label,
                  })}
                  onClick={changeStatus}
                  active={pureOsUpdatesNotifications === label}
                />
              )
            })}
          </SettingsToggler>
        </ActionsWrapper>
      </SettingsTableRow>
    </SettingsWrapper>
  )
}

export default NotificationsUI
