/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import {
  SidebarHeaderButton,
  SidebarProps,
} from "Renderer/components/core/table/table.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import { Contact } from "App/contacts/store/contacts.type"
import Icon, { IconSize } from "Renderer/components/core/icon/icon.component"
import ButtonComponent from "Renderer/components/core/button/button.component"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import { intl } from "Renderer/utils/intl"
import { defineMessages } from "react-intl"
import { noop } from "Renderer/utils/noop"
import {
  AdditionalInfo,
  AdditionalInfoItem,
  BasicInfo,
  ContactDetailsInfo,
  ContactDetailsLabel,
  ContactDetailsWrapper,
  InfoItem,
  InfoItemName,
  InfoItemSpeedDialNumber,
  Input,
  Name,
} from "App/contacts/components/contact-details/contact-details.styled"
import { productionEnvironment } from "Renderer/constants/menu-elements"
import { ContactDetailsTestIds } from "App/contacts/components/contact-details/contact-details-test-ids.enum"

const messages = defineMessages({
  favourites: { id: "module.contacts.details.favourites" },
  speedDial: { id: "module.contacts.details.speedDial" },
  blocked: { id: "module.contacts.details.blocked" },
  information: { id: "module.contacts.details.information" },
  address: { id: "module.contacts.details.address" },
  notes: { id: "module.contacts.details.notes" },
  noPhoneNumber: { id: "module.contacts.details.noPhoneNumber" },
  noEmail: { id: "module.contacts.details.noEmail" },
  noAddress: { id: "module.contacts.details.noAddress" },
  noNotes: { id: "module.contacts.details.noNotes" },
  ice: { id: "module.contacts.details.ice" },
})

export interface ContactActions {
  onExport: (contact: Contact[]) => void
  onForward: (contact: Contact) => void
  onBlock: (contact: Contact) => void
  onUnblock: (contact: Contact) => void
  onDelete: (contact: Contact) => void
}

export interface ContactDetailsActions {
  onEdit: (contact: Contact) => void
  onCall: (phoneNumber: string) => void
  onMessage: (phoneNumber: string) => void
}

interface ContactDetailsProps
  extends SidebarProps,
    ContactActions,
    ContactDetailsActions {
  contact?: Contact
  isThreadOpened: (phoneNumber: string) => boolean
}

export const phoneActions = (
  phoneNumber: string,
  messageDisabled: boolean,
  onCall: (input: string) => void,
  onMessage: (input: string) => void
): JSX.Element[] => {
  const callHandler = () => onCall(phoneNumber)
  const messageHandler = () => onMessage(phoneNumber)

  return [
    <ButtonComponent
      displayStyle={DisplayStyle.InputIcon}
      Icon={Type.Calls}
      key="Call"
      onClick={callHandler}
    />,
    <ButtonComponent
      disabled={messageDisabled}
      displayStyle={DisplayStyle.InputIcon}
      Icon={Type.Message}
      key="Message"
      onClick={messageHandler}
    />,
  ]
}

