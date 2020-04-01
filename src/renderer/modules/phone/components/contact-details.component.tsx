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

export interface ContactActions {
  onEdit: (contact: Contact) => void
  onExport: (contact: Contact) => void
  onForward: (contact: Contact) => void
  onBlock: (contact: Contact) => void
  onDelete: (contact: Contact) => void
}

export interface ContactDetailsActions {
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

const Input = styled(InputComponent).attrs(() => ({
  disabled: true,
}))<InputComponentProps>`
  width: 100%;
  background-color: transparent;
  padding: 2.4rem 0 1.6rem 0;
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
  const editHandler = () => onEdit(contact)
  const exportHandler = () => onExport(contact)
  const forwardHandler = () => onForward(contact)
  const blockHandler = () => onBlock(contact)
  const deleteHandler = () => onDelete(contact)

  const Icons = () => (
    <>
      <SidebarHeaderIcon Icon={Type.Edit} onClick={editHandler} />
      <SidebarHeaderIcon Icon={Type.Upload} onClick={exportHandler} />
      <SidebarHeaderIcon Icon={Type.Forward} onClick={forwardHandler} />
      <SidebarHeaderIcon Icon={Type.Blocked} onClick={blockHandler} />
      <SidebarHeaderIcon Icon={Type.Delete} onClick={deleteHandler} />
    </>
  )

  return (
    <ContactDetailsWrapper {...rest} show headerRight={<Icons />}>
      <BasicInfo>
        <Name>
          {contact.firstName} {contact.lastName}
        </Name>
        {contact.favourite && (
          <InfoItem>
            <Icon type={Type.Favourites} />
            <InfoItemName
              message={{ id: "view.name.phone.contacts.details.favourites" }}
            />
          </InfoItem>
        )}
        {contact.speedDial !== undefined && (
          <InfoItem>
            <InfoItemSpeedDialNumber>
              {contact.speedDial}
            </InfoItemSpeedDialNumber>
            <InfoItemName
              message={{ id: "view.name.phone.contacts.details.speedDial" }}
            />
          </InfoItem>
        )}
        {contact.blocked && (
          <InfoItem>
            <Icon type={Type.Blocked} />
            <InfoItemName
              message={{ id: "view.name.phone.contacts.details.blocked" }}
            />
          </InfoItem>
        )}
      </BasicInfo>
      <AdditionalInfo>
        <div>
          <AdditionalInfoItem>
            <InfoItemName
              message={{ id: "view.name.phone.contacts.details.information" }}
            />
            {contact.phoneNumbers.map(phoneNumber => {
              const callHandler = () => {
                onCall(phoneNumber)
              }
              const messageHandler = () => {
                onMessage(phoneNumber)
              }
              const trailingIcons = [
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
              return (
                <Input
                  key={phoneNumber}
                  defaultValue={phoneNumber}
                  trailingIcons={trailingIcons}
                />
              )
            })}
            <Input defaultValue={contact.email} />
          </AdditionalInfoItem>
        </div>
        <div>
          <AdditionalInfoItem>
            <InfoItemName
              message={{ id: "view.name.phone.contacts.details.address" }}
            />
            <Input defaultValue={contact.address} />
          </AdditionalInfoItem>
          <AdditionalInfoItem>
            <InfoItemName
              message={{ id: "view.name.phone.contacts.details.notes" }}
            />
            <Input
              type="textarea"
              inputLike={true}
              defaultValue={contact.notes}
            />
          </AdditionalInfoItem>
        </div>
      </AdditionalInfo>
    </ContactDetailsWrapper>
  )
}

export default ContactDetails
