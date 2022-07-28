/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { connect } from "react-redux"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { Notifications } from "App/settings/components/notifications/notifications.component"
import {
  loadSettings,
  setOsUpdates,
  setLowBattery,
  setIncomingMessages,
  setIncomingCalls,
} from "App/settings/actions"

const mapStateToProps = (state: ReduxRootState) => ({
  incomingCalls: state.settings.incomingCalls,
  incomingMessages: state.settings.incomingMessages,
  lowBattery: state.settings.lowBattery,
  osUpdates: state.settings.osUpdates,
})

const mapDispatchToProps = {
  setIncomingCalls,
  setIncomingMessages,
  setLowBattery,
  setOsUpdates,
  loadSettings,
}

export const NotificationsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Notifications)
