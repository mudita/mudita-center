import React, { Ref } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import styled from "styled-components"
import {
  Col,
  Group,
  Labels,
  Row,
  TextPlaceholder,
} from "Renderer/components/core/table/table.component"
import {
  defineMessages,
  FormattedDate,
  FormattedMessage,
  FormattedTime,
} from "react-intl"
import { Size } from "Renderer/components/core/input-checkbox/input-checkbox.component"
import { CalendarEvent } from "Renderer/models/calendar/calendar.interfaces"
import { UseTableSelect } from "Renderer/utils/hooks/useTableSelect"
import { InView } from "react-intersection-observer"
import Faker from "faker"
import {
  BaseSelectableCalls,
  Checkbox,
} from "Renderer/components/rest/calls/calls-table.styled"

const messages = defineMessages({
  allEvents: {
    id: "view.name.calendar.allEvents",
  },
})

const Table = styled(BaseSelectableCalls)`
  --columnsTemplate: 4rem 5fr 3fr 3fr;
`

export interface EventsListProps extends UseTableSelect<CalendarEvent> {
  events: CalendarEvent[]
}

const EventsList: FunctionComponent<EventsListProps> = ({
  events,
  getRowStatus,
  toggleRow,
  noneRowsSelected,
}) => (
  <Table>
    <Group>
      <Labels>
        <Col />
        <Col>
          <FormattedMessage {...messages.allEvents} />
        </Col>
      </Labels>
      {events.map((event) => {
        const { id, name, date } = event
        const [startDate, endDate] = date
        const { selected } = getRowStatus(event)

        const onCheckboxToggle = () => toggleRow(event)

        const interactiveRow = (ref: Ref<HTMLDivElement>) => (
          <Row ref={ref}>
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
              <FormattedTime value={startDate} /> -{" "}
              <FormattedTime value={endDate} />
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

        const placeholderRow = (ref: Ref<HTMLDivElement>) => (
          <Row ref={ref}>
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
        )

        return (
          <InView key={id}>
            {({ inView, ref }) =>
              inView ? interactiveRow(ref) : placeholderRow(ref)
            }
          </InView>
        )
      })}
    </Group>
  </Table>
)

export default EventsList
