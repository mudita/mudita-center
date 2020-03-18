import * as React from "react"
import Button from "Renderer/components/core/button/button.component"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import { Message as MessageInterface } from "Renderer/interfaces/message.interface"
import FunctionComponent from "Renderer/types/function-component.interface"
import { Type } from "Renderer/components/core/icon/icon.config"

interface TabProps {
  icon: Type
  label?: MessageInterface
  url?: string
}

const Tab: FunctionComponent<TabProps> = ({ icon, label, url, className }) => {
  return (
    <Button
      className={className}
      nav
      displayStyle={DisplayStyle.Tab}
      labelMessage={label}
      Icon={icon}
      to={url}
      exact
    />
  )
}

export default Tab
