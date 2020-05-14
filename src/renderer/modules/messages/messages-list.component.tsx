import React, { ChangeEvent, createRef, useEffect, useState } from "react"
import { Contact, Contacts } from "Renderer/models/phone/phone.interface"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled, { css } from "styled-components"
import Table, {
  Col,
  Group,
  Labels,
  Row,
} from "Renderer/components/core/table/table.component"
import useTableSelect from "Renderer/utils/hooks/useTableSelect"
import InputCheckbox, {
  Size,
} from "Renderer/components/core/input-checkbox/input-checkbox.component"
import Avatar, {
  AvatarSize,
} from "Renderer/components/core/avatar/avatar.component"
import {
  backgroundColor,
  borderRadius,
  textColor,
  transitionTime,
  transitionTimingFunction,
} from "Renderer/styles/theming/theme-getters"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import Icon from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import Dropdown from "Renderer/components/core/dropdown/dropdown.component"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import ButtonComponent from "Renderer/components/core/button/button.component"
import { ContactActions } from "Renderer/components/rest/phone/contact-details.component"
import useTableScrolling from "Renderer/utils/hooks/use-table-scrolling"
import { FormattedMessage } from "react-intl"
import { createFullName } from "Renderer/models/phone/phone.utils"
import { intl } from "Renderer/utils/intl"
import { Topic } from "Renderer/models/messages/messages.interface"
import { noop } from "Renderer/utils/noop"
import { basicRows } from "Renderer/components/core/table/table.fake-data"

const visibleCheckboxStyles = css`
  opacity: 1;
  visibility: visible;
`

const Checkbox = styled(InputCheckbox)<{ visible?: boolean }>`
  opacity: 0;
  visibility: hidden;
  transition: opacity ${transitionTime("faster")}
      ${transitionTimingFunction("smooth")},
    visibility ${transitionTime("faster")} ${transitionTimingFunction("smooth")};
  margin: 0 auto;

  ${({ visible }) => visible && visibleCheckboxStyles};
`

const lightAvatarStyles = css`
  background-color: ${backgroundColor("avatarLight")};
`

export const InitialsAvatar = styled(Avatar).attrs(() => ({
  size: AvatarSize.Small,
}))<{ light?: boolean }>`
  margin-right: 1.2rem;
  transition: background-color ${transitionTime("faster")}
    ${transitionTimingFunction("smooth")};
  ${({ light }) => light && lightAvatarStyles}
`

const MoreNumbers = styled(Text).attrs(() => ({
  displayStyle: TextDisplayStyle.SmallText,
}))`
  width: 3.2rem;
  padding: 0 1rem;
  box-sizing: border-box;
  margin-left: 1.6rem;
  text-align: center;
  color: ${textColor("darkGrey")};
  background-color: ${backgroundColor("grey")};
  border-radius: ${borderRadius("medium")};
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

const BlockedIcon = styled(Icon).attrs(() => ({
  type: Type.Blocked,
}))`
  margin-left: 1.6rem;
`

const SelectableContacts = styled(Table)<{ mouseLock?: boolean }>`
  flex: 1;
  overflow: auto;
  --columnsTemplate: 4rem 4rem 1fr;
  --columnsTemplateWithOpenedSidebar: 4rem 1fr;
  --columnsGap: 0;
  pointer-events: ${({ mouseLock }) => (mouseLock ? "none" : "all")};

  ${Row} {
    :hover {
      ${Checkbox} {
        ${visibleCheckboxStyles};
      }
      ${InitialsAvatar} {
        ${lightAvatarStyles};
      }
    }
  }
`

export interface Props extends Contacts {
  list: Topic[]
  activeRow?: Contact
  onCheck: (contacts: Contact[]) => void
  onSelect: (contact: Contact) => void
  newContact?: Contact
  editedContact?: Contact
}

const MessagesList: FunctionComponent<Props> = ({
  list,
  activeRow,
  onCheck,
  onSelect,
  newContact,
  editedContact,
}) => {
  const { getRowStatus, noneRowsSelected } = useTableSelect(basicRows)
  const { enableScroll, disableScroll, scrollable } = useTableScrolling()
  const [selectedTopics, setSelectedTopics] = useState(new Set())
  return (
    <SelectableContacts>
      {basicRows.map((row, index) => {
        const { selected, indeterminate } = getRowStatus(row)
        const onCheckboxToggle = ({
          target,
        }: ChangeEvent<HTMLInputElement>) => {
          const selectedTopicsTemp = new Set(selectedTopics)
          target.checked
            ? selectedTopicsTemp.add(row)
            : selectedTopicsTemp.delete(row)
          setSelectedTopics(selectedTopicsTemp)
        }
        return (
          <Row key={index}>
            <Col>
              <Checkbox
                checked={selected}
                onChange={onCheckboxToggle}
                size={Size.Small}
                visible={!noneRowsSelected}
              />
            </Col>
            <Col onClick={noop}>
              <InitialsAvatar
                user={{ firstName: row.firstName, lastName: row.lastName }}
                light={selected}
              />
            </Col>
            <Col>
              {row.firstName} {row.lastName}
            </Col>
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
          </Row>
        )
      })}
    </SelectableContacts>
  )
}

export default MessagesList
