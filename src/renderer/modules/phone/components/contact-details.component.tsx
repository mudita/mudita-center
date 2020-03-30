import React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import {
  Sidebar,
  SidebarHeaderIcon,
} from "Renderer/components/core/table/table.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import { SidebarProps } from "Renderer/components/core/table/table.interface"

export interface RowActions {
  onEdit?: () => void
  onExport?: () => void
  onForward?: () => void
  onBlock?: () => void
  onDelete?: () => void
}

interface ContactDetailsProps extends SidebarProps, RowActions {
  data: any
}

const ContactDetails: FunctionComponent<ContactDetailsProps> = ({
  data,
  onEdit,
  onExport,
  onForward,
  onBlock,
  onDelete,
  ...rest
}) => {
  const Icons = () => (
    <>
      <SidebarHeaderIcon Icon={Type.Notes} onClick={onEdit} />
      <SidebarHeaderIcon Icon={Type.Upload} onClick={onExport} />
      <SidebarHeaderIcon Icon={Type.Forward} onClick={onForward} />
      <SidebarHeaderIcon Icon={Type.Blocked} onClick={onBlock} />
      <SidebarHeaderIcon Icon={Type.Delete} onClick={onDelete} />
    </>
  )
  return (
    <Sidebar {...rest} headerRight={<Icons />}>
      Contact details
    </Sidebar>
  )
}

export default ContactDetails
