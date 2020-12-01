import React from "react"
import Modal, {
  ModalProps,
} from "Renderer/components/core/modal/modal.component"
import { ModalSize } from "Renderer/components/core/modal/modal.interface"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { noop } from "Renderer/utils/noop"
import { intl } from "Renderer/utils/intl"
import { TextDisplayStyle } from "Renderer/components/core/text/text.component"
import { ModalText } from "Renderer/components/rest/sync-modals/sync-contacts.styled"
import { defineMessages } from "react-intl"
import { NewContact } from "Renderer/models/phone/phone.typings"
import Table, {
  Col,
  Labels,
  Row,
  RowSize,
} from "Renderer/components/core/table/table.component"
import { createFullName } from "Renderer/models/phone/phone.helpers"
import styled from "styled-components"
import { ImportContactsModalTestIds } from "Renderer/components/rest/sync-modals/import-contacts-modal.types"

const messages = defineMessages({
  title: {
    id: "view.name.phone.contacts.modal.import.title",
  },
  text: {
    id: "view.name.phone.contacts.modal.import.text",
  },
  button: {
    id: "view.name.phone.contacts.modal.import.button",
  },
})

const Body = styled(ModalText)`
  margin-bottom: 1em;
  text-align: left;
`

const ContactsList = styled(Table)`
  max-height: 40rem;
`

export interface ImportContactsModalProps extends ModalProps {
  contacts?: NewContact[]
}

const ImportContactsModal: FunctionComponent<ImportContactsModalProps> = ({
  onClose = noop,
  contacts = [],
  onActionButtonClick,
}) => (
  <Modal
    size={ModalSize.Small}
    title={intl.formatMessage(messages.title)}
    closeButton={false}
    onClose={onClose}
    actionButtonLabel={intl.formatMessage(messages.button)}
    onActionButtonClick={onActionButtonClick}
  >
    <Body
      displayStyle={TextDisplayStyle.MediumLightText}
      message={{ ...messages.text, values: { count: contacts?.length } }}
    />
    <ContactsList>
      <Labels size={RowSize.Small}>
        <Col>Name</Col>
        <Col>Phone</Col>
      </Labels>
      {contacts.map((contact, index) => (
        <Row
          size={RowSize.Tiny}
          key={index}
          data-testid={ImportContactsModalTestIds.Row}
        >
          <Col>{createFullName(contact)}</Col>
          <Col>
            {contact.primaryPhoneNumber || contact.secondaryPhoneNumber}
          </Col>
        </Row>
      ))}
    </ContactsList>
  </Modal>
)

export default ImportContactsModal
