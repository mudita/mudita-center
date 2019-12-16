import moment from "moment"
import React, { ChangeEvent, useState } from "react"
import InputText, {
  TextInputLayouts,
} from "Renderer/components/core/input-text/input-text.component"
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

const Messages: FunctionComponent<MessagesProps> = ({
  searchValue,
  visibilityFilter,
  changeSearchValue,
  changeVisibilityFilter,
  list,
}) => {
  const [selectedTopics, setSelectedTopics] = useState(new Set())

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
          <button onClick={showAllMessages}>All messages</button>
          <button onClick={hideReadMessages}>Unread only</button>
        </UnreadFilters>
        <InputText
          layout={TextInputLayouts.Outlined}
          placeholder={"Search"}
          defaultValue={searchValue}
          onChange={changeSearchValue}
        />
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
