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
import SettingsToggler, {
  Option,
} from "Renderer/components/rest/settings/settings-toggler.component"
import { noop } from "Renderer/utils/noop"

interface Props {
  appIncomingCalls?: boolean
  setIncomingCalls?: (option: Record<Option.IncomingCalls, boolean>) => void
  incomingMessages?: boolean
  setIncomingMessages?: (label: boolean) => void
  lowBattery?: boolean
  setLowBattery?: (label: boolean) => void
  osUpdates?: boolean
  setOsUpdates?: (label: boolean) => void
}

const NotificationsUI: FunctionComponent<Props> = ({
  appIncomingCalls,
  setIncomingCalls = noop,
  incomingMessages,
  setIncomingMessages = noop,
  lowBattery,
  setLowBattery = noop,
  osUpdates,
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
            optionToUpdate={Option.IncomingCalls}
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
          <SettingsToggler toggleValue={incomingMessages} />
        </ActionsWrapper>
      </SettingsTableRow>
      <SettingsTableRow checkMode={false}>
        <Data>
          <SettingsLabel displayStyle={TextDisplayStyle.LargeText}>
            <FormattedMessage id="view.name.settings.notifications.lowBatteryNotifications" />
          </SettingsLabel>
        </Data>
        <ActionsWrapper>
          <SettingsToggler toggleValue={lowBattery} />
        </ActionsWrapper>
      </SettingsTableRow>
      <SettingsTableRow checkMode={false}>
        <Data>
          <SettingsLabel displayStyle={TextDisplayStyle.LargeText}>
            <FormattedMessage id="view.name.settings.notifications.pureOsUpdatesNotifications" />
          </SettingsLabel>
        </Data>
        <ActionsWrapper>
          <SettingsToggler toggleValue={osUpdates} />
        </ActionsWrapper>
      </SettingsTableRow>
    </SettingsWrapper>
  )
}

export default NotificationsUI
