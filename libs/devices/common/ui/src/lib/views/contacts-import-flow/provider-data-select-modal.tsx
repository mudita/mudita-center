/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  FunctionComponent,
  memo,
  PropsWithChildren,
  useCallback,
  useMemo,
} from "react"
import {
  Button,
  Checkbox,
  Modal,
  TableNew,
  TextInput,
  Typography,
} from "app-theme/ui"
import { defineMessages, formatMessage } from "app-localize/utils"
import { ButtonType, IconType, ModalSize } from "app-theme/models"
import styled from "styled-components"
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form"
import { ColumnMorePhones } from "../contacts/columns"
import { ContactToImportWithId } from "./contacts-import-flow"

const messages = defineMessages({
  title: {
    id: "apiDevice.contacts.import.providerDataSelectModal.title",
  },
  searchInputPlaceholder: {
    id: "apiDevice.contacts.import.providerDataSelectModal.searchInputPlaceholder",
  },
  allCheckboxLabel: {
    id: "apiDevice.contacts.import.providerDataSelectModal.allCheckboxLabel",
  },
  selectionSummary: {
    id: "apiDevice.contacts.import.providerDataSelectModal.selectionSummary",
  },
  importButton: {
    id: "apiDevice.contacts.import.providerDataSelectModal.importButton",
  },
})

interface Props {
  contacts: ContactToImportWithId[]
  opened: boolean
  onClose: VoidFunction
  onImport: (selectedIds: ContactToImportWithId["id"][]) => void
}

export const ProviderDataSelectModal: FunctionComponent<Props> = ({
  contacts,
  opened,
  onClose,
  onImport,
}) => {
  return (
    <Modal
      opened={opened}
      size={ModalSize.Medium}
      customStyles={{
        maxHeight: "67rem",
        height: "100%",
      }}
    >
      <Form>
        <Modal.CloseButton onClick={onClose} />
        <Modal.TitleIcon type={IconType.ContactsBook} />
        <Modal.Title message={messages.title.id} />
        <List contacts={contacts} />
        <Modal.Buttons>
          <ImportButton onClick={onImport} />
        </Modal.Buttons>
      </Form>
    </Modal>
  )
}

interface FormValues {
  selectedContacts: Record<string, boolean>
  searchQuery: string
}

const Form: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const form = useForm<FormValues>({
    defaultValues: {
      selectedContacts: {},
      searchQuery: "",
    },
  })

  return <FormProvider {...form}>{children}</FormProvider>
}

const ImportButton: FunctionComponent<{
  onClick: (selectedIds: ContactToImportWithId["id"][]) => void
}> = ({ onClick }) => {
  const { watch } = useFormContext<FormValues>()

  const selectedContacts = watch("selectedContacts")
  const selectedContactsCount =
    Object.values(selectedContacts).filter(Boolean).length

  const handleClick = useCallback(() => {
    const selectedIds = Object.entries(selectedContacts)
      .filter(([, value]) => value)
      .map(([key]) => key)

    onClick(selectedIds)
  }, [onClick, selectedContacts])

  return (
    <Button
      type={ButtonType.Primary}
      disabled={selectedContactsCount === 0}
      onClick={handleClick}
      message={messages.importButton.id}
      values={{
        count: selectedContactsCount,
      }}
    />
  )
}

const List: FunctionComponent<{
  contacts?: ContactToImportWithId[]
}> = ({ contacts = [] }) => {
  const { watch, control } = useFormContext<FormValues>()

  const searchQuery = watch("searchQuery")

  const filteredItems = useMemo(() => {
    return contacts.filter((contact) => {
      const { firstName, middleName, lastName, phoneNumbers } = contact

      const fullName =
        [firstName, middleName, lastName].filter(Boolean).join(" ") || ""

      const phoneNumbersString = phoneNumbers.map((p) => p.value).join(" ")

      const searchLower = searchQuery.toLowerCase()

      return (
        fullName.toLowerCase().includes(searchLower) ||
        phoneNumbersString.toLowerCase().includes(searchLower)
      )
    })
  }, [contacts, searchQuery])

  const contactsIds = useMemo(() => {
    return contacts.map((contact) => contact.id)
  }, [contacts])

  const rowRenderer = useCallback((contact: ContactToImportWithId) => {
    return <Row key={contact.id} contact={contact} />
  }, [])

  const table = useMemo(() => {
    return (
      <TableNew
        itemIdField={"id"}
        items={filteredItems}
        rowRenderer={rowRenderer}
        rowHeight={36}
      />
    )
  }, [filteredItems, rowRenderer])

  return (
    <>
      <Controller
        name={"searchQuery"}
        control={control}
        render={({ field }) => {
          return (
            <TextInput
              type={"search"}
              placeholder={formatMessage(messages.searchInputPlaceholder)}
              disableErrors
              {...field}
            />
          )
        }}
      />
      <ListWrapper>
        <SelectAllWrapper>
          <SelectAllCheckbox contactsIds={contactsIds} />
          <SelectedIndicator contactsCount={contactsIds.length} />
        </SelectAllWrapper>
        {table}
      </ListWrapper>
    </>
  )
}

