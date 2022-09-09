/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { Ref, useState } from "react"
import { InView } from "react-intersection-observer"
import { defineMessages } from "react-intl"
import { ContactListTestIdsEnum } from "App/contacts/components/contact-list/contact-list-test-ids.enum"
import {
  HiddenButton,
  Checkbox,
  InitialsAvatar,
  AvatarPlaceholder,
  Actions,
  BlockedIcon,
  NameSpan,
  ClickableCol,
  ContactListRow,
  CategoryLabels,
} from "App/contacts/components/contact-list/contact-list.styled"
import { createFullName } from "App/contacts/helpers/contacts.helpers"
import { Feature, flags } from "App/feature-flags"
import { AvatarSize } from "App/__deprecated__/renderer/components/core/avatar/avatar.component"
import ButtonComponent from "App/__deprecated__/renderer/components/core/button/button.component"
import { DisplayStyle } from "App/__deprecated__/renderer/components/core/button/button.config"
import Dropdown from "App/__deprecated__/renderer/components/core/dropdown/dropdown.component"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"
import { IconSize } from "App/__deprecated__/renderer/components/core/icon/icon.component"
import { Size } from "App/__deprecated__/renderer/components/core/input-checkbox/input-checkbox.component"
import {
  Col,
  Group,
  TextPlaceholder,
} from "App/__deprecated__/renderer/components/core/table/table.component"
import Text, {
  TextDisplayStyle,
} from "App/__deprecated__/renderer/components/core/text/text.component"
import ScrollAnchorContainer from "App/__deprecated__/renderer/components/rest/scroll-anchor-container/scroll-anchor-container.component"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import {
  ContactGroupProps,
  ScrollWrapperProps,
} from "App/contacts/components/contact-group/contact-group.interface"
import InfiniteScroll from "react-infinite-scroller"

const messages = defineMessages({
  forwardNamecard: {
    id: "module.contacts.forwardNamecard",
  },
  unblock: {
    id: "module.contacts.unblock",
  },
  block: {
    id: "module.contacts.block",
  },
  exportAsVcard: {
    id: "module.contacts.exportAsVcard",
  },
  editBulkAction: {
    id: "module.contacts.editBulkAction",
  },
  deleteBulkAction: {
    id: "module.contacts.deleteBulkAction",
  },
  emptyListTitle: {
    id: "module.contacts.emptyListTitle",
  },
  emptySearchDescription: {
    id: "module.contacts.emptySearchDescription",
  },
  emptyPhonebook: {
    id: "module.contacts.emptyPhonebook",
  },
  listUnnamedContact: {
    id: "module.contacts.listUnnamedContact",
  },
})

const ScrollWrapper: FunctionComponent<ScrollWrapperProps> = ({
  active,
  page,
  parentRef,
  loadMore,
  hasMore,
  children,
}) => (
  <>
    {active ? (
      <InfiniteScroll
        pageStart={page}
        loadMore={loadMore}
        hasMore={hasMore}
        useWindow={false}
        getScrollParent={() => parentRef as HTMLElement | null}
      >
        {children}
      </InfiniteScroll>
    ) : (
      children
    )}
  </>
)

