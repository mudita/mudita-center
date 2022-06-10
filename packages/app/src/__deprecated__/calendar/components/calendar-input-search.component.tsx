/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import styled, { css } from "styled-components"
import { defineMessages, FormattedDate } from "react-intl"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import { CalendarEvent } from "App/__deprecated__/calendar/store/calendar.interfaces"
import { TimeWindow } from "App/__deprecated__/calendar/components/time-window.component"
import { textColor } from "App/__deprecated__/renderer/styles/theming/theme-getters"
import SearchableText from "App/__deprecated__/renderer/components/core/searchable-text/searchable-text.component"
import {
  ListItem,
  RenderListItem,
} from "App/__deprecated__/renderer/components/core/list/list.component"
import InputSelect from "App/__deprecated__/renderer/components/core/input-select/input-select.component"
import { searchIcon } from "App/__deprecated__/renderer/components/core/input-text/input-text.elements"

const messages = defineMessages({
  searchPlaceholder: { id: "module.calendar.panelSearchPlaceholder" },
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
        max-height: 31.2rem;
      `}
    />
  )
}

export default CalendarInputSearch
