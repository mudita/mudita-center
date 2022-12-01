/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import ButtonComponent from "App/__deprecated__/renderer/components/core/button/button.component"
import { DisplayStyle } from "App/__deprecated__/renderer/components/core/button/button.config"
import { intl, textFormatters } from "App/__deprecated__/renderer/utils/intl"
import { Size } from "App/__deprecated__/renderer/components/core/input-checkbox/input-checkbox.component"
import { isNameAvailable } from "App/__deprecated__/renderer/components/rest/messages/is-name-available"
import { createFullName } from "App/contacts/helpers/contacts.helpers"
import modalService from "App/__deprecated__/renderer/components/core/modal/modal.service"
import DeleteModal from "App/__deprecated__/renderer/components/core/modal/delete-modal.component"
import { defineMessages } from "react-intl"
import { noop } from "App/__deprecated__/renderer/utils/noop"
import {
  Buttons,
  ContactSelectionManager,
  Panel,
} from "App/contacts/components/contact-panel/contact-panel.styled"
import { ContactPanelTestIdsEnum } from "App/contacts/components/contact-panel/contact-panel-test-ids.enum"
import {
  ErrorDataModal,
  LoadingStateDataModal,
} from "App/__deprecated__/renderer/components/rest/data-modal/data.modals"
import delayResponse from "@appnroll/delay-response"
import { ContactInputSearch } from "App/contacts/components/contact-input-search/contact-input-search.component"
import styled from "styled-components"
import { borderColor } from "App/__deprecated__/renderer/styles/theming/theme-getters"
import Text, {
  TextDisplayStyle,
} from "App/__deprecated__/renderer/components/core/text/text.component"
import { Contact, ContactID } from "App/contacts/reducers/contacts.interface"
import { PayloadAction } from "@reduxjs/toolkit"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"

const messages = defineMessages({
  title: { id: "module.contacts.deleteTitle" },
  export: { id: "module.contacts.selectionExport" },
  body: { id: "module.contacts.deleteMultipleContacts" },
  deletingText: { id: "module.contacts.deletingText" },
  deleteButton: { id: "module.contacts.delete" },
  searchResultsTitle: {
    id: "module.contacts.searchResultsTitle",
  },
})

const PanelWrapper = styled.div<{ showSearchResults: boolean }>`
  padding-bottom: ${({ showSearchResults }) =>
    showSearchResults ? "0" : "2.4rem"};
  border-bottom: solid 0.1rem ${borderColor("list")};
`
const SearchTitle = styled(Text)`
  padding: 2.7rem 3.2rem 2rem;
`
interface ContactPanelProps {
  contactsList: Contact[]
  onContactSelect: (contact: Contact) => void
  onManageButtonClick: () => void
  onNewButtonClick: () => void
  selectedContacts: string[]
  allItemsSelected: boolean
  toggleAll: () => void
  deleteContacts: (
    ids: ContactID[]
  ) => Promise<PayloadAction<Error | undefined>>
  resetRows: () => void
  editMode: boolean
  onSearchEnterClick?: () => void
  searchValue: string
  onSearchValueChange: (value: string) => void
  showSearchResults?: boolean
  results: Contact[]
  onExport: (ids: string[]) => void
}

const ContactPanel: FunctionComponent<ContactPanelProps> = ({
  onContactSelect,
  onManageButtonClick,
  onNewButtonClick,
  selectedContacts,
  allItemsSelected,
  toggleAll,
  deleteContacts,
  resetRows,
  editMode,
  onSearchEnterClick = noop,
  searchValue,
  onSearchValueChange,
  showSearchResults = false,
  results,
  onExport,
  contactsList,
}) => {
  const selectedItemsCount = selectedContacts.length
  const selectionMode = selectedItemsCount > 0

  const handleExport = (): void => {
    onExport(selectedContacts)
  }

  const openModal = () => {
    const selectedContact = contactsList.find(
      (contact) => contact.id === selectedContacts[0]
    )
    const nameAvailable =
      selectedContacts.length === 1 && isNameAvailable(selectedContact)
    const onDelete = async () => {
      void modalService.openModal(
        <LoadingStateDataModal textMessage={messages.deletingText} />,
        true
      )
      const { payload } = await delayResponse(deleteContacts(selectedContacts))
      if (payload) {
        void modalService.openModal(<ErrorDataModal />, true)
      } else {
        void modalService.closeModal()
      }
      resetRows()
    }

    const modalConfig = {
      title: intl.formatMessage(messages.title),
      message: {
        ...messages.body,
        values: {
          num: allItemsSelected ? -1 : selectedContacts.length,
          name: nameAvailable && createFullName(selectedContact),
          ...textFormatters,
        },
      },
      onDelete,
    }
    void modalService.openModal(<DeleteModal {...modalConfig} />)
  }
  return (
    <PanelWrapper showSearchResults={showSearchResults}>
      <Panel selectionMode={selectionMode}>
        {selectionMode ? (
          <ContactSelectionManager
            selectedItemsNumber={selectedItemsCount}
            allItemsSelected={allItemsSelected}
            message={{ id: "module.contacts.selectionsNumber" }}
            checkboxSize={Size.Medium}
            onToggle={allItemsSelected ? resetRows : toggleAll}
            buttons={[
              <ButtonComponent
                key="export"
                labelMessage={messages.export}
                displayStyle={DisplayStyle.Link}
                Icon={IconType.UploadDark}
                onClick={handleExport}
              />,
              <ButtonComponent
                key="delete"
                labelMessage={messages.deleteButton}
                displayStyle={DisplayStyle.Link}
                Icon={IconType.Delete}
                onClick={openModal}
              />,
            ]}
            data-testid={ContactPanelTestIdsEnum.SelectionManager}
          />
        ) : (
          <>
            <ContactInputSearch
              onContactSelect={onContactSelect}
              onSearchEnterClick={onSearchEnterClick}
              searchValue={searchValue}
              onSearchValueChange={onSearchValueChange}
              showSearchResults
              results={results}
            />
            <Buttons>
              <ButtonComponent
                displayStyle={DisplayStyle.Secondary}
                labelMessage={{ id: "module.contacts.importButton" }}
                onClick={onManageButtonClick}
                data-testid={ContactPanelTestIdsEnum.ImportButton}
              />
              <ButtonComponent
                labelMessage={{
                  id: "module.contacts.panelNewContactButton",
                }}
                onClick={onNewButtonClick}
                disabled={editMode}
                data-testid={ContactPanelTestIdsEnum.NewButton}
              />
            </Buttons>
          </>
        )}
      </Panel>
      {showSearchResults && (
        <SearchTitle
          displayStyle={TextDisplayStyle.Headline4}
          data-testid={ContactPanelTestIdsEnum.SearchTitle}
        >
          {intl.formatMessage(messages.searchResultsTitle, {
            value: searchValue,
          })}
        </SearchTitle>
      )}
    </PanelWrapper>
  )
}

export default ContactPanel
