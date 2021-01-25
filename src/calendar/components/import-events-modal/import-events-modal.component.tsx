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
import { ModalText } from "Renderer/components/rest/sync-modals/sync-contacts.styled"
import { defineMessages, FormattedDate } from "react-intl"
import Table, {
  Col,
  Labels,
  Row,
  RowSize,
} from "Renderer/components/core/table/table.component"
import styled from "styled-components"
import { ImportContactsModalTestIds } from "Renderer/components/rest/sync-modals/import-contacts-modal.types"
import { CalendarEvent } from "Renderer/models/calendar/calendar.interfaces"
import { TimeWindow } from "Renderer/components/rest/calendar/time-window.component"
import { RoundIconWrapper } from "Renderer/modules/overview/overview.modals"
import Icon from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import { ModalContent } from "Renderer/components/rest/calendar/calendar-modals.styled"

const messages = defineMessages({
  title: {
    id: "view.name.calendar.modal.import.title",
  },
  bodyTitle: {
    id: "view.name.calendar.modal.import.bodyTitle",
  },
  text: {
    id: "view.name.calendar.modal.import.text",
  },
  button: {
    id: "view.generic.button.ok",
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
        displayStyle={TextDisplayStyle.MediumLightText}
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
          data-testid={ImportContactsModalTestIds.Row}
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
