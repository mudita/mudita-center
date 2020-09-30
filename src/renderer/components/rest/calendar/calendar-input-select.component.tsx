import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import styled, { css } from "styled-components"
import { defineMessages, FormattedDate } from "react-intl"
import { intl } from "Renderer/utils/intl"
import InputSelect, {
  RenderListItemProps,
  renderSearchableText,
  SelectInputItem,
} from "Renderer/components/core/input-select/input-select.component"
import { CalendarEvent } from "Renderer/modules/calendar/calendar.interface"
import { TimeWindow } from "Renderer/components/rest/calendar/time-window.component"
import { textColor } from "Renderer/styles/theming/theme-getters"

const messages = defineMessages({
  searchPlaceholder: { id: "view.name.calendar.panel.searchPlaceholder" },
})

const ListItem = styled(SelectInputItem)`
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

const renderListItem = ({
  item: { name, date },
  searchString,
  props,
}: RenderListItemProps<CalendarEvent>) => {
  const [startDate] = date
  return (
    <ListItem {...props}>
      <span>{renderSearchableText(name, searchString)}</span>
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
          <TimeWindow date={date} />
        </span>
      </ListItemDate>
    </ListItem>
  )
}

const renderName = (item: CalendarEvent) => item.name

const isOptionMatching = (item: CalendarEvent, search: string) => {
  return item.name.toLowerCase().includes(search.toLowerCase())
}

export interface CalendarInputSelectProps {
  events: CalendarEvent[]
  eventSelected?: CalendarEvent
  onEventSelect: (option: CalendarEvent) => void
}

const CalendarInputSelect: FunctionComponent<CalendarInputSelectProps> = ({
  events,
  eventSelected,
  onEventSelect,
  ...props
}) => {
  return (
    <InputSelect
      searchable
      outlined
      options={events}
      value={eventSelected}
      onSelect={onEventSelect}
      label={intl.formatMessage(messages.searchPlaceholder)}
      renderValue={renderName}
      isOptionMatching={isOptionMatching}
      renderListItem={renderListItem}
      listStyles={css`
        max-height: 19rem;
      `}
      {...props}
    />
  )
}

export default CalendarInputSelect
