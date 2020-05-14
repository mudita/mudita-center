import moment from "moment"
import React, { ChangeEvent, useState } from "react"
import InputText from "Renderer/components/core/input-text/input-text.component"
import { TextDisplayStyle } from "Renderer/components/core/text/text.component"
import {
  ActionsWrapper,
  Checkbox,
  CheckboxWrapper,
  DataWrapper,
  FiltersWrapper,
  Message,
  Name,
  TableRow,
  TableWrapper,
  Time,
  UnreadFilters,
} from "Renderer/components/rest/messages/topics-table.component"
import {
  ComponentProps as MessagesProps,
  VisibilityFilter,
} from "Renderer/models/messages/messages.interface"
import FunctionComponent from "Renderer/types/function-component.interface"
import {
  DisplayStyle,
  Size,
} from "Renderer/components/core/button/button.config"
import Button from "Renderer/components/core/button/button.component"
import styled from "styled-components"
import { Type } from "Renderer/components/core/icon/icon.config"
import { noop } from "Renderer/utils/noop"
import { intl } from "Renderer/utils/intl"
import ButtonToggler, {
  ButtonTogglerItem,
} from "Renderer/components/core/button-toggler/button-toggler.component"
import Icon from "Renderer/components/core/icon/icon.component"

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`

const MessagesButtonTogglerItem = styled(ButtonTogglerItem)`
  width: 13.8rem;
`

const SearchInput = styled(InputText)`
  width: 38rem;
`

const toggleState = [
  intl.formatMessage({
    id: "view.name.messages.allMessages",
  }),
  intl.formatMessage({
    id: "view.name.messages.unreadOnly",
  }),
] as const

const searchIcon = <Icon type={Type.Magnifier} />

const Messages: FunctionComponent<MessagesProps> = ({
  searchValue,
  changeSearchValue,
  changeVisibilityFilter,
  list,
}) => {
  const [selectedTopics, setSelectedTopics] = useState(new Set())
  const [activeLabel, setActiveLabel] = useState(toggleState[0])

  const showAllMessages = () => {
    changeVisibilityFilter(VisibilityFilter.All)
  }

  const hideReadMessages = () => {
    changeVisibilityFilter(VisibilityFilter.Unread)
  }

  const checkMode = Boolean(selectedTopics.size)

  return (
    <>
      <FiltersWrapper checkMode={checkMode}>
        <UnreadFilters>
          <ButtonToggler>
            {toggleState.map((label, i) => {
              const onClick = () => {
                i === 0 ? showAllMessages() : hideReadMessages()
                setActiveLabel(label)
              }
              return (
                <MessagesButtonTogglerItem
                  key={i}
                  label={label}
                  onClick={onClick}
                  active={activeLabel === label}
                />
              )
            })}
          </ButtonToggler>
        </UnreadFilters>
        <SearchInput
          type={"search"}
          placeholder={intl.formatMessage({
            id: "view.name.messages.search",
          })}
          outlined
          defaultValue={searchValue}
          onChange={changeSearchValue}
          leadingIcons={[searchIcon]}
        />
        <ButtonWrapper>
          <Button
            displayStyle={DisplayStyle.Primary}
            size={Size.FixedBig}
            label={intl.formatMessage({
              id: "view.name.messages.newMessage",
            })}
            onClick={noop}
            Icon={Type.PlusSign}
          />
        </ButtonWrapper>
      </FiltersWrapper>
      <TableWrapper>
        {list.map(({ id, caller, messages }, index) => {
          const onCheckboxToggle = ({
            target,
          }: ChangeEvent<HTMLInputElement>) => {
            const selectedTopicsTemp = new Set(selectedTopics)
            target.checked
              ? selectedTopicsTemp.add(id)
              : selectedTopicsTemp.delete(id)
            setSelectedTopics(selectedTopicsTemp)
          }
          const customAction = () => {
            console.log(`Action on row with id: ${id}`)
          }

          const lastMessage = messages[messages.length - 1]

          return (
            <TableRow key={index} checkMode={checkMode}>
              <CheckboxWrapper>
                <Checkbox
                  onChange={onCheckboxToggle}
                  checked={selectedTopics.has(id)}
                />
              </CheckboxWrapper>
              <DataWrapper>
                <Name displayStyle={TextDisplayStyle.LargeBoldText}>
                  {caller.forename} {caller.surname}
                </Name>
                <Time displayStyle={TextDisplayStyle.SmallFadedText}>
                  {moment(lastMessage.date).format("h:mm:ss A, MMM Do YYYY")}
                </Time>
                <Message displayStyle={TextDisplayStyle.MediumFadedLightText}>
                  {lastMessage.content}
                </Message>
              </DataWrapper>
              <ActionsWrapper>
                <button onClick={customAction}>•••</button>
              </ActionsWrapper>
            </TableRow>
          )
        })}
      </TableWrapper>
    </>
  )
}

export default Messages