const SelectAllCheckbox: FunctionComponent<{
  contactsIds: ContactToImportWithId["id"][]
}> = ({ contactsIds }) => {
  const { watch, setValue } = useFormContext<FormValues>()

  const selectedContacts = watch("selectedContacts")
  const allSelected = contactsIds.every((id) => selectedContacts[id])
  const noneSelected = Object.values(selectedContacts).every((v) => !v)

  const toggleAll = useCallback(() => {
    if (allSelected) {
      const newSelectedContacts = { ...selectedContacts }
      contactsIds.forEach((id) => {
        newSelectedContacts[id] = false
      })
      setValue("selectedContacts", newSelectedContacts)
    } else {
      const newSelectedContacts = { ...selectedContacts }
      contactsIds.forEach((id) => {
        newSelectedContacts[id] = true
      })
      setValue("selectedContacts", newSelectedContacts)
    }
  }, [allSelected, contactsIds, selectedContacts, setValue])

  return useMemo(() => {
    return (
      <Checkbox
        checked={allSelected}
        indeterminate={!allSelected && !noneSelected}
        onChange={toggleAll}
      >
        {formatMessage(messages.allCheckboxLabel)}
      </Checkbox>
    )
  }, [allSelected, noneSelected, toggleAll])
}

const SelectedIndicator: FunctionComponent<{ contactsCount?: number }> = ({
  contactsCount,
}) => {
  const { watch } = useFormContext<FormValues>()

  const selectedContacts = watch("selectedContacts")
  const selectedContactsCount =
    Object.values(selectedContacts).filter(Boolean).length

  return (
    <Typography.P5
      color={"grey1"}
      message={messages.selectionSummary.id}
      values={{
        count: selectedContactsCount,
        total: contactsCount,
      }}
    />
  )
}

const Row: FunctionComponent<{ contact: ContactToImportWithId }> = memo(
  ({ contact }) => {
    const { register } = useFormContext<FormValues>()

    const name = useMemo(() => {
      return (
        [contact.firstName, contact.middleName, contact.lastName]
          .filter(Boolean)
          .join(" ") || "N/A"
      )
    }, [contact.firstName, contact.lastName, contact.middleName])

    const morePhonesColumnData = useMemo(() => {
      return contact.phoneNumbers.map((p) => {
        return {
          phoneNumber: p.value,
        }
      })
    }, [contact.phoneNumbers])

    return (
      <ListRow>
        <Checkbox
          value={contact.id}
          {...register(`selectedContacts.${contact.id}`)}
        >
          {name}
        </Checkbox>
        <RowDetails>
          <Typography.P5 as={"span"}>
            {contact.phoneNumbers[0]?.value}
          </Typography.P5>
          <ColumnMorePhones phoneNumbers={morePhonesColumnData} />
        </RowDetails>
      </ListRow>
    )
  }
)

const ListWrapper = styled.div`
  width: calc(100% + var(--modal-padding) * 2);
  margin-left: calc(var(--modal-padding) * -1);
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-self: flex-start;

  .table-new {
    padding-top: 2.4rem;
    padding-right: 1rem;
    width: calc(100% - 2.4rem);

    &::-webkit-scrollbar {
      width: 0.2rem;
    }
  }
`

const SelectAllWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 3.8rem 1.5rem;
  border-bottom: 0.1rem solid ${({ theme }) => theme.app.color.grey3};
`

const ListRow = styled.div`
  height: 3.2rem;
  margin: 0.2rem 0;
  padding-left: 3.8rem;
  display: flex;
  gap: 1.4rem;
  flex-direction: row;
  align-items: center;

  label {
    cursor: pointer;
    align-self: center;
    gap: 1.4rem;
  }
`

const RowDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 0.8rem;

  p:first-child {
    flex: 1;
  }

  div:last-child {
    width: 3.6rem;
  }
`
