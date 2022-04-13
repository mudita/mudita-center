/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useState } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { defineMessages } from "react-intl"
import { ModalSize } from "Renderer/components/core/modal/modal.interface"
import { intl } from "Renderer/utils/intl"
import Icon from "Renderer/components/core/icon/icon.component"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { ModalText } from "App/contacts/components/sync-contacts-modal/sync-contacts.styled"
import Modal, {
  ModalProps,
} from "Renderer/components/core/modal/modal.component"
import { ModalContent } from "App/calendar/components/calendar-modals.styled"
import InputSelect, {
  RenderInputSelectListItem,
} from "Renderer/components/core/input-select/input-select.component"
import styled from "styled-components"
import { ListItem } from "Renderer/components/core/list/list.component"
import { Calendar } from "App/calendar/store/calendar.interfaces"
import { RoundIconWrapper } from "Renderer/components/core/modal-shared/modal-shared"
import { IconType } from "Renderer/components/core/icon/icon-type"

const messages = defineMessages({
  title: {
    id: "module.calendar.selectCalendarsTitle",
  },
  subtitle: {
    id: "module.calendar.selectCalendarsSubtitle",
  },
  body: {
    id: "module.calendar.selectCalendarsBody",
  },
  button: {
    id: "module.calendar.selectCalendarsButton",
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
          <Icon type={IconType.CalendarIcon} width={4} />
        </RoundIconWrapper>
        <Text
          displayStyle={TextDisplayStyle.Headline4}
          message={messages.subtitle}
        />
        <ModalText
          displayStyle={TextDisplayStyle.Paragraph4}
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
