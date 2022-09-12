/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { defineMessages } from "react-intl"
import { ContactItemTestIdsEnum } from "App/contacts/components/contact-item/contact-item-test-ids.enum"
import {
  HiddenButton,
  Checkbox,
  InitialsAvatar,
  Actions,
  BlockedIcon,
  NameSpan,
  ClickableCol,
  ContactListRow,
} from "App/contacts/components/contact-item/contact-item.styled"
import { ContactItemProps } from "App/contacts/components/contact-item/contact-item.interface"
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
import ScrollAnchorContainer from "App/__deprecated__/renderer/components/rest/scroll-anchor-container/scroll-anchor-container.component"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { intl } from "App/__deprecated__/renderer/utils/intl"

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

export const ContactItem: FunctionComponent<ContactItemProps> = ({
  contact,
  selected,
  activeRow,
  editMode,
  toggleRow,
  onExport,
  onEdit,
  onForward,
  onBlock,
  onUnblock,
  onDelete,
  onSelect,
  disableScroll,
  enableScroll,
  style,
  scrollActive,
  showCheckbox,
}) => {
  const rowActive = activeRow?.id === contact.id
  const rowDisabled = editMode && !rowActive
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
  const phoneNumber = contact.primaryPhoneNumber || contact.secondaryPhoneNumber

  return (
    <ContactListRow
      useMinRowHeight
      selected={selected}
      active={rowActive}
      style={style}
    >
      <Col>
        <Checkbox
          checked={selected}
          onChange={onChange}
          size={Size.Medium}
          visible={showCheckbox}
        />
        {!showCheckbox && (
          <InitialsAvatar
            user={contact}
            light={selected || activeRow === contact}
            size={AvatarSize.Medium}
          />
        )}
      </Col>
      <ClickableCol
        onClick={handleSelect}
        data-testid={ContactItemTestIdsEnum.ContactRow}
        disabled={rowDisabled}
      >
        {createStyledFullName() ||
          intl.formatMessage(messages.listUnnamedContact)}
        {contact.blocked && <BlockedIcon width={1.4} height={1.4} />}
      </ClickableCol>
      <Col>
        <Text displayStyle={TextDisplayStyle.Paragraph1}>{phoneNumber}</Text>
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
              data-testid={ContactItemTestIdsEnum.ContactExportButton}
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
}
