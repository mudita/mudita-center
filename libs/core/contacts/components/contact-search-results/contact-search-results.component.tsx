/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { createRef, Ref } from "react"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import styled, { css } from "styled-components"
import Table, {
  Col,
  EmptyState,
  LoadingState,
  Row,
  TextPlaceholder,
} from "Core/__deprecated__/renderer/components/core/table/table.component"
import { VisibleCheckbox } from "Core/__deprecated__/renderer/components/rest/visible-checkbox/visible-checkbox"
import Avatar, {
  AvatarSize,
  basicAvatarStyles,
} from "Core/__deprecated__/renderer/components/core/avatar/avatar.component"
import { backgroundColor } from "Core/core/styles/theming/theme-getters"
import useTableScrolling from "Core/__deprecated__/renderer/utils/hooks/use-table-scrolling"
import { createFullName } from "Core/contacts/helpers/contacts.helpers"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { DisplayStyle } from "Core/__deprecated__/renderer/components/core/button/button.config"
import ButtonComponent from "Core/__deprecated__/renderer/components/core/button/button.component"
import Dropdown from "Core/__deprecated__/renderer/components/core/dropdown/dropdown.component"
import { InView } from "react-intersection-observer"
import { ContactSearchResultsTestIdsEnum } from "Core/contacts/components/contact-search-results/contact-search-results-test-ids.enum"
import { Contact, ResultState } from "Core/contacts/reducers/contacts.interface"
import { IconType } from "Core/__deprecated__/renderer/components/core/icon/icon-type"

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
  margin-left: 4rem;
`

export const AvatarPlaceholder = styled.div`
  ${basicAvatarStyles};
  margin-right: 1.2rem;
`

const Actions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  flex: 1;
  padding-right: 3rem;
  box-sizing: border-box;
`

const SelectableContacts = styled(Table)<{ mouseLock?: boolean }>`
  min-width: 32rem;
  flex: 1;
  overflow: auto;
  --columnsTemplate: auto 11.5rem 11.5rem 7.1rem;
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

const PhoneNumberCol = styled(Col)`
  overflow: hidden;
  height: calc(100% - 1rem);

  > p {
    height: 100%;
    margin: 0;
  }
`

interface ContactSearchResultProps {
  selectedContact: Contact | null
  onSelect: (contact: Contact) => void
  resultsState: ResultState
  results: Contact[]
  selectedItems: string[]
  onExport: (ids: string[]) => void
  onDelete: (id: string) => void
}

const ContactSearchResults: FunctionComponent<ContactSearchResultProps> = ({
  results,
  onSelect,
  onExport,
  onDelete,
  resultsState,
  selectedItems,
}) => {
  const { enableScroll, disableScroll, scrollable } = useTableScrolling()
  const tableRef = createRef<HTMLDivElement>()

  const emptyList = () => (
    <EmptyState
      title={{ id: "module.contacts.emptyResultsListTitle" }}
      description={{
        id: "module.contacts.emptySearchDescription",
      }}
      data-testid={ContactSearchResultsTestIdsEnum.Empty}
    />
  )

  return (
    <SelectableContacts
      hideableColumnsIndexes={[2, 3, 4]}
      scrollable={scrollable}
      ref={tableRef}
      data-testid={ContactSearchResultsTestIdsEnum.Table}
    >
      {resultsState === ResultState.Loaded &&
        (results.length
          ? results.map((contact) => {
              const selected = selectedItems.includes(contact.id)
              const handleExport = () => onExport([contact.id])
              const handleDelete = () => onDelete(contact.id)
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

              const interactiveRow = (ref: Ref<HTMLDivElement>) => (
                <Row selected={selected} ref={ref}>
                  <ClickableCol onClick={handleSelect}>
                    <InitialsAvatar
                      user={contact}
                      light={selected}
                      size={AvatarSize.Medium}
                    />
                    {createStyledFullName() ||
                      intl.formatMessage({
                        id: "module.contacts.listUnnamedContact",
                      })}
                  </ClickableCol>
                  <PhoneNumberCol>
                    <p>{phoneNumber}</p>
                  </PhoneNumberCol>
                  <PhoneNumberCol>
                    <p>
                      {contact.primaryPhoneNumber &&
                        contact.secondaryPhoneNumber &&
                        contact.secondaryPhoneNumber}
                    </p>
                  </PhoneNumberCol>
                  <Col>
                    <Actions>
                      <Dropdown onOpen={disableScroll} onClose={enableScroll}>
                        <ButtonComponent
                          labelMessage={{
                            id: "module.contacts.exportAsVcard",
                          }}
                          Icon={IconType.Upload}
                          onClick={handleExport}
                          displayStyle={DisplayStyle.Dropdown}
                        />
                        <ButtonComponent
                          labelMessage={{
                            id: "module.contacts.delete",
                          }}
                          Icon={IconType.Delete}
                          onClick={handleDelete}
                          displayStyle={DisplayStyle.Dropdown}
                        />
                      </Dropdown>
                    </Actions>
                  </Col>
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
          : emptyList())}
      {resultsState === ResultState.Empty && emptyList()}
      {resultsState === ResultState.Loading && (
        <LoadingState data-testid={ContactSearchResultsTestIdsEnum.Loading} />
      )}
    </SelectableContacts>
  )
}

export default ContactSearchResults
