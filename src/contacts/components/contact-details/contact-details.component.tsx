import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import {
  SidebarHeaderIcon,
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

const messages = defineMessages({
  favourites: { id: "view.name.phone.contacts.details.favourites" },
  speedDial: { id: "view.name.phone.contacts.details.speedDial" },
  blocked: { id: "view.name.phone.contacts.details.blocked" },
  information: { id: "view.name.phone.contacts.details.information" },
  address: { id: "view.name.phone.contacts.details.address" },
  notes: { id: "view.name.phone.contacts.details.notes" },
  noPhoneNumber: { id: "view.name.phone.contacts.details.noPhoneNumber" },
  noEmail: { id: "view.name.phone.contacts.details.noEmail" },
  noAddress: { id: "view.name.phone.contacts.details.noAddress" },
  noNotes: { id: "view.name.phone.contacts.details.noNotes" },
  ice: { id: "view.name.phone.contacts.details.ice" },
})

export interface ContactActions {
  onExport: (contact: Contact) => void
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
  isTopicThreadOpened: (phoneNumber: string) => boolean
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
  isTopicThreadOpened,
  ...rest
}) => {
  if (contact) {
    const handleEdit = () => onEdit(contact)
    const handleExport = () => onExport(contact)
    const handleForward = () => onForward(contact)
    const handleBlock = () => onBlock(contact)
    const handleUnblock = () => onUnblock(contact)
    const handleDelete = () => onDelete(contact)
    const handleMessage = (phoneNumber: string) => onMessage(phoneNumber)

    const icons = (
      <>
        <SidebarHeaderIcon Icon={Type.Edit} onClick={handleEdit} />
        <SidebarHeaderIcon Icon={Type.Upload} onClick={handleExport} />
        <SidebarHeaderIcon Icon={Type.Forward} onClick={handleForward} />
        {contact.blocked ? (
          <SidebarHeaderIcon Icon={Type.Blocked} onClick={handleUnblock} />
        ) : (
          <SidebarHeaderIcon Icon={Type.Blocked} onClick={handleBlock} />
        )}
        <SidebarHeaderIcon Icon={Type.Delete} onClick={handleDelete} />
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
      <ContactDetailsWrapper {...rest} show headerRight={icons}>
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
                  /*trailingIcons={phoneActions(
                    contact.primaryPhoneNumber,
                    isTopicThreadOpened(contact.primaryPhoneNumber),
                    onCall,
                    handleMessage
                  )}
                  TODO: Uncomment when messaging will be available
                   */
                />
              )}
              {contact.secondaryPhoneNumber && (
                <Input
                  defaultValue={contact.secondaryPhoneNumber}
                  trailingIcons={phoneActions(
                    contact.secondaryPhoneNumber,
                    isTopicThreadOpened(contact.secondaryPhoneNumber),
                    onCall,
                    handleMessage
                  )}
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
