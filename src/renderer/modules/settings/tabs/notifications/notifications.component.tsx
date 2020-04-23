import React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import NotificationsUI from "Renderer/components/rest/settings/notifications-ui.component"
import { twoStateToggler } from "Renderer/modules/settings/settings-toggler-state"

const Notifications: FunctionComponent = () => {
  return <NotificationsUI togglerState={twoStateToggler} />
}

export default Notifications
