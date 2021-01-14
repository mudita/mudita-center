import React, {
  createRef,
  RefObject,
  useLayoutEffect,
  useRef,
  useState,
} from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import Modal from "Renderer/components/core/modal/modal.component"
import { ModalSize } from "Renderer/components/core/modal/modal.interface"
import { noop } from "Renderer/utils/noop"
import { Contact, ContactID } from "App/contacts/store/contacts.typings"
import Table, {
  Col,
  Labels,
  Row,
  RowSize,
} from "Renderer/components/core/table/table.component"
import styled, { css } from "styled-components"
import { defineMessages } from "react-intl"
import { intl } from "Renderer/utils/intl"
import { createFullName } from "App/contacts/store/contacts.helpers"
import InputSelect, {
  RenderInputSelectListItem,
} from "Renderer/components/core/input-select/input-select.component"
import { SpeedDialProps } from "App/contacts/components/speed-dial-modal/speed-dial-modal.container"
import {
  ListItem,
  upperDropdownListStyles,
} from "Renderer/components/core/list/list.component"
import SearchableText from "Renderer/components/core/searchable-text/searchable-text.component"

const SpeedDialTable = styled(Table)`
  --labelBackground: none;
  margin: 1.6rem 0 4rem 0;
  overflow: initial !important;
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
    padding-top: 1rem;
  }
`

interface DropdownPosition {
  height: number
  upperDropdown: boolean
}

const calculateDropdownPosition = (
  row: HTMLDivElement | null
): DropdownPosition => {
  const parent = row?.parentElement
  const topSpace = row?.offsetTop ?? 0
  const bottomSpace = (parent?.offsetHeight || 0) - topSpace
  const upperDropdown = topSpace > bottomSpace

  return {
    height: Math.max(topSpace, bottomSpace),
    upperDropdown,
  }
}

const SpeedDialModal: FunctionComponent<SpeedDialProps> = ({
  editContact,
  onSave = noop,
  onClose = noop,
  flatList = [],
}) => {
  const [localData, setLocalData] = useState<[ContactID, Contact][]>([])
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

  const rowsRefs = useRef<RefObject<HTMLDivElement>[]>(
    speedDialList.map(() => createRef())
  )
  const [dropdownsPosition, setDropdownsPosition] = useState<
    DropdownPosition[]
  >([])

  const availableContacts = flatList.filter(
    (item: Contact) =>
      item.id !== "0" &&
      (Boolean(item.firstName) || Boolean(item.lastName)) &&
      speedDialList.every(
        (contact, index) => contact[index + 1]?.id !== item.id
      )
  )

  const onSaveClick = () => {
    localData.forEach((item) => editContact(...item))
    onSave()
  }

  useLayoutEffect(() => {
    const calculatedPositions = rowsRefs.current.map((rowRef) =>
      calculateDropdownPosition(rowRef.current)
    )

    setDropdownsPosition(calculatedPositions)
  }, [])

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
          const { height, upperDropdown } = dropdownsPosition.length
            ? dropdownsPosition[i]
            : { height: 0, upperDropdown: false }
          const [selectedItem, setSelectedItem] = useState<Contact | undefined>(
            item[speedDial]
          )

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

            setSelectedItem(contact)
          }

          return (
            <Row size={RowSize.Small} key={i} ref={rowsRefs.current[i]}>
              <Col>{speedDial}</Col>
              <Col>
                <StyledInputSelect
                  searchable
                  items={availableContacts}
                  selectedItem={selectedItem}
                  emptyItemValue={intl.formatMessage(messages.none)}
                  renderItemValue={renderItemValue}
                  renderListItem={renderListItem}
                  onSelect={onChange}
                  isItemMatching={isOptionMatching}
                  listStyles={css`
                    max-height: ${height}px;
                    ${upperDropdown && upperDropdownListStyles}
                  `}
                  disabledItems={[selectedItem]}
                  initialTransparentBorder
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
