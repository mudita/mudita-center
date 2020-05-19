import React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import {
  Sidebar,
  SidebarHeaderIcon,
} from "Renderer/components/core/table/table.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import { noop } from "Renderer/utils/noop"
import { ActiveRow } from "Renderer/components/rest/messages/messages-list.component"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import styled from "styled-components"

interface Props {
  details: ActiveRow
  onClose?: () => void
}

const PhoneNumberText = styled(Text)`
  margin-top: 0.8rem;
`

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
    <Sidebar
      show
      headerLeft={
        <>
          <Text displayStyle={TextDisplayStyle.LargeBoldText}>
            {details.caller.firstName} {details.caller.lastName}
          </Text>
          <PhoneNumberText displayStyle={TextDisplayStyle.MediumFadedLightText}>
            {details.caller.phoneNumber}
          </PhoneNumberText>
        </>
      }
      headerRight={icons}
      onClose={onClose}
      appColorSidebarHeader
    />
  )
}

export default MessageDetails
