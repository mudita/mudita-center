/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { createRef, Ref } from "react"
import { Contact } from "App/contacts/store/contacts.type"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import styled, { css } from "styled-components"
import Table, {
  Col,
  EmptyState,
  LoadingState,
  Row,
  TextPlaceholder,
} from "Renderer/components/core/table/table.component"
import { UseTableSelect } from "Renderer/utils/hooks/useTableSelect"
import { VisibleCheckbox } from "Renderer/components/rest/visible-checkbox/visible-checkbox"
import { Size } from "Renderer/components/core/input-checkbox/input-checkbox.component"
import Avatar, {
  AvatarSize,
  basicAvatarStyles,
} from "Renderer/components/core/avatar/avatar.component"
import {
  backgroundColor,
  borderColor,
} from "Renderer/styles/theming/theme-getters"
import Icon from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import { ContactActions } from "App/contacts/components/contact-details/contact-details.component"
import useTableScrolling from "Renderer/utils/hooks/use-table-scrolling"
import { createFullName } from "App/contacts/store/contacts.helpers"
import { intl } from "Renderer/utils/intl"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import ButtonComponent from "Renderer/components/core/button/button.component"
import Dropdown from "Renderer/components/core/dropdown/dropdown.component"
import { InView } from "react-intersection-observer"
import ScrollAnchorContainer from "Renderer/components/rest/scroll-anchor-container/scroll-anchor-container.component"
import { ResultsState } from "App/contacts/store/contacts.enum"
import { productionEnvironment } from "Renderer/constants/menu-elements"
import { HiddenButton } from "App/contacts/components/contact-list/contact-list.styled"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { defineMessages } from "react-intl"

export const Checkbox = styled(VisibleCheckbox)<{ visible?: boolean }>`
  margin: 0 auto;
`

export const lightAvatarStyles = css`
  background-color: ${backgroundColor("row")};
`

const InitialsAvatar = styled(Avatar)`
  margin-right: 1.2rem;
`

const ClickableCol = styled(Col)`
  height: 100%;
`

export const AvatarPlaceholder = styled.div`
  ${basicAvatarStyles};
  margin-right: 1.2rem;
`

const ActionsButton = styled.span`
  cursor: pointer;
`

const Actions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  flex: 1;
  padding-right: 3rem;
  box-sizing: border-box;
`

const BlockedIcon = styled(Icon).attrs(() => ({
  type: Type.Blocked,
}))`
  margin-left: 1.6rem;
`

const SelectableContacts = styled(Table)<{ mouseLock?: boolean }>`
  min-width: 32rem;
  flex: 1;
  overflow: auto;
  --columnsTemplate: 4rem 63rem 11.5rem 11.5rem auto;
  --columnsTemplateWithOpenedSidebar: 4rem 1fr;
  --columnsGap: 0;
  pointer-events: ${({ mouseLock }) => (mouseLock ? "none" : "all")};

  ${Row} {
    :hover {
      ${InitialsAvatar} {
        ${lightAvatarStyles};
      }
    }
  }
`
const SearchTitle = styled(Text)`
  padding: 1.4rem 3.4rem 1.7rem;
  border-bottom: 0.1rem solid ${borderColor("secondary")};
