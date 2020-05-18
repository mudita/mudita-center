import React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled, { css } from "styled-components"
import Table, { Col, Row } from "Renderer/components/core/table/table.component"
import useTableSelect from "Renderer/utils/hooks/useTableSelect"
import InputCheckbox, {
  Size,
} from "Renderer/components/core/input-checkbox/input-checkbox.component"
import Avatar, {
  AvatarSize,
} from "Renderer/components/core/avatar/avatar.component"
import {
  backgroundColor,
  transitionTime,
  transitionTimingFunction,
} from "Renderer/styles/theming/theme-getters"
import { TextDisplayStyle } from "Renderer/components/core/text/text.component"
import Icon from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import Dropdown from "Renderer/components/core/dropdown/dropdown.component"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import ButtonComponent from "Renderer/components/core/button/button.component"
import useTableScrolling from "Renderer/utils/hooks/use-table-scrolling"
import { Topic } from "Renderer/models/messages/messages.interface"
import { noop } from "Renderer/utils/noop"
import { rowsMessages } from "Renderer/components/core/table/table.fake-data"
import {
  DataWrapper,
  Message,
  Name,
  Time,
} from "Renderer/components/rest/messages/topics-table.component"
import moment from "moment"

const MessageRow = styled(Row)`
  height: 9rem;
`

const visibleCheckboxStyles = css`
  opacity: 1;
  visibility: visible;
`

const Checkbox = styled(InputCheckbox)<{ visible?: boolean }>`
  opacity: 0;
  visibility: hidden;
  margin: 0 auto;

  ${({ visible }) => visible && visibleCheckboxStyles};
`

const lightAvatarStyles = css`
  background-color: ${backgroundColor("avatarLight")};
`

const dotStyles = css`
  &:after {
    display: block;
    content: "";
    position: absolute;
    top: 0.2rem;
    left: -1.8rem;
    height: 0.6rem;
    width: 0.6rem;
    border-radius: 50%;
    background-color: ${backgroundColor("blue")};
  }
`

export const InitialsAvatar = styled(Avatar).attrs(() => ({
  size: AvatarSize.Small,
}))<{ light?: boolean }>`
  margin-right: 1.2rem;
  transition: background-color ${transitionTime("faster")}
    ${transitionTimingFunction("smooth")};
  ${({ light }) => light && lightAvatarStyles}
`

const MessageCol = styled(Col)`
  flex-direction: column;
  align-items: flex-start;
`

const AvatarCol = styled(Col)`
  position: relative;
`

const LastMessageText = styled(Message)<{ notReadMessages?: boolean }>`
  margin-top: 0.8rem;
  margin-left: 1.8rem;
  position: relative;
  overflow: initial;

  ${({ notReadMessages }) => notReadMessages && dotStyles};
`

const ActionsButton = styled.span`
  cursor: pointer;
`

const Actions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  flex: 1;
  padding-right: 3rem;
  box-sizing: border-box;
`

const SelectableContacts = styled(Table)<{
  mouseLock?: boolean
  noneRowsSelected?: boolean
}>`
  flex: 1;
  overflow: auto;
  --columnsTemplate: 8rem 1fr;
  --columnsTemplateWithOpenedSidebar: 4rem 1fr;
  --columnsGap: 0;
  pointer-events: ${({ mouseLock }) => (mouseLock ? "none" : "all")};

  ${({ noneRowsSelected }) =>
    !noneRowsSelected &&
    css`
      ${InitialsAvatar} {
        display: none;
      }
      ${Checkbox} {
        ${visibleCheckboxStyles};
        position: absolute;
        right: 0;
        margin-right: 1.8rem;
      }
    `};

  ${Row} {
    :hover {
      ${Checkbox} {
        ${visibleCheckboxStyles};
        position: absolute;
        right: 0;
        margin-right: 1.8rem;
      }
      ${InitialsAvatar} {
        ${lightAvatarStyles};
      }
      ${InitialsAvatar} {
        display: none;
      }
    }
  }
`

interface Props {
  list: Topic[]
}

const MessagesList: FunctionComponent<Props> = ({ list }) => {
  const { getRowStatus, toggleRow, noneRowsSelected } = useTableSelect(
    rowsMessages
  )
  const { enableScroll, disableScroll } = useTableScrolling()
  return (
    <SelectableContacts noneRowsSelected={noneRowsSelected}>
      {list.map((row, index) => {
        const { selected, indeterminate } = getRowStatus(row)
        const lastMessage = row.messages[row.messages.length - 1]
        const checkForNotReadMessages = Boolean(
          row.messages.filter(msg => !msg.wasRead).length
        )
        const onChange = () => toggleRow(row)
        return (
          <MessageRow key={index}>
            <AvatarCol>
              <Checkbox
                checked={selected}
                onChange={onChange}
                size={Size.Large}
                indeterminate={indeterminate}
                visible={!noneRowsSelected}
              />
              <InitialsAvatar
                user={{ firstName: row.firstName, lastName: row.lastName }}
                light={selected}
              />
            </AvatarCol>
            <MessageCol>
              <DataWrapper>
                <Name displayStyle={TextDisplayStyle.LargeBoldText}>
                  {row.firstName} {row.lastName}
                </Name>
                <Time displayStyle={TextDisplayStyle.SmallFadedText}>
                  {moment(lastMessage.date).format("h:mm:ss A, MMM Do YYYY")}
                </Time>
                <LastMessageText
                  notReadMessages={checkForNotReadMessages}
                  displayStyle={TextDisplayStyle.MediumFadedLightText}
                >
                  {lastMessage.content}
                </LastMessageText>
              </DataWrapper>
            </MessageCol>
            <Col>
              <Actions>
                <Dropdown
                  toggler={
                    <ActionsButton>
                      <Icon type={Type.More} />
                    </ActionsButton>
                  }
                  onOpen={disableScroll}
                  onClose={enableScroll}
                >
                  <ButtonComponent
                    labelMessage={{
                      id: "view.name.phone.contacts.action.exportAsVcard",
                    }}
                    Icon={Type.Upload}
                    onClick={noop}
                    displayStyle={DisplayStyle.Dropdown}
                  />
                </Dropdown>
              </Actions>
            </Col>
          </MessageRow>
        )
      })}
    </SelectableContacts>
  )
}

export default MessagesList
