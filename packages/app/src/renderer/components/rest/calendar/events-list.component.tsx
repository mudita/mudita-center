/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import styled from "styled-components"
import {
  Col,
  Group,
  Labels,
  Row,
} from "Renderer/components/core/table/table.component"
import { defineMessages } from "react-intl"
import { Size } from "Renderer/components/core/input-checkbox/input-checkbox.component"
import { CalendarEvent } from "Renderer/models/calendar/calendar.interfaces"
import { UseTableSelect } from "Renderer/utils/hooks/useTableSelect"
import {
  BaseSelectableCalls,
  Checkbox,
} from "Renderer/components/rest/calls/calls-table.styled"
import { CalendarTestIds } from "Renderer/modules/calendar/calendar-test-ids.enum"
import { List, AutoSizer, ListRowProps } from "react-virtualized"
import { intl } from "Renderer/utils/intl"
import EventsListDate from "Renderer/components/rest/calendar/events-list-date.component"

const messages = defineMessages({
  unnamedEvent: {
    id: "view.name.calendar.unnamedEvent",
  },
})

const Table = styled(BaseSelectableCalls)`
  --columnsTemplate: 4rem 3fr 3fr;
`

export interface EventsListProps extends UseTableSelect<CalendarEvent> {
  events: CalendarEvent[]
  selectedEventIndex?: number
}

const EventsList: FunctionComponent<EventsListProps> = ({
  events,
  getRowStatus,
  toggleRow,
  noneRowsSelected,
  selectedEventIndex,
}) => {
  const renderRow = ({ index, style }: ListRowProps) => {
    const { id, name, startDate, endDate } = events[index]
    const { selected } = getRowStatus(events[index])
    const onCheckboxToggle = () => toggleRow(events[index])
    return (
      <Row
        active={selectedEventIndex === index}
        data-testid={CalendarTestIds.Event}
        key={id + index}
        style={style}
      >
        <Col>
          <Checkbox
            checked={selected}
            onChange={onCheckboxToggle}
            size={Size.Small}
            visible={!noneRowsSelected}
          />
        </Col>
        <Col>{!name ? intl.formatMessage(messages.unnamedEvent) : name}</Col>
        <Col>
          <EventsListDate startDate={startDate} endDate={endDate} />
        </Col>
      </Row>
    )
  }
  return (
    <Table>
      <Group>
        <Labels>
          <Col />
          <Col />
        </Labels>
        <div>
          <AutoSizer disableHeight>
            {({ width }) => (
              <List
                height={595}
                width={width}
                scrollToIndex={selectedEventIndex}
                overscanRowCount={10}
                rowRenderer={renderRow}
                rowCount={events.length}
                rowHeight={64}
              />
            )}
          </AutoSizer>
        </div>
      </Group>
    </Table>
  )
}

export default EventsList
