/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import Modal, {
  ModalProps,
} from "Renderer/components/core/modal/modal.component"
import { ModalSize } from "Renderer/components/core/modal/modal.interface"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { noop } from "Renderer/utils/noop"
import { intl, textFormatters } from "Renderer/utils/intl"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { ModalText } from "App/calendar/components/calendar-modals.styled"
import { defineMessages, FormattedDate } from "react-intl"
import Table, {
  Col,
  Labels,
  Row,
  RowSize,
} from "Renderer/components/core/table/table.component"
import styled from "styled-components"
import { CalendarEvent } from "App/calendar/store/calendar.interfaces"
import { TimeWindow } from "App/calendar/components/time-window.component"
import Icon from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import { ModalContent } from "App/calendar/components/calendar-modals.styled"
import { ImportEventsModalTestIds } from "App/calendar/components/import-events-modal/import-events-modal-test-ids.enum"
import { RoundIconWrapper } from "Renderer/components/core/modal-shared/modal-shared"

const messages = defineMessages({
  title: {
    id: "module.calendar.importTitle",
  },
  bodyTitle: {
    id: "module.calendar.importBodyTitle",
  },
  text: {
    id: "module.calendar.importText",
  },
  button: {
    id: "component.okButton",
  },
})

const Body = styled(ModalText)`
  margin-bottom: 1em;
  text-align: left;
`

const EventsList = styled(Table)`
  margin-top: 4.8rem;
  max-height: 21rem;
  --columnsTemplate: 20rem 1fr;
`

export interface ImportEventsModalProps extends ModalProps {
  events?: CalendarEvent[]
}

const ImportEventsModal: FunctionComponent<ImportEventsModalProps> = ({
  onClose = noop,
  events = [],
  onActionButtonClick,
}) => (
  <Modal
    size={ModalSize.Medium}
    title={intl.formatMessage(messages.title)}
    closeButton={false}
    onClose={onClose}
    actionButtonLabel={intl.formatMessage(messages.button)}
    onActionButtonClick={onActionButtonClick}
  >
    <ModalContent>
      <RoundIconWrapper>
        <Icon type={Type.Download} width={4} />
      </RoundIconWrapper>
      <Text
        displayStyle={TextDisplayStyle.LargeBoldText}
        message={messages.bodyTitle}
      />
      <Body
        displayStyle={TextDisplayStyle.MediumFadedText}
        message={{
          ...messages.text,
          values: { count: events?.length, ...textFormatters },
        }}
      />
    </ModalContent>
    <EventsList>
      <Labels size={RowSize.Small}>
        <Col>Events</Col>
      </Labels>
      {events.map((event, index) => (
        <Row
          size={RowSize.Tiny}
          key={index}
          data-testid={ImportEventsModalTestIds.Row}
        >
          <Col>{event.name}</Col>
          <Col>
            <FormattedDate
              value={event.startDate}
              year="numeric"
              month="long"
              day="2-digit"
              weekday="long"
            />
            , <TimeWindow startDate={event.startDate} endDate={event.endDate} />
          </Col>
        </Row>
      ))}
    </EventsList>
  </Modal>
)

export default ImportEventsModal
