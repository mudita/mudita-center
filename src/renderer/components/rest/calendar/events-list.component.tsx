import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import styled from "styled-components"
import {
  Col,
  Group,
  Labels,
  Row,
  TextPlaceholder,
} from "Renderer/components/core/table/table.component"
import { FormattedDate } from "react-intl"
import { Size } from "Renderer/components/core/input-checkbox/input-checkbox.component"
import { CalendarEvent } from "Renderer/models/calendar/calendar.interfaces"
import { UseTableSelect } from "Renderer/utils/hooks/useTableSelect"
import Faker from "faker"
import {
  BaseSelectableCalls,
  Checkbox,
} from "Renderer/components/rest/calls/calls-table.styled"
import { TimeWindow } from "Renderer/components/rest/calendar/time-window.component"
import { CalendarTestIds } from "Renderer/modules/calendar/calendar-test-ids.enum"
import { List } from "react-virtualized"

const Table = styled(BaseSelectableCalls)`
  --columnsTemplate: 4rem 5fr 3fr 3fr;
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
  console.log(events.length)
  console.log({ events })
  const renderRow = ({ index, isScrolling }) => {
    const { id, name, startDate, endDate } = events[index]
    const { selected } = getRowStatus(events[index])
    const onCheckboxToggle = () => toggleRow(events[index])
    const content = isScrolling ? (
      <Row active={selectedEventIndex === index}>
        <Col />
        <Col>
          <TextPlaceholder
            charsCount={Faker.random.number({ min: 10, max: 30 })}
          />
        </Col>
        <Col>
          <TextPlaceholder charsCount={8} /> -{" "}
          <TextPlaceholder charsCount={8} />
        </Col>
        <Col>
          <TextPlaceholder
            charsCount={Faker.random.number({ min: 20, max: 30 })}
          />
        </Col>
      </Row>
    ) : (
      <Row
        active={selectedEventIndex === index}
        data-testid={CalendarTestIds.Event}
        key={id}
      >
        <Col>
          <Checkbox
            checked={selected}
            onChange={onCheckboxToggle}
            size={Size.Small}
            visible={!noneRowsSelected}
          />
        </Col>
        <Col>{name}</Col>
        <Col>
          <TimeWindow startDate={startDate} endDate={endDate} />
        </Col>
        <Col>
          <FormattedDate
            value={startDate}
            year="numeric"
            month="long"
            day="2-digit"
            weekday="long"
          />
        </Col>
      </Row>
    )

    return content
  }
  return (
    <Table>
      <Group>
        <Labels>
          <Col />
          <Col />
        </Labels>
        <div>
          <List
            width={990}
            height={550}
            scrollToIndex={selectedEventIndex}
            rowRenderer={renderRow}
            rowCount={events.length}
            rowHeight={64}
          />
        </div>
      </Group>
    </Table>
  )
}

export default EventsList