export const ContactGroup: FunctionComponent<ContactGroupProps> = ({
  parentRef,
  category,
  contacts,
  activeRow,
  editMode,
  selectedItems,
  toggleRow,
  onExport,
  onEdit,
  onForward,
  onBlock,
  onUnblock,
  onDelete,
  onSelect,
  categoryIndex,
  componentContactList,
  disableScroll,
  enableScroll,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(0)

  const handleLoadMore = (page: number) => {
    setCurrentPage(page)
  }

  const rightOffset =
    contacts.length > 25 ? (currentPage + 1) * 25 : contacts.length

  return (
    <Group data-testid={ContactListTestIdsEnum.ContactListGroup}>
      <CategoryLabels>
        <Col>
          <Text displayStyle={TextDisplayStyle.Headline4}>{category}</Text>
        </Col>
        <Col />
      </CategoryLabels>

      <ScrollWrapper
        page={currentPage}
        parentRef={parentRef}
        active={contacts.length > 25}
        hasMore={rightOffset < contacts.length}
        loadMore={handleLoadMore}
      >
        {contacts.slice(0, rightOffset).map((contact, index) => {
          const rowActive = activeRow?.id === contact.id
          const rowDisabled = editMode && !rowActive
          const selected = selectedItems.includes(contact.id)
          const onChange = () => toggleRow(contact.id)
          const handleExport = () => onExport([contact.id])
          const handleEdit = () => onEdit(contact)
          const handleForward = () => onForward(contact)
          const handleBlock = () => onBlock(contact)
          const handleUnblock = () => onUnblock(contact)
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
                <NameSpan displayStyle={TextDisplayStyle.Paragraph1}>
                  {firstName} {lastName}
                </NameSpan>
              )
            }
            return (
              <NameSpan displayStyle={TextDisplayStyle.Paragraph1}>
                {firstName || lastName}
              </NameSpan>
            )
          }
          const phoneNumber =
            contact.primaryPhoneNumber || contact.secondaryPhoneNumber
          const nextContact = contacts[index + 1]
            ? contacts[index + 1]
            : componentContactList[categoryIndex + 1]?.contacts[0]
          const scrollActive =
            (nextContact || contacts[index]).id === activeRow?.id

          const interactiveRow = (ref: Ref<HTMLDivElement>) => (
            <ContactListRow
              useMinRowHeight
              selected={selected}
              active={rowActive}
              ref={ref}
            >
              <Col>
                <Checkbox
                  checked={selected}
                  onChange={onChange}
                  size={Size.Medium}
                  visible={Boolean(selectedItems.length !== 0)}
                />
                {selectedItems.length === 0 && (
                  <InitialsAvatar
                    user={contact}
                    light={selected || activeRow === contact}
                    size={AvatarSize.Medium}
                  />
                )}
              </Col>
              <ClickableCol
                onClick={handleSelect}
                data-testid={ContactListTestIdsEnum.ContactRow}
                disabled={rowDisabled}
              >
                {createStyledFullName() ||
                  intl.formatMessage(messages.listUnnamedContact)}
                {contact.blocked && <BlockedIcon width={1.4} height={1.4} />}
              </ClickableCol>
              <Col>
                <Text displayStyle={TextDisplayStyle.Paragraph1}>
                  {phoneNumber}
                </Text>
              </Col>
              <Col>
                <Text displayStyle={TextDisplayStyle.Paragraph1}>
                  {contact.primaryPhoneNumber &&
                    contact.secondaryPhoneNumber &&
                    contact.secondaryPhoneNumber}
                </Text>
              </Col>
              <Col>
                <Actions>
                  <Dropdown onOpen={disableScroll} onClose={enableScroll}>
                    <HiddenButton
                      labelMessage={messages.forwardNamecard}
                      Icon={IconType.Forward}
                      onClick={handleForward}
                      displayStyle={DisplayStyle.Dropdown}
                      hide={!flags.get(Feature.ContactForwardEnabled)}
                      iconSize={IconSize.Medium}
                    />
                    {contact.blocked ? (
                      <HiddenButton
                        labelMessage={messages.unblock}
                        Icon={IconType.Blocked}
                        onClick={handleUnblock}
                        displayStyle={DisplayStyle.Dropdown}
                        hide={!flags.get(Feature.ContactBlockingEnabled)}
                        iconSize={IconSize.Medium}
                      />
                    ) : (
                      <HiddenButton
                        labelMessage={messages.block}
                        Icon={IconType.Blocked}
                        onClick={handleBlock}
                        displayStyle={DisplayStyle.Dropdown}
                        hide={!flags.get(Feature.ContactBlockingEnabled)}
                        iconSize={IconSize.Medium}
                      />
                    )}
                    <ButtonComponent
                      labelMessage={messages.editBulkAction}
                      iconSize={IconSize.Medium}
                      Icon={IconType.Edit}
                      onClick={handleEdit}
                      displayStyle={DisplayStyle.Dropdown}
                    />
                    <ButtonComponent
                      labelMessage={messages.exportAsVcard}
                      Icon={IconType.UploadDark}
                      onClick={handleExport}
                      iconSize={IconSize.Medium}
                      displayStyle={DisplayStyle.Dropdown}
                      data-testid={
                        ContactListTestIdsEnum.ContactExportButton
                      }
                    />
                    <ButtonComponent
                      labelMessage={messages.deleteBulkAction}
                      Icon={IconType.Delete}
                      onClick={handleDelete}
                      iconSize={IconSize.Medium}
                      displayStyle={DisplayStyle.Dropdown}
                    />
                  </Dropdown>
                </Actions>
              </Col>
              <ScrollAnchorContainer key={contact.id} active={scrollActive} />
            </ContactListRow>
          )

          const placeholderRow = (ref: Ref<HTMLDivElement>) => {
            return (
              <ContactListRow ref={ref}>
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
                <ScrollAnchorContainer key={contact.id} active={scrollActive} />
              </ContactListRow>
            )
          }

          return (
            <InView key={contact.id}>
              {({ inView, ref }) =>
                inView ? interactiveRow(ref) : placeholderRow(ref)
              }
            </InView>
          )
        })}
      </ScrollWrapper>
    </Group>
  )
}
