import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import {
  SidebarHeaderIcon,
  SidebarProps,
} from "Renderer/components/core/table/table.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import { Contact } from "Renderer/models/phone/phone.typings"
import Icon from "Renderer/components/core/icon/icon.component"
import ButtonComponent from "Renderer/components/core/button/button.component"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import { intl } from "Renderer/utils/intl"
import { defineMessages } from "react-intl"
import { noop } from "Renderer/utils/noop"
import {
  AdditionalInfo,
  AdditionalInfoItem,
  BasicInfo,
  ContactDetailsWrapper,
  InfoItem,
  InfoItemName,
  InfoItemSpeedDialNumber,
  Input,
  Name,
} from "Renderer/components/rest/phone/contact-details.styled"

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
  onMessage: (phoneNumber: string, callerId: string) => void
}

interface ContactDetailsProps
  extends SidebarProps,
    ContactActions,
    ContactDetailsActions {
  contact?: Contact
  isTopicThreadOpening: (phoneNumber: string, callerId: string) => boolean
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
  isTopicThreadOpening,
  ...rest
}) => {
  if (contact) {
    const handleEdit = () => onEdit(contact)
    const handleExport = () => onExport(contact)
    const handleForward = () => onForward(contact)
    const handleBlock = () => onBlock(contact)
    const handleUnblock = () => onUnblock(contact)
    const handleDelete = () => onDelete(contact)
    const handleMessage = (phoneNumber: string) =>
      onMessage(phoneNumber, contact.id)

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
              <Icon type={Type.Blocked} />
              <InfoItemName message={messages.blocked} />
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
                  trailingIcons={phoneActions(
                    contact.primaryPhoneNumber,
                    isTopicThreadOpening(
                      contact.primaryPhoneNumber,
                      contact.id
                    ),
                    onCall,
                    handleMessage
                  )}
                />
              )}
              {contact.secondaryPhoneNumber && (
                <Input
                  defaultValue={contact.secondaryPhoneNumber}
                  trailingIcons={phoneActions(
                    contact.secondaryPhoneNumber,
                    isTopicThreadOpening(
                      contact.secondaryPhoneNumber,
                      contact.id
                    ),
                    onCall,
                    handleMessage
                  )}
                />
              )}
              {!contact.primaryPhoneNumber && !contact.secondaryPhoneNumber && (
                <Input label={intl.formatMessage(messages.noPhoneNumber)} />
              )}
              <Input
                defaultValue={contact.email}
                label={intl.formatMessage(messages.noEmail)}
              />
            </AdditionalInfoItem>
          </div>
          <div>
            <AdditionalInfoItem>
              <InfoItemName message={messages.address} />
              <Input
                type="textarea"
                outlined={false}
                defaultValue={fullAddress.join("\n")}
                label={intl.formatMessage(messages.noAddress)}
              />
            </AdditionalInfoItem>
            <AdditionalInfoItem>
              <InfoItemName message={messages.notes} />
              <Input
                type="textarea"
                outlined={false}
                defaultValue={contact.note}
                label={intl.formatMessage(messages.noNotes)}
              />
            </AdditionalInfoItem>
          </div>
        </AdditionalInfo>
      </ContactDetailsWrapper>
    )
  }

  return null
}

export default ContactDetails
