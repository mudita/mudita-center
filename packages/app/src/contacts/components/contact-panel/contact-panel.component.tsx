/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import ButtonComponent from "Renderer/components/core/button/button.component"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import { intl, textFormatters } from "Renderer/utils/intl"
import { Size } from "Renderer/components/core/input-checkbox/input-checkbox.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import { UseTableSelect } from "Renderer/utils/hooks/useTableSelect"
import { isNameAvailable } from "Renderer/components/rest/messages/is-name-available"
import { createFullName } from "App/contacts/helpers/contacts.helpers"
import modalService from "Renderer/components/core/modal/modal.service"
import DeleteModal from "Renderer/components/core/modal/delete-modal.component"
import { defineMessages } from "react-intl"
import { noop } from "Renderer/utils/noop"
import {
  Buttons,
  ContactSelectionManager,
  Panel,
} from "App/contacts/components/contact-panel/contact-panel.styled"
import { ContactPanelTestIdsEnum } from "App/contacts/components/contact-panel/contact-panel-test-ids.enum"
import {
  ErrorDataModal,
  LoadingStateDataModal,
} from "Renderer/components/rest/data-modal/data.modals"
import delayResponse from "@appnroll/delay-response"
import ContactInputSearch from "App/contacts/components/contact-input-search/contact-input-search.component"
import { exportContacts } from "App/contacts/helpers/export-contacts/export-contacts"
import styled from "styled-components"
import { borderColor } from "Renderer/styles/theming/theme-getters"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { Contact, ContactID } from "App/contacts/reducers/contacts.interface"
import { PayloadAction } from "@reduxjs/toolkit"

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
interface Props {
  onContactSelect: (contact: Contact) => void
  onManageButtonClick: () => void
  onNewButtonClick: () => void
  selectedContacts: Contact[]
  allItemsSelected?: boolean
  toggleAll?: UseTableSelect<Contact>["toggleAll"]
  deleteContacts: (
    ids: ContactID[]
  ) => Promise<PayloadAction<Error | undefined>>
  resetRows: UseTableSelect<Contact>["resetRows"]
  editMode: boolean
  onSearchEnterClick?: () => void
  searchValue: string
  onSearchValueChange: (value: string) => void
  showSearchResults?: boolean
  results: Contact[]
}

const ContactPanel: FunctionComponent<Props> = ({
  onContactSelect,
  onManageButtonClick,
  onNewButtonClick,
  selectedContacts,
  allItemsSelected,
  toggleAll = noop,
  deleteContacts,
  resetRows,
  editMode,
  onSearchEnterClick = noop,
  searchValue,
  onSearchValueChange,
  showSearchResults = false,
  results,
}) => {
  const selectedItemsCount = selectedContacts.length
  const selectionMode = selectedItemsCount > 0

  const exportContactsAction = async () => {
    const exported = await exportContacts(selectedContacts)

    if (exported) {
      resetRows()
    }
  }

  const openModal = () => {
    const selectedContactsIds = selectedContacts.map(({ id }) => id)
    const nameAvailable =
      selectedContacts.length === 1 && isNameAvailable(selectedContacts[0])
    const onDelete = async () => {
      modalService.openModal(
        <LoadingStateDataModal textMessage={messages.deletingText} />,
        true
      )
      const { payload } = await delayResponse(
        deleteContacts(selectedContactsIds)
      )
      if (payload) {
        modalService.openModal(<ErrorDataModal />, true)
      } else {
        modalService.closeModal()
      }
      resetRows()
    }
    const modalConfig = {
      title: intl.formatMessage(messages.title),
      message: {
        ...messages.body,
        values: {
          num: allItemsSelected ? -1 : selectedContactsIds.length,
          name: nameAvailable && createFullName(selectedContacts[0]),
          ...textFormatters,
        },
      },
      onDelete,
      onClose: resetRows,
    }
    modalService.openModal(<DeleteModal {...modalConfig} />)
  }
  return (
    <PanelWrapper showSearchResults={showSearchResults}>
      <Panel selectionMode={selectionMode}>
        {selectionMode ? (
          <ContactSelectionManager
            selectedItemsNumber={selectedItemsCount}
            allItemsSelected={Boolean(allItemsSelected)}
            message={{ id: "module.contacts.selectionsNumber" }}
            checkboxSize={Size.Medium}
            onToggle={toggleAll}
            buttons={[
              <ButtonComponent
                key="export"
                label={intl.formatMessage(messages.export)}
                displayStyle={DisplayStyle.Link1}
                Icon={Type.UploadDark}
                onClick={exportContactsAction}
              />,
              <ButtonComponent
                key="delete"
                label={intl.formatMessage(messages.deleteButton)}
                displayStyle={DisplayStyle.Link1}
                Icon={Type.Delete}
                onClick={openModal}
              />,
            ]}
            data-testid={ContactPanelTestIdsEnum.SelectionManager}
          />
        ) : (
          <ContactInputSearch
            onContactSelect={onContactSelect}
            onSearchEnterClick={onSearchEnterClick}
            searchValue={searchValue}
            onSearchValueChange={onSearchValueChange}
            showSearchResults={showSearchResults}
            results={results}
          />
        )}
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
