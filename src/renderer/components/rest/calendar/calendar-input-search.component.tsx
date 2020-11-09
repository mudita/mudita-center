import React from "react"
import styled, { css } from "styled-components"
import { defineMessages, FormattedDate } from "react-intl"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { intl } from "Renderer/utils/intl"
import { CalendarEvent } from "Renderer/models/calendar/calendar.interfaces"
import { TimeWindow } from "Renderer/components/rest/calendar/time-window.component"
import { textColor } from "Renderer/styles/theming/theme-getters"
import SearchableText from "Renderer/components/core/searchable-text/searchable-text.component"
import {
  ListItem,
  RenderListItem,
} from "Renderer/components/core/list/list.component"
import InputSelect from "Renderer/components/core/input-select/input-select.component"
import { searchIcon } from "Renderer/components/core/input-text/input-text.elements"

const messages = defineMessages({
  searchPlaceholder: { id: "view.name.calendar.panel.searchPlaceholder" },
})

const CalendarListItem = styled(ListItem)`
  display: flex;
  justify-content: space-between;
`

const ListItemDate = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 12rem;
  text-align: right;
  color: ${textColor("secondary")};

  span:first-of-type {
    margin-bottom: 0.8rem;
  }
`

const renderListItem: RenderListItem<CalendarEvent> = ({
  item: { name, startDate, endDate },
  searchString,
  props,
}) => (
  <CalendarListItem {...props}>
    <span>
      <SearchableText text={name} search={searchString} />
    </span>
    <ListItemDate>
      <span>
        <FormattedDate
          value={startDate}
          year="numeric"
          month="short"
          day="2-digit"
          weekday="short"
        />
      </span>
      <span>
        <TimeWindow startDate={startDate} endDate={endDate} />
      </span>
    </ListItemDate>
  </CalendarListItem>
)

const renderName = (item: CalendarEvent) => item.name

const isItemMatching = (item: CalendarEvent, search: string) => {
  return item.name.toLowerCase().includes(search.toLowerCase())
}

export interface CalendarInputSelectProps {
  events: CalendarEvent[]
  onEventSelect: (item: CalendarEvent) => void
}

const CalendarInputSearch: FunctionComponent<CalendarInputSelectProps> = ({
  events,
  onEventSelect,
  ...props
}) => {
  const minEventNameLength = Math.min(
    ...events.map((event) => event.name.length)
  )
  const minCharsToShowResults = Math.min(3, minEventNameLength)

  return (
    <InputSelect
      {...props}
      onSelect={onEventSelect}
      items={events}
      leadingIcons={[searchIcon]}
      label={intl.formatMessage(messages.searchPlaceholder)}
      renderItemValue={renderName}
      renderListItem={renderListItem}
      isItemMatching={isItemMatching}
      type="search"
      outlined
      searchable
      minCharsToShowResults={minCharsToShowResults}
      listStyles={css`
        max-height: 30.5rem;
      `}
    />
  )
}

export default CalendarInputSearch
