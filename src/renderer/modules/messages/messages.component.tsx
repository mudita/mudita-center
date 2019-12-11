import moment from "moment"
import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react"
import InputCheckbox from "Renderer/components/core/input-checkbox/input-checkbox.component"
import InputText, {
  TextInputLayouts,
} from "Renderer/components/core/input-text/input-text.component"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import mockedTopics from "Renderer/components/rest/messages/mocked-data"
import Table, {
  FiltersProps,
  TableRowProps,
} from "Renderer/components/rest/messages/topics-table.component"
import {
  backgroundColor,
  borderColor,
  textColor,
} from "Renderer/styles/theming/theme-getters"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled, { css } from "styled-components"

export interface Caller {
  id: string
  forename: string
  surname: string
  phone: string
  avatar?: string
}

export interface Message {
  id: string
  date: string
  content: string
  isCaller: boolean
}

export interface Topic {
  id: string
  caller: Caller
  unread: boolean
  messages: Message[]
}

interface FilterProps {
  onChange: Dispatch<SetStateAction<boolean>>
  onLabel: string
  offLabel: string
}

export enum MessagesFilter {
  AllMessages,
  UnreadOnly,
}

const FilterButton = styled.button<{ active: boolean }>`
  background-color: ${({ active }) => (active ? "hotpink" : "transparent")};
`

const Avatar = styled.div<{ hide: boolean }>`
  grid-area: Checkbox;
  width: 4.8rem;
  height: 4.8rem;
  align-self: center;
  justify-self: center;
  border-radius: 50%;
  overflow: hidden;
  background-color: ${backgroundColor("accent")};
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
  visibility: visible;
  transition: all 0.15s ease-in-out;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  ${({ hide }) =>
    hide &&
    css`
      opacity: 0;
      visibility: hidden;
    `};
`

const Name = styled(Text)`
  grid-area: Name;
  align-self: end;
  margin: 0;
  padding-bottom: 0.4rem;
`

const Time = styled(Text)`
  grid-area: Date;
  align-self: end;
  margin: 0;
  padding-bottom: 0.4rem;
  padding-left: 1rem;
`

const Message = styled(Text)`
  grid-area: Message;
  align-self: center;
  margin: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const UnreadMessageDot = styled.span`
  display: inline-block;
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 50%;
  background-color: ${textColor("supplementary")};
  margin-right: 1.2rem;
`

const topicRowLayout = css`
  grid-template-columns: 4rem 4.8rem 2.4rem auto 1fr 9rem;
  grid-template-rows: 2.4rem 2.4rem;
  grid-template-areas:
    ". Checkbox . Name Date Actions"
    ". Checkbox . Message Message Actions";

  &:hover {
    ${Avatar} {
      opacity: 0;
      visibility: hidden;
    }
  }
`

const checkModeStyles = css`
  grid-template-areas: "Search Search Create";
`

const TopicFiltersWrapper = styled.div<{ checkMode?: boolean }>`
  display: grid;
  grid-column-gap: 4rem;
  grid-template-columns: 3fr 4fr 2fr;
  grid-template-areas: "Filter Search Create";
  align-content: center;
  padding: 0 4rem;
  height: 10rem;
  min-height: 10rem;
  box-sizing: border-box;
  border-bottom: solid 0.1rem ${borderColor("light")};

  ${({ checkMode }) => checkMode && checkModeStyles};
`

const Filter = styled.div`
  grid-area: Filter;
`

const SearchInput = styled(InputText)`
  grid-area: Search;
  width: 100%;
`

const Create = styled.div`
  grid-area: Create;
`

const TripleStateCheckbox = styled(InputCheckbox)`
  width: 4.8rem;
