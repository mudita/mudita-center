import React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import Modal from "Renderer/components/core/modal/modal.component"
import { ModalSize } from "Renderer/components/core/modal/modal.interface"
import { noop } from "Renderer/utils/noop"
import { Contact, ContactCategory } from "Renderer/models/phone/phone.interface"
import Table, {
  Col,
  Labels,
  Row,
  RowSize,
} from "Renderer/components/core/table/table.component"
import styled from "styled-components"
import { defineMessages } from "react-intl"
import { intl } from "Renderer/utils/intl"
import { createFullName } from "Renderer/models/phone/phone.utils"

const SpeedDialTable = styled(Table)`
  --labelBackground: none;
  margin: 1.6rem 0 4rem 0;
`

const ModalComponent = styled(Modal)`
  ${Labels} {
    border: none;

    ${Col} {
      :first-child {
        padding-left: 0;
      }
    }
  }
`

const messages = defineMessages({
  title: { id: "view.name.phone.contacts.modal.speedDial.title" },
  saveButton: { id: "view.name.phone.contacts.modal.speedDial.saveButton" },
  cancelButton: { id: "view.name.phone.contacts.modal.speedDial.cancelButton" },
  speedDialLabel: {
    id: "view.name.phone.contacts.modal.speedDial.speedDialLabel",
  },
  contactLabel: { id: "view.name.phone.contacts.modal.speedDial.contactLabel" },
})

interface SpeedDialModalProps {
  contacts: ContactCategory[]
  onSave?: (contacts?: Contact[]) => void
  onClose?: () => void
}

const SpeedDialModal: FunctionComponent<SpeedDialModalProps> = ({
  onSave = noop,
  onClose = noop,
  contacts = [],
}) => {
  // TODO: Refactor during data integration
  // DO NOT REVIEW LINES 60-62
  const flatContactsList = contacts.reduce((acc: Contact[], group) => {
    return [...acc, ...group.contacts]
  }, [])

  return (
    <ModalComponent
      title={intl.formatMessage(messages.title)}
      size={ModalSize.Medium}
      onActionButtonClick={onSave}
      actionButtonLabel={intl.formatMessage(messages.saveButton)}
      onClose={onClose}
      closeButtonLabel={intl.formatMessage(messages.cancelButton)}
    >
      <SpeedDialTable>
        <Labels size={RowSize.Small}>
          <Col>{intl.formatMessage(messages.speedDialLabel)}</Col>
          <Col>{intl.formatMessage(messages.contactLabel)}</Col>
        </Labels>
        {Array.from({ length: 8 }).map((_, index) => {
          const speedDialNumber = index + 2
          const speedDialContact = flatContactsList.find(
            (contact) => contact.speedDial === speedDialNumber
          )

          return (
            <Row size={RowSize.Small} key={index}>
              <Col>{speedDialNumber}</Col>
              <Col>{speedDialContact && createFullName(speedDialContact)}</Col>
            </Row>
          )
        })}
      </SpeedDialTable>
    </ModalComponent>
  )
}

export default SpeedDialModal
