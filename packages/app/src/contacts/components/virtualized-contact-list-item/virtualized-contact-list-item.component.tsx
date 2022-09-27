/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  Actions,
  BlockedIcon,
  Checkbox,
  ClickableCol,
  ContactListRow,
  InitialsAvatar,
  NameSpan,
} from "App/contacts/components/virtualized-contact-list-item/virtualized-contact-list-item.styled"
import { HiddenButton } from "App/contacts/components/contact-list/contact-list.styled"
import { Feature, flags } from "App/feature-flags"
import { AvatarSize } from "App/__deprecated__/renderer/components/core/avatar/avatar.component"
import ButtonComponent from "App/__deprecated__/renderer/components/core/button/button.component"
import { DisplayStyle } from "App/__deprecated__/renderer/components/core/button/button.config"
import Dropdown from "App/__deprecated__/renderer/components/core/dropdown/dropdown.component"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"
import { IconSize } from "App/__deprecated__/renderer/components/core/icon/icon.component"
import { Size } from "App/__deprecated__/renderer/components/core/input-checkbox/input-checkbox.component"
import { Col } from "App/__deprecated__/renderer/components/core/table/table.component"
import Text, {
  TextDisplayStyle,
} from "App/__deprecated__/renderer/components/core/text/text.component"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import React from "react"
import { defineMessages } from "react-intl"

import { VirtualizedContactListItemProps } from "App/contacts/components/virtualized-contact-list-item/virtualized-contact-list-item.interface"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import { VirtualizedContactListItemTestIds } from "App/contacts/components/virtualized-contact-list-item/virtualized-contact-list-item-test-ids"

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
  listUnnamedContact: {
    id: "module.contacts.listUnnamedContact",
  },
})

export const VirtualizedContactListItem: FunctionComponent<
  VirtualizedContactListItemProps
> = ({
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
  contact,
  isActive,
  testId,
  disableScroll,
  enableScroll,
}) => {
  const rowDisabled = editMode && !isActive
  const selected = selectedItems.includes(contact.id)
  const onChange = () => toggleRow(contact.id)
  const handleExport = () => onExport([contact.id])
  const handleEdit = () => onEdit(contact)
  const handleForward = () => onForward(contact)
  const handleBlock = () => onBlock(contact)
  const handleUnblock = () => onUnblock(contact)
  const handleDelete = () => onDelete(contact.id)
  const handleSelect = () => onSelect(contact)

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

  return (
    <>
      <ContactListRow
        useMinRowHeight
        selected={selected}
        active={isActive}
        data-testid={testId}
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
              light={selected || isActive}
              size={AvatarSize.Medium}
            />
          )}
        </Col>
        <ClickableCol
          onClick={handleSelect}
          data-testid={VirtualizedContactListItemTestIds.ContactRow}
          disabled={rowDisabled}
        >
          {createStyledFullName() ||
            intl.formatMessage(messages.listUnnamedContact)}
          {contact.blocked && (
            <BlockedIcon
              data-testid={VirtualizedContactListItemTestIds.BlockedIcon}
              width={1.4}
              height={1.4}
            />
          )}
        </ClickableCol>
        <Col>
          <Text displayStyle={TextDisplayStyle.Paragraph1}>
            {[contact.primaryPhoneNumber, contact.secondaryPhoneNumber].join(
              "  "
            )}
          </Text>
        </Col>
        <Col>
          <Actions>
            <Dropdown
              onOpen={disableScroll}
              onClose={enableScroll}
              togglerTestId={
                VirtualizedContactListItemTestIds.ContactRowDropdownToggler
              }
            >
              <HiddenButton
                labelMessage={messages.forwardNamecard}
                Icon={IconType.Forward}
                onClick={handleForward}
                displayStyle={DisplayStyle.Dropdown}
                hide={!flags.get(Feature.ContactForwardEnabled)}
                iconSize={IconSize.Medium}
                data-testid={
                  VirtualizedContactListItemTestIds.ContactForwardButton
                }
              />
              {contact.blocked ? (
                <HiddenButton
                  labelMessage={messages.unblock}
                  Icon={IconType.Blocked}
                  onClick={handleUnblock}
                  displayStyle={DisplayStyle.Dropdown}
                  hide={!flags.get(Feature.ContactBlockingEnabled)}
                  iconSize={IconSize.Medium}
                  data-testid={
                    VirtualizedContactListItemTestIds.ContactUnblockButton
                  }
                />
              ) : (
                <HiddenButton
                  labelMessage={messages.block}
                  Icon={IconType.Blocked}
                  onClick={handleBlock}
                  displayStyle={DisplayStyle.Dropdown}
                  hide={!flags.get(Feature.ContactBlockingEnabled)}
                  iconSize={IconSize.Medium}
                  data-testid={
                    VirtualizedContactListItemTestIds.ContactBlockButton
                  }
                />
              )}
              <ButtonComponent
                labelMessage={messages.editBulkAction}
                iconSize={IconSize.Medium}
                Icon={IconType.Edit}
                onClick={handleEdit}
                displayStyle={DisplayStyle.Dropdown}
                data-testid={
                  VirtualizedContactListItemTestIds.ContactEditButton
                }
              />
              <ButtonComponent
                labelMessage={messages.exportAsVcard}
                Icon={IconType.UploadDark}
                onClick={handleExport}
                iconSize={IconSize.Medium}
                displayStyle={DisplayStyle.Dropdown}
                data-testid={
                  VirtualizedContactListItemTestIds.ContactExportButton
                }
              />
              <ButtonComponent
                labelMessage={messages.deleteBulkAction}
                Icon={IconType.Delete}
                onClick={handleDelete}
                iconSize={IconSize.Medium}
                displayStyle={DisplayStyle.Dropdown}
                data-testid={
                  VirtualizedContactListItemTestIds.ContactDeleteButton
                }
              />
            </Dropdown>
          </Actions>
        </Col>
      </ContactListRow>
    </>
  )
}