`

const FilterComponent: FunctionComponent<FilterProps> = ({
  onChange,
  onLabel,
  offLabel,
}) => {
  const [on, setOn] = useState(true)

  useEffect(() => {
    onChange(on)
  }, [on])

  const turnOn = () => {
    setOn(true)
  }

  const turnOff = () => {
    setOn(false)
  }

  return (
    <>
      <FilterButton onClick={turnOn} active={on}>
        {onLabel}
      </FilterButton>
      <FilterButton onClick={turnOff} active={!on}>
        {offLabel}
      </FilterButton>
    </>
  )
}

const Messages: FunctionComponent = () => {
  const [filter, setFilter] = useState<MessagesFilter>(
    MessagesFilter.AllMessages
  )
  const [searchValue, setSearchValue] = useState("")
  const [topics, setTopics] = useState(mockedTopics)

  const filteredTopics = topics
    .filter(({ unread, caller, messages }) => {
      const search = searchValue.toLowerCase()
      const topicUnread = filter === MessagesFilter.AllMessages ? true : unread
      const matchesForename = caller.forename.toLowerCase().includes(search)
      const matchesSurname = caller.surname.toLowerCase().includes(search)
      const matchesPhone = caller.phone.includes(search)
      const matchesMessage = messages.some(({ content }) =>
        content.toLowerCase().includes(search)
      )

      return (
        topicUnread &&
        (matchesForename || matchesSurname || matchesPhone || matchesMessage)
      )
    })
    .sort((a, b) => {
      const lastMessageDate = ({ messages }: Topic) => {
        return messages[messages.length - 1].date
      }
      const x = lastMessageDate(a)
      const y = lastMessageDate(b)
      return x > y ? -1 : x < y ? 1 : 0
    })

  const setMessagesFiltering = (on: SetStateAction<boolean>) => {
    setFilter(on ? MessagesFilter.AllMessages : MessagesFilter.UnreadOnly)
  }

  const filterByString = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target!.value)
  }

  const topicFilters = ({ checkedRows, setCheckedRows }: FiltersProps) => {
    const checkIndeterminate =
      checkedRows.size < filteredTopics.length && checkedRows.size > 0

    const checkedAll = checkedRows.size === filteredTopics.length
    const checkMode = Boolean(checkedRows.size)

    const toggleAll = () => {
      const tempCheckedRows = new Set(checkedRows)
      if (checkedAll) {
        tempCheckedRows.clear()
      } else if (checkIndeterminate) {
        filteredTopics.forEach(topic => {
          tempCheckedRows.add(topic)
        })
      }
      setCheckedRows(tempCheckedRows)
    }

    const getCheckedItemsCountInfo = () => {
      switch (true) {
        case checkedRows.size === 1:
          return `1 conversation selected`
        case checkedRows.size < filteredTopics.length:
          return `${checkedRows.size} conversations selected`
        default:
          return `All conversations selected`
      }
    }

    const deleteTopic = () => {
      const deleted: string[] = []
      checkedRows.forEach(row => {
        deleted.push(row.id)
      })
      if (confirm(`Following topics will be deleted: ${deleted.join(", ")}`)) {
        const newTopicsList = topics.filter(({ id }) => !deleted.includes(id))
        setTopics(newTopicsList)
        setCheckedRows(new Set())
      }
    }

    return (
      <TopicFiltersWrapper checkMode={checkMode}>
        {!checkMode && (
          <Filter>
            <FilterComponent
              onChange={setMessagesFiltering}
              onLabel={"All messages"}
              offLabel={"Unread only"}
            />
          </Filter>
        )}
        {checkMode ? (
          <SearchInput
            placeholder="Search"
            layout={TextInputLayouts.Outlined}
            condensed
            disabled
            defaultValue={getCheckedItemsCountInfo()}
            leadingIcons={[
              <TripleStateCheckbox
                onChange={toggleAll}
                checked={checkedAll}
                indeterminate={checkIndeterminate}
                key="1"
              />,
            ]}
            trailingIcons={[
              <button key={"1"} onClick={deleteTopic}>
                Delete
              </button>,
            ]}
          />
        ) : (
          <SearchInput
            onChange={filterByString}
            placeholder="Search"
            layout={TextInputLayouts.Outlined}
          />
        )}
        <Create>
          <button>New message</button>
        </Create>
      </TopicFiltersWrapper>
    )
  }

  const rowTemplate = ({
    row: {
      caller: { avatar, forename, surname },
      messages,
      unread,
    },
    checkMode,
  }: TableRowProps<Topic>) => {
    /*
      Selecting the last message is based on assumption that messages are sorted
      by date in ascending order.
    */
    const lastMessage = messages[messages.length - 1]

    return (
      <>
        <Avatar hide={Boolean(checkMode)}>
          {avatar ? (
            <img src={avatar} alt={`${forename} ${surname}`} />
          ) : (
            <Text
              displayStyle={TextDisplayStyle.LargeFadedDimTextCapitalLetters}
            >
              {forename.charAt(0)}
              {surname.charAt(0)}
            </Text>
          )}
        </Avatar>
        <Name displayStyle={TextDisplayStyle.LargeBoldText}>
          {forename} {surname}
        </Name>
        <Time displayStyle={TextDisplayStyle.SmallFadedText}>
          {moment(messages[messages.length - 1].date).format(
            "h:mm:ss A, MMM Do YYYY"
          )}
        </Time>
        <Message
          displayStyle={
            unread
              ? TextDisplayStyle.MediumText
              : TextDisplayStyle.MediumFadedLightText
          }
        >
          {unread && <UnreadMessageDot />}
          {lastMessage.content}
        </Message>
      </>
    )
  }

  const topicActions = ({ row }: TableRowProps<Topic>) => {
    const buttonListener = () => {
      console.log(`Action button clicked on element with id ${row.id}`)
    }
    return <button onClick={buttonListener}>•••</button>
  }

  return (
    <Table
      rows={filteredTopics}
      rowTemplate={rowTemplate}
      rowLayoutStyle={topicRowLayout}
      actionsTemplate={topicActions}
      tableFilters={topicFilters}
    />
  )
}

export default Messages