`
type SelectHook = Pick<
  UseTableSelect<Contact>,
  "getRowStatus" | "toggleRow" | "noneRowsSelected"
>

const messages = defineMessages({
  searchResultsTitle: {
    id: "module.contact.searchResultsTitle",
  }
})
export interface ContactSearchResultsProps extends ContactActions, SelectHook {
  activeRow?: Contact
  selectedContact: Contact | null
  onSelect: (contact: Contact) => void
  resultsState: ResultsState
  results: Contact[]
  searchValue: string | null
}

const ContactSearchResults: FunctionComponent<ContactSearchResultsProps> = ({
  results,
  activeRow,
  onSelect,
  onExport,
  onForward,
  onBlock,
  onUnblock,
  onDelete,
  resultsState,
  getRowStatus,
  toggleRow,
  searchValue,
  noneRowsSelected,
}) => {
  const { enableScroll, disableScroll, scrollable } = useTableScrolling()
  const tableRef = createRef<HTMLDivElement>()

  return (
    <div>
      <SearchTitle displayStyle={TextDisplayStyle.LargeBoldText}>
        {intl.formatMessage( messages.searchResultsTitle , {value: searchValue})}
      </SearchTitle>
      <SelectableContacts
        hideableColumnsIndexes={[2, 3, 4]}
        scrollable={scrollable}
        ref={tableRef}
      >
        {resultsState === ResultsState.Loaded &&
          (results.length ? (
            results.map((contact, index) => {
              const { selected } = getRowStatus(contact)
              const onChange = () => toggleRow(contact)
              const handleExport = () => onExport([contact])
              const handleForward = () => onForward(contact)
              const handleBlock = () => onBlock(contact)
              const handleUnblock = () => onUnblock(contact)
              const handleDelete = () => onDelete(contact)
              const handleSelect = () => onSelect(contact)

              const fullName = createFullName(contact)
              const createStyledFullName = () => {
                const { firstName, lastName } = contact
                if (!firstName && !lastName) {
                  return null
                }
                if (firstName && lastName) {
                  return (
                    <span>
                      {firstName} <strong>{lastName}</strong>
                    </span>
                  )
                }
                return (
                  <span>
                    <strong>{firstName || lastName}</strong>
                  </span>
                )
              }
              const phoneNumber =
                contact.primaryPhoneNumber || contact.secondaryPhoneNumber
              const nextContact = results[index + 1]
                ? results[index + 1]
                : results[index]
              const scrollActive =
                (nextContact || results[index]).id === activeRow?.id

              const interactiveRow = (ref: Ref<HTMLDivElement>) => (
                <Row
                  selected={selected}
                  active={(activeRow)?.id === contact.id}
                  ref={ref}
                >
                  <Col>
                    <Checkbox
                      checked={selected}
                      onChange={onChange}
                      size={Size.Small}
                      visible={!noneRowsSelected}
                    />
                  </Col>
                  <ClickableCol onClick={handleSelect}>
                    <InitialsAvatar
                      user={contact}
                      light={
                        selected ||
                        activeRow === contact
                      }
                      size={AvatarSize.Medium}
                    />
                    {createStyledFullName() ||
                      intl.formatMessage({
                        id: "module.contacts.listUnnamedContact",
                      })}
                    {contact.blocked && (
                      <BlockedIcon width={1.4} height={1.4} />
                    )}
                  </ClickableCol>
                  <Col>{phoneNumber}</Col>
                  <Col>
                    {contact.primaryPhoneNumber &&
                      contact.secondaryPhoneNumber &&
                      contact.secondaryPhoneNumber}
                  </Col>
                  <Col>
                    <Actions>
                      <Dropdown
                        toggler={
                          <ActionsButton>
                            <Icon type={Type.More} />
                          </ActionsButton>
                        }
                        onOpen={disableScroll}
                        onClose={enableScroll}
                      >
                        <HiddenButton
                          labelMessage={{
                            id: "module.contacts.exportAsVcard",
                          }}
                          Icon={Type.Upload}
                          onClick={handleExport}
                          displayStyle={DisplayStyle.Dropdown}
                          hide={productionEnvironment}
                        />
                        <HiddenButton
                          labelMessage={{
                            id: "module.contacts.forwardNamecard",
                          }}
                          Icon={Type.Forward}
                          onClick={handleForward}
                          displayStyle={DisplayStyle.Dropdown}
                          hide={productionEnvironment}
                        />
                        {contact.blocked ? (
                          <HiddenButton
                            labelMessage={{
                              id: "module.contacts.unblock",
                            }}
                            Icon={Type.Blocked}
                            onClick={handleUnblock}
                            displayStyle={DisplayStyle.Dropdown}
                            hide={productionEnvironment}
                          />
                        ) : (
                          <HiddenButton
                            labelMessage={{
                              id: "module.contacts.block",
                            }}
                            Icon={Type.Blocked}
                            onClick={handleBlock}
                            displayStyle={DisplayStyle.Dropdown}
                            hide={productionEnvironment}
                          />
                        )}
                        <ButtonComponent
                          labelMessage={{
                            id: "module.contacts.delete",
                          }}
                          Icon={Type.Delete}
                          onClick={handleDelete}
                          displayStyle={DisplayStyle.Dropdown}
                        />
                      </Dropdown>
                    </Actions>
                  </Col>
                  <ScrollAnchorContainer
                    key={contact.id}
                    active={scrollActive}
                  />
                </Row>
              )

              const placeholderRow = (ref: Ref<HTMLDivElement>) => {
                return (
                  <Row ref={ref}>
                    <Col />
                    <Col>
                      <AvatarPlaceholder />
                      <TextPlaceholder charsCount={fullName.length} />
                    </Col>
                    <Col>
                      {phoneNumber && (
                        <TextPlaceholder charsCount={phoneNumber.length} />
                      )}
                    </Col>
                    <ScrollAnchorContainer
                      key={contact.id}
                      active={scrollActive}
                    />
                  </Row>
                )
              }

              return (
                <InView key={contact.id}>
                  {({ inView, ref }) =>
                    inView ? interactiveRow(ref) : placeholderRow(ref)
                  }
                </InView>
              )
            })
          ) : (
            <EmptyState
              title={{ id: "module.contacts.emptyResultsListTitle" }}
              description={{
                id: "module.contacts.emptySearchDescription",
              }}
            />
          ))}
        {resultsState === ResultsState.Loading && <LoadingState />}
      </SelectableContacts>
    </div>
  )
}

export default ContactSearchResults