const ContactDetails: FunctionComponent<ContactDetailsProps> = ({
  contact,
  onEdit,
  onExport,
  onForward,
  onUnblock,
  onBlock,
  onDelete,
  onCall,
  onMessage,
  isThreadOpened,
  ...rest
}) => {
  if (contact) {
    const handleEdit = () => onEdit(contact)
    const handleExport = () => onExport([contact])
    const handleForward = () => onForward(contact)
    const handleBlock = () => onBlock(contact)
    const handleUnblock = () => onUnblock(contact)
    const handleDelete = () => onDelete(contact)
    const handleMessage = (phoneNumber: string) => onMessage(phoneNumber)
    // TODO: Remove prodIcons along with associated logic when features become available
    const exportIcon = <SidebarHeaderButton Icon={Type.UploadDark} onClick={handleExport} data-testid={ContactDetailsTestIds.ExportButton} />
    const prodIcons = (
      <>
        <SidebarHeaderButton Icon={Type.Edit} onClick={handleEdit} />
        {exportIcon}
        <SidebarHeaderButton Icon={Type.Delete} onClick={handleDelete} />
      </>
    )
    const icons = (
      <>
        <SidebarHeaderButton Icon={Type.Edit} onClick={handleEdit} />
        {exportIcon}
        <SidebarHeaderButton Icon={Type.Forward} onClick={handleForward} />
        {contact.blocked ? (
          <SidebarHeaderButton Icon={Type.Blocked} onClick={handleUnblock} />
        ) : (
          <SidebarHeaderButton Icon={Type.Blocked} onClick={handleBlock} />
        )}
        <SidebarHeaderButton Icon={Type.Delete} onClick={handleDelete} />
      </>
    )

    const fullAddress = []

    contact.firstAddressLine
      ? fullAddress.push(contact.firstAddressLine)
      : noop()
    contact.secondAddressLine
      ? fullAddress.push(contact.secondAddressLine)
      : noop()

    return (
      <ContactDetailsWrapper
        {...rest}
        show
        headerRight={productionEnvironment ? prodIcons : icons}
      >
        <BasicInfo>
          <Name>
            {contact.firstName} {contact.lastName}
          </Name>
          {contact.favourite && (
            <InfoItem>
              <Icon type={Type.Favourites} />
              <InfoItemName message={messages.favourites} />
            </InfoItem>
          )}
          {Boolean(contact.speedDial) && (
            <InfoItem>
              <InfoItemSpeedDialNumber>
                {contact.speedDial}
              </InfoItemSpeedDialNumber>
              <InfoItemName message={messages.speedDial} />
            </InfoItem>
          )}
          {contact.blocked && (
            <InfoItem>
              <Icon type={Type.Blocked} size={IconSize.Bigger} />
              <InfoItemName message={messages.blocked} />
            </InfoItem>
          )}
          {contact.ice && (
            <InfoItem>
              <Icon type={Type.Ice} />
              <InfoItemName message={messages.ice} />
            </InfoItem>
          )}
        </BasicInfo>
        <AdditionalInfo>
          <div>
            <AdditionalInfoItem>
              <InfoItemName message={messages.information} />
              {contact.primaryPhoneNumber && (
                <Input
                  defaultValue={contact.primaryPhoneNumber}
                  // TODO: Remove productionEnvironment along with associated logic when features become available
                  trailingIcons={
                    productionEnvironment
                      ? undefined
                      : phoneActions(
                          contact.primaryPhoneNumber,
                          isThreadOpened(contact.primaryPhoneNumber),
                          onCall,
                          handleMessage
                        )
                  }
                />
              )}
              {contact.secondaryPhoneNumber && (
                <Input
                  defaultValue={contact.secondaryPhoneNumber}
                  // TODO: Remove productionEnvironment along with associated logic when features become available
                  trailingIcons={
                    productionEnvironment
                      ? undefined
                      : phoneActions(
                          contact.secondaryPhoneNumber,
                          isThreadOpened(contact.secondaryPhoneNumber),
                          onCall,
                          handleMessage
                        )
                  }
                />
              )}
              {!contact.primaryPhoneNumber && !contact.secondaryPhoneNumber && (
                <Input label={intl.formatMessage(messages.noPhoneNumber)} />
              )}
              {contact.email ? (
                <ContactDetailsInfo>{contact.email}</ContactDetailsInfo>
              ) : (
                <ContactDetailsLabel>
                  {intl.formatMessage(messages.noEmail)}
                </ContactDetailsLabel>
              )}
            </AdditionalInfoItem>
          </div>
          <div>
            <AdditionalInfoItem>
              <InfoItemName message={messages.address} />
              {fullAddress.length ? (
                <ContactDetailsInfo>
                  {fullAddress.join("\n")}
                </ContactDetailsInfo>
              ) : (
                <ContactDetailsLabel>
                  {intl.formatMessage(messages.noAddress)}
                </ContactDetailsLabel>
              )}
            </AdditionalInfoItem>
            <AdditionalInfoItem>
              <InfoItemName message={messages.notes} />
              {contact.note ? (
                <ContactDetailsInfo>{contact.note}</ContactDetailsInfo>
              ) : (
                <ContactDetailsLabel>
                  {intl.formatMessage(messages.noNotes)}
                </ContactDetailsLabel>
              )}
            </AdditionalInfoItem>
          </div>
        </AdditionalInfo>
      </ContactDetailsWrapper>
    )
  }

  return null
}

export default ContactDetails
