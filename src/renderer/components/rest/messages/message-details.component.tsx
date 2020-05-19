import React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import {
  Sidebar,
  SidebarHeaderIcon,
} from "Renderer/components/core/table/table.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import { noop } from "Renderer/utils/noop"

interface Props {
  details: any
  onClose?: () => void
}

const MessageDetails: FunctionComponent<Props> = ({
  details,
  onClose = noop,
}) => {
  const icons = (
    <>
      <SidebarHeaderIcon Icon={Type.Calls} onClick={noop} />
      <SidebarHeaderIcon Icon={Type.Contacts} onClick={noop} />
      <SidebarHeaderIcon Icon={Type.BorderCheckIcon} onClick={noop} />
      <SidebarHeaderIcon Icon={Type.Delete} onClick={noop} />
    </>
  )
  return (
    <Sidebar show headerRight={icons} onClose={onClose} appColorSidebarHeader>
      {details.caller.firstName}
    </Sidebar>
  )
}

export default MessageDetails
