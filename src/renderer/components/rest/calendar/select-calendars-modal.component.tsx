/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import React, { useState } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { defineMessages } from "react-intl"
import { ModalSize } from "Renderer/components/core/modal/modal.interface"
import { intl } from "Renderer/utils/intl"
import { RoundIconWrapper } from "Renderer/modules/overview/overview.modals"
import Icon from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { ModalText } from "App/contacts/components/sync-contacts-modal/sync-contacts.styled"
import Modal, {
  ModalProps,
} from "Renderer/components/core/modal/modal.component"
import { ModalContent } from "Renderer/components/rest/calendar/calendar-modals.styled"
import InputSelect, {
  RenderInputSelectListItem,
} from "Renderer/components/core/input-select/input-select.component"
import styled from "styled-components"
import { ListItem } from "Renderer/components/core/list/list.component"
import { Calendar } from "Renderer/models/calendar/calendar.interfaces"

const messages = defineMessages({
  title: {
    id: "view.name.calendar.modal.selectCalendars.title",
  },
  subtitle: {
    id: "view.name.calendar.modal.selectCalendars.subtitle",
  },
  body: {
    id: "view.name.calendar.modal.selectCalendars.body",
  },
  button: {
    id: "view.name.calendar.modal.selectCalendars.button",
  },
})

const Select = styled(InputSelect)`
  margin-top: 2rem;
  width: 27rem;
`

export interface SelectCalendarsModalProps extends ModalProps {
  calendars: Calendar[]
  onSynchronize: (calendar: Calendar) => void
}

const SelectCalendarsModal: FunctionComponent<SelectCalendarsModalProps> = ({
  calendars,
  onSynchronize,
  ...props
}) => {
  const primaryCalendar = calendars.find(({ primary }) => primary)
  const [selectedCalendar, setSelectedCalendar] = useState<
    Calendar | undefined
  >(primaryCalendar)

  const renderValue = (item: Calendar) => item.name

  const renderListItem: RenderInputSelectListItem<Calendar> = ({
    item,
    props,
  }) => <ListItem {...props}>{item.name}</ListItem>

  const handleSynchronize = () => {
    if (selectedCalendar) {
      onSynchronize(selectedCalendar)
    }
  }

  return (
    <Modal
      {...props}
      title={intl.formatMessage(messages.title)}
      size={ModalSize.Small}
      closeButton={false}
      actionButtonLabel={intl.formatMessage(messages.button)}
      onActionButtonClick={handleSynchronize}
      actionButtonDisabled={!selectedCalendar}
    >
      <ModalContent>
        <RoundIconWrapper>
          <Icon type={Type.CalendarIcon} width={4} />
        </RoundIconWrapper>
        <Text
          displayStyle={TextDisplayStyle.LargeBoldText}
          message={messages.subtitle}
        />
        <ModalText
          displayStyle={TextDisplayStyle.MediumFadedText}
          message={messages.body}
        />
        <Select
          label="Calendar"
          items={calendars}
          selectedItem={selectedCalendar}
          onSelect={setSelectedCalendar}
          renderItemValue={renderValue}
          renderListItem={renderListItem}
          outlined
        />
      </ModalContent>
    </Modal>
  )
}

export default SelectCalendarsModal
