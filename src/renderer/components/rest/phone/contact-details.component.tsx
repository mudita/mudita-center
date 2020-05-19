import React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import {
  Sidebar,
  SidebarHeaderIcon,
} from "Renderer/components/core/table/table.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import { SidebarProps } from "Renderer/components/core/table/table.interface"
import styled from "styled-components"
import { Contact } from "Renderer/models/phone/phone.interface"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import Icon from "Renderer/components/core/icon/icon.component"
import { fontWeight, textColor } from "Renderer/styles/theming/theme-getters"
import InputComponent from "Renderer/components/core/input-text/input-text.component"
import ButtonComponent from "Renderer/components/core/button/button.component"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import { InputComponentProps } from "Renderer/components/core/input-text/input-text.interface"
import { intl } from "Renderer/utils/intl"
import { defineMessages } from "react-intl"

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
  contact: Contact
}

const BasicInfo = styled.div`
  margin: 2.8rem auto 0 auto;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
`

const Name = styled(Text).attrs(() => ({
  displayStyle: TextDisplayStyle.SecondaryBoldHeading,
}))`
  grid-area: Name;
  text-align: center;
  line-height: 1.2;
  height: 5.6rem;
  width: 100%;
  margin-bottom: 1.4rem;
`

const InfoItem = styled.div`
  display: grid;
  grid-row-gap: 1.2rem;
  grid-template-rows: 1.8rem 1.2rem;
  grid-template-columns: 1fr;
  grid-auto-rows: auto;
  justify-items: center;
  align-items: center;
  margin: 0 2.4rem;
`

const InfoItemName = styled(Text).attrs(() => ({
  displayStyle: TextDisplayStyle.SmallFadedText,
}))`
  text-transform: uppercase;
  color: ${textColor("placeholder")};
`

const InfoItemSpeedDialNumber = styled(Text).attrs(() => ({
  displayStyle: TextDisplayStyle.TertiaryBoldHeading,
}))`
  font-size: 2.2rem;
  line-height: 1;
  font-weight: ${fontWeight("default")};
`

const AdditionalInfo = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 7.6rem;
  justify-content: space-between;

  > div {
    width: calc(50% - 3.2rem);
  }
`

const AdditionalInfoItem = styled.div`
  width: 100%;
  margin-bottom: 4.2rem;
`

const Input = styled(InputComponent).attrs(({ value, placeholder }) => ({
  placeholder: value ? undefined : placeholder,
  disabled: true,
}))<InputComponentProps>`
  background-color: transparent;
  padding: 2.4rem 0 1.6rem 0;

  div {
    transition: all 0s;
  }
`

const ContactDetailsWrapper = styled(Sidebar)`
  margin-top: 6.3rem;
`

const ContactDetails: FunctionComponent<ContactDetailsProps> = ({
  contact,
  onEdit,
  onExport,
  onForward,
  onBlock,
  onDelete,
  onCall,
  onMessage,
  ...rest
}) => {
  const handleEdit = () => onEdit(contact)
  const handleExport = () => onExport(contact)
  const handleForward = () => onForward(contact)
  const handleBlock = () => onBlock(contact)
  const handleDelete = () => onDelete(contact)

  const icons = (
    <>
      <SidebarHeaderIcon Icon={Type.Edit} onClick={handleEdit} />
      <SidebarHeaderIcon Icon={Type.Upload} onClick={handleExport} />
      <SidebarHeaderIcon Icon={Type.Forward} onClick={handleForward} />
      <SidebarHeaderIcon Icon={Type.Blocked} onClick={handleBlock} />
      <SidebarHeaderIcon Icon={Type.Delete} onClick={handleDelete} />
    </>
  )

  const phoneActions = (phoneNumber: string) => {
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
        displayStyle={DisplayStyle.InputIcon}
        Icon={Type.Message}
        key="Message"
        onClick={messageHandler}
      />,
    ]
  }
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
        {contact.speedDial !== undefined && (
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
                value={contact.primaryPhoneNumber}
                trailingIcons={phoneActions(contact.primaryPhoneNumber)}
              />
            )}
            {contact.secondaryPhoneNumber && (
              <Input
                value={contact.secondaryPhoneNumber}
                trailingIcons={phoneActions(contact.secondaryPhoneNumber)}
              />
            )}
            {!contact.primaryPhoneNumber && !contact.secondaryPhoneNumber && (
              <Input placeholder={intl.formatMessage(messages.noPhoneNumber)} />
            )}
            <Input
              value={contact.email}
              placeholder={intl.formatMessage(messages.noEmail)}
            />
          </AdditionalInfoItem>
        </div>
        <div>
          <AdditionalInfoItem>
            <InfoItemName message={messages.address} />
            <Input
              type="textarea"
              outlined={false}
              value={
                contact.firstAddressLine + "\n" + contact.secondAddressLine
              }
              placeholder={intl.formatMessage(messages.noAddress)}
            />
          </AdditionalInfoItem>
          <AdditionalInfoItem>
            <InfoItemName message={messages.notes} />
            <Input
              type="textarea"
              outlined={false}
              value={contact.note}
              placeholder={intl.formatMessage(messages.noNotes)}
            />
          </AdditionalInfoItem>
        </div>
      </AdditionalInfo>
    </ContactDetailsWrapper>
  )
}

export default ContactDetails
