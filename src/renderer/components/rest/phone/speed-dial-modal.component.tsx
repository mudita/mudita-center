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
  RenderInputSelectListItem,
} from "Renderer/components/core/input-select/input-select.component"
import { SpeedDialProps } from "Renderer/components/rest/phone/speed-dial-modal.container"
import { ListItem } from "Renderer/components/core/list/list.component"
import SearchableText from "Renderer/components/core/searchable-text/searchable-text.component"

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
  none: {
    id: "view.name.phone.contacts.edit.speedDialKeyEmptyOption",
  },
})

const renderItemValue = (item: Contact) => createFullName(item)
const renderListItem: RenderInputSelectListItem<Contact> = ({
  item,
  searchString,
  props,
}) => {
  const name = createFullName(item)

  if (name) {
    return (
      <ListItem {...props}>
        <SearchableText text={name} search={searchString} />
      </ListItem>
    )
  }

  return <ListItem {...props} />
}
const isOptionMatching = (item: Contact, query: string) => {
  const fullName = createFullName(item).toLowerCase()
  return fullName.includes(query.toLowerCase())
}

const StyledInputSelect = styled(InputSelect)`
  label {
    border: 0;
    padding-top: 1rem;
  }
`

const SpeedDialModal: FunctionComponent<SpeedDialProps> = ({
  editContact,
  onSave = noop,
  onClose = noop,
  flatList = [],
}) => {
  const [localData, setLocalData] = useState<[ContactID, Contact][]>([])
  const [disabled, setDisabled] = useState<Contact>()
  const speedDialList = Array.from({ length: 9 })
    .fill(null)
    .map((_, i) => {
      const speedDial = i + 1

      const localStateItem = localData.find(
        (contact) => contact[1].speedDial === speedDial
      )

      const globalStateItem = flatList.find(
        (contact) => contact.speedDial === speedDial
      )

      return {
        [speedDial]: (localStateItem && localStateItem[1]) || globalStateItem,
      }
    })

  const availableContacts = flatList.filter(
    (item: Contact) =>
      item.id !== "0" && (Boolean(item.firstName) || Boolean(item.lastName))
  )

  const onSaveClick = () => {
    localData.forEach((item) => editContact(...item))
    onSave()
  }

  return (
    <ModalComponent
      title={intl.formatMessage(messages.title)}
      size={ModalSize.Medium}
      onActionButtonClick={onSaveClick}
      actionButtonLabel={intl.formatMessage(messages.saveButton)}
      onClose={onClose}
      closeButtonLabel={intl.formatMessage(messages.cancelButton)}
    >
      <SpeedDialTable>
        <Labels size={RowSize.Small}>
          <Col>{intl.formatMessage(messages.speedDialLabel)}</Col>
          <Col>{intl.formatMessage(messages.contactLabel)}</Col>
        </Labels>
        {speedDialList.map((item: Record<number, Contact | undefined>, i) => {
          const speedDial = i + 1
          const contact = item[speedDial]

          const onChange = (contact: Contact) => {
            const newItem = [contact.id, { ...contact, speedDial }] as [
              ContactID,
              Contact
            ]

            setLocalData((currentState) => {
              const filteredCurrentState = currentState.filter(
                (item) => item[1].speedDial !== speedDial
              )
              return [...filteredCurrentState, newItem]
            })

            setDisabled(contact)
          }

          return (
            <Row size={RowSize.Small} key={i}>
              <Col>{speedDial}</Col>
              <Col>
                <StyledInputSelect
                  searchable
                  items={availableContacts}
                  selectedItem={contact ? contact : ""}
                  emptyItemValue={intl.formatMessage(messages.none)}
                  renderItemValue={renderItemValue}
                  renderListItem={renderListItem}
                  onSelect={onChange}
                  isItemMatching={isOptionMatching}
                  listStyles={css`
                    max-height: 30rem;
                  `}
                  disabledItems={[disabled]}
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
