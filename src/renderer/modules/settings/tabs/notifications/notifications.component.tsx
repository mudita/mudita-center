import React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import { twoStateToggler } from "Renderer/modules/settings/settings.enum"
import NotificationsUI from "Renderer/components/rest/settings/notifications-ui.component"

const Notifications: FunctionComponent = () => {
  return <NotificationsUI togglerState={twoStateToggler} />
}

export default Notifications
