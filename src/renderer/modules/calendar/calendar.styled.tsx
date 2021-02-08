/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import styled from "styled-components"
import Table, { Col, Row } from "Renderer/components/core/table/table.component"
import { borderColor } from "Renderer/styles/theming/theme-getters"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { CalendarEventProps } from "Renderer/modules/calendar/calendar.interface"
import { FormattedDate } from "react-intl"
import React from "react"
import { TimeWindow } from "Renderer/components/rest/calendar/time-window.component"
import { CalendarTestIds } from "Renderer/modules/calendar/calendar-test-ids.enum"

export const EventsList = styled(Table)`
  --columnsTemplate: 5fr 3fr 3fr;
  --columnsGap: 4rem;
  border-top: solid 0.1rem ${borderColor("list")};
`

export const Header = styled(Text).attrs({
  displayStyle: TextDisplayStyle.LargeBoldText,
})`
  padding: 4rem 4rem 1.7rem 4rem;
`
export const Event: FunctionComponent<
  CalendarEventProps & { active?: boolean }
> = ({ event, active }) => {
  const { name, startDate, endDate } = event

  return (
    <Row active={active} data-testid={CalendarTestIds.Event}>
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
}
