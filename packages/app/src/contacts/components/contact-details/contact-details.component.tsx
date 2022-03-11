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
  ContactDetailsInfo,
  ContactDetailsLabel,
  ContactDetailsWrapper,
  InfoItem,
  Input,
  Name,
} from "App/contacts/components/contact-details/contact-details.styled"
import { ContactDetailsTestIds } from "App/contacts/components/contact-details/contact-details-test-ids.enum"
import { flags, Feature } from "App/feature-flags"
import { Contact } from "App/contacts/reducers/contacts.interface"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"

const messages = defineMessages({
  favourites: { id: "module.contacts.favourites" },
  speedDial: { id: "module.contacts.speedDial" },
  blocked: { id: "module.contacts.detailsBlocked" },
  information: { id: "module.contacts.information" },
  address: { id: "module.contacts.detailsAddress" },
  notes: { id: "module.contacts.notes" },
  noPhoneNumber: { id: "module.contacts.noPhoneNumber" },
  noPrimaryNumber: { id: "module.phone.noPrimaryNumber" },
  noSecondNumber: { id: "module.phone.noSecondaryNumber" },
  noEmail: { id: "module.contacts.noEmail" },
  noAddress: { id: "module.contacts.noAddress" },
  noNotes: { id: "module.contacts.noNotes" },
  ice: { id: "module.contacts.ice" },
})

export interface ContactActions {
  onExport: (contact: Contact[]) => void
  onForward: (contact: Contact) => void
  onBlock: (contact: Contact) => void
  onUnblock: (contact: Contact) => void
  onDelete: (contact: Contact) => void
  onEdit: (contact: Contact) => void
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
    const exportIcon = (
      <SidebarHeaderButton
        Icon={Type.UploadDark}
        onClick={handleExport}
        data-testid={ContactDetailsTestIds.ExportButton}
      />
    )
    const prodIcons = (
      <>
        <SidebarHeaderButton Icon={Type.Delete} onClick={handleDelete} />
        {exportIcon}
        <SidebarHeaderButton Icon={Type.Edit} onClick={handleEdit} />
      </>
    )
    const icons = (
      <>
        <SidebarHeaderButton Icon={Type.Delete} onClick={handleDelete} />
        {exportIcon}
        <SidebarHeaderButton Icon={Type.Forward} onClick={handleForward} />
        <SidebarHeaderButton Icon={Type.Edit} onClick={handleEdit} />
        {contact.blocked ? (
          <SidebarHeaderButton Icon={Type.Blocked} onClick={handleUnblock} />
        ) : (
          <SidebarHeaderButton Icon={Type.Blocked} onClick={handleBlock} />
        )}
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
        headerRight={flags.get(Feature.DevelopOnly) ? icons : prodIcons}
        data-testid={ContactDetailsTestIds.Details}
      >
        <BasicInfo>
          <Name data-testid={ContactDetailsTestIds.Name}>
            {contact.firstName} {contact.lastName}
          </Name>
          {contact.favourite && (
            <InfoItem>
              <Icon type={Type.Favourites} />
              <Text
                displayStyle={TextDisplayStyle.Title}
                color="secondary"
                message={messages.favourites}
              />
            </InfoItem>
          )}
        </BasicInfo>
        <AdditionalInfo key={contact.id}>
          <div>
            <AdditionalInfoItem>
              <Text
                displayStyle={TextDisplayStyle.Title}
                color="secondary"
                message={messages.information}
              />
              {!contact.primaryPhoneNumber && !contact.secondaryPhoneNumber ? (
                <Input label={intl.formatMessage(messages.noPhoneNumber)} />
              ) : (
                <div>
                  <Input
                    data-testid={ContactDetailsTestIds.PrimaryPhoneInput}
                    defaultValue={contact.primaryPhoneNumber}
                    label={intl.formatMessage(messages.noPrimaryNumber)}
                    // TODO: Implement additional toggles for this feature
                    trailingIcons={
                      contact.primaryPhoneNumber
                        ? flags.get(Feature.DevelopOnly)
                          ? phoneActions(
                              contact.primaryPhoneNumber,
                              !isThreadOpened(contact.primaryPhoneNumber),
                              onCall,
                              handleMessage
                            )
                          : undefined
                        : undefined
                    }
                  />
                  <Input
                    data-testid={ContactDetailsTestIds.SecondaryPhoneInput}
                    defaultValue={contact.secondaryPhoneNumber}
                    label={intl.formatMessage(messages.noSecondNumber)}
                    // TODO: Implement additional toggles for this feature
                    trailingIcons={
                      contact.secondaryPhoneNumber
                        ? flags.get(Feature.DevelopOnly)
                          ? phoneActions(
                              contact.secondaryPhoneNumber,
                              !isThreadOpened(contact.secondaryPhoneNumber),
                              onCall,
                              handleMessage
                            )
                          : undefined
                        : undefined
                    }
                  />
                </div>
              )}
            </AdditionalInfoItem>
          </div>
          <div>
            <AdditionalInfoItem>
              <Text
                displayStyle={TextDisplayStyle.Title}
                color="secondary"
                message={messages.address}
              />
              {fullAddress.length ? (
                <ContactDetailsInfo
                  data-testid={ContactDetailsTestIds.AddressDetails}
                >
                  {fullAddress.join("\n")}
                </ContactDetailsInfo>
              ) : (
                <ContactDetailsLabel>
                  {intl.formatMessage(messages.noAddress)}
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
