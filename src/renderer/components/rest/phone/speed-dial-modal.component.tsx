import React, { useState } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import Modal from "Renderer/components/core/modal/modal.component"
import { ModalSize } from "Renderer/components/core/modal/modal.interface"
import { noop } from "Renderer/utils/noop"
import { Contact, ContactID } from "Renderer/models/phone/phone.typings"
import Table, {
  Col,
  Labels,
  Row,
  RowSize,
} from "Renderer/components/core/table/table.component"
import styled, { css } from "styled-components"
import { defineMessages } from "react-intl"
import { intl } from "Renderer/utils/intl"
import { createFullName } from "Renderer/models/phone/phone.helpers"
import InputSelect, {
  RenderListItemProps,
  renderSearchableText,
  SelectInputItem,
} from "Renderer/components/core/input-select/input-select.component"

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
  speedDialContacts?: Contact[]
  contacts: Contact[]
  onSave?: (contacts?: Contact[]) => void
  onClose?: () => void
}

const valueRender = (item: Contact) => createFullName(item)
const itemRender = ({
  item,
  searchString,
  props,
}: RenderListItemProps<Contact>) => {
  const name = createFullName(item)

  if (name) {
    return (
      <SelectInputItem {...props}>
        {renderSearchableText(name, searchString)}
      </SelectInputItem>
    )
  }

  return <SelectInputItem {...props} />
}

const SpeedDialModal: FunctionComponent<SpeedDialModalProps> = ({
  onSave = noop,
  onClose = noop,
  contacts = [],
  speedDialContacts,
}) => {
  const [speedDial, setSpeedDial] = useState<Record<ContactID, number>>({})
  const emptyContactList: Contact[] = Array.from({ length: 9 })
  speedDialContacts?.forEach((item) => {
    if (item.speedDial) {
      emptyContactList[item.speedDial - 1] = item
    }
  })

  const change = ({ id, speedDial }: Contact) => {
    console.log(id, speedDial)

    setSpeedDial((curr) => {
      if (speedDial) {
        return {
          ...curr,
          [id]: speedDial,
        }
      }

      return curr
    })
  }

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
        {emptyContactList.map((item: Contact | undefined, i) => {
          const itemInState = item && speedDial[item.id]

          console.log(itemInState)

          return (
            <Row size={RowSize.Small} key={i}>
              <Col>{itemInState || i + 1}</Col>
              <Col>
                <InputSelect
                  // searchable
                  onSelect={change}
                  options={contacts}
                  renderValue={valueRender}
                  renderListItem={itemRender}
                  listStyles={css`
                    max-height: 30rem;
                  `}
                />
              </Col>
            </Row>
          )
        })}
      </SpeedDialTable>
    </ModalComponent>
  )
}

export default SpeedDialModal
