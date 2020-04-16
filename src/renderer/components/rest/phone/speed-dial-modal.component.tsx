import React, { useState } from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import Modal from "Renderer/components/core/modal/modal.component"
import { ModalSize } from "Renderer/components/core/modal/modal.interface"
import { noop } from "Renderer/utils/noop"
import { Contact } from "Renderer/models/phone/phone.interface"
import Table, {
  Col,
  Labels,
  Row,
  RowSize,
} from "Renderer/components/core/table/table.component"
import styled from "styled-components"

interface SpeedDialModalProps {
  contacts?: Contact[]
  onSave?: () => void
  onClose?: () => void
}

const SpeedDialTable = styled(Table)`
  --labelBackground: none;
  margin: 1.6rem 0 4rem 0;
`

const ModalComponent = styled(Modal)`
  padding: 2rem;
  box-sizing: border-box;

  ${Labels} {
    border: none;

    ${Col} {
      :first-child {
        padding-left: 0;
      }
    }
  }
`

const SpeedDialModal: FunctionComponent<SpeedDialModalProps> = ({
  onSave = noop,
  onClose = noop,
  contacts = [],
}) => {
  const [speedDialContacts, setSpeedDialContacts] = useState(
    contacts.filter(contact => contact.speedDial)
  )

  return (
    <ModalComponent
      title={"Speed dial settings"}
      size={ModalSize.Medium}
      onActionButtonClick={onSave}
      actionButtonLabel={"Save"}
      onClose={onClose}
      closeButtonLabel={"Cancel"}
    >
      <SpeedDialTable>
        <Labels size={RowSize.Small}>
          <Col>Speed dial number</Col>
          <Col>Contact</Col>
        </Labels>
        {Array.from({ length: 8 }).map((_, index) => {
          const speedDialNumber = index + 2
          const speedDialContact = speedDialContacts.find(
            contact => contact.speedDial === speedDialNumber
          )
          return (
            <Row size={RowSize.Small} key={index}>
              <Col>{speedDialNumber}</Col>
              {speedDialContact ? (
                <Col>{speedDialContact.firstName}</Col>
              ) : (
                <Col>
                  <select>
                    <option value="">blabla</option>
                  </select>
                </Col>
              )}
            </Row>
          )
        })}
      </SpeedDialTable>
    </ModalComponent>
  )
}

export default SpeedDialModal
