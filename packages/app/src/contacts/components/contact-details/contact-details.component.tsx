/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { SidebarHeaderButton } from "App/__deprecated__/renderer/components/core/table/table.component"
import Icon from "App/__deprecated__/renderer/components/core/icon/icon.component"
import ButtonComponent from "App/__deprecated__/renderer/components/core/button/button.component"
import { DisplayStyle } from "App/__deprecated__/renderer/components/core/button/button.config"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import { defineMessages } from "react-intl"
import { noop } from "App/__deprecated__/renderer/utils/noop"
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
} from "App/__deprecated__/renderer/components/core/text/text.component"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"

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
  exportTooltipDescription: { id: "module.contacts.exportTooltipDescription" },
  deleteTooltipDescription: { id: "module.contacts.deleteTooltipDescription" },
  editTooltipDescription: { id: "module.contacts.editTooltipDescription" },
  forwardTooltipDescription: {
    id: "module.contacts.forwardTooltipDescription",
  },
  unblockTooltipDescription: {
    id: "module.contacts.unblockTooltipDescription",
  },
  blockTooltipDescription: { id: "module.contacts.blockTooltipDescription" },
})

interface ContactDetailsProps {
  contact?: Contact
  onExport: (ids: string[]) => void
  onForward: (contact: Contact) => void
  onBlock: (contact: Contact) => void
  onUnblock: (contact: Contact) => void
  onDelete: (id: string) => void
  onEdit: (contact: Contact) => void
  onCall: (phoneNumber: string) => void
  onMessage: (phoneNumber: string) => void
  onClose: () => void
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
      Icon={IconType.Calls}
      key="Call"
      onClick={callHandler}
    />,
    <ButtonComponent
      disabled={messageDisabled}
      displayStyle={DisplayStyle.InputIcon}
      Icon={IconType.Message}
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
  onClose,
}) => {
  if (contact) {
    const handleEdit = () => onEdit(contact)
    const handleExport = () => onExport([contact.id])
    const handleForward = () => onForward(contact)
    const handleBlock = () => onBlock(contact)
    const handleUnblock = () => onUnblock(contact)
    const handleDelete = () => onDelete(contact.id)
    const handleMessage = (phoneNumber: string) => onMessage(phoneNumber)

    const icons = (
      <>
        <SidebarHeaderButton
          description={messages.deleteTooltipDescription}
          iconType={IconType.Delete}
          onClick={handleDelete}
        />
        <SidebarHeaderButton
          description={messages.exportTooltipDescription}
          iconType={IconType.UploadDark}
          onClick={handleExport}
          data-testid={ContactDetailsTestIds.ExportButton}
        />
        {flags.get(Feature.ContactForwardEnabled) && (
          <SidebarHeaderButton
            description={messages.forwardTooltipDescription}
            iconType={IconType.Forward}
            onClick={handleForward}
          />
        )}
        <SidebarHeaderButton
          description={messages.editTooltipDescription}
          iconType={IconType.Edit}
          onClick={handleEdit}
        />
        {flags.get(Feature.ContactBlockingEnabled) &&
          (contact.blocked ? (
            <SidebarHeaderButton
              description={messages.unblockTooltipDescription}
              iconType={IconType.Blocked}
              onClick={handleUnblock}
            />
          ) : (
            <SidebarHeaderButton
              description={messages.blockTooltipDescription}
              iconType={IconType.Blocked}
              onClick={handleBlock}
            />
          ))}
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
        show
        onClose={onClose}
        headerRight={icons}
        data-testid={ContactDetailsTestIds.Details}
      >
        <BasicInfo>
          <Name data-testid={ContactDetailsTestIds.Name}>
            {contact.firstName} {contact.lastName}
          </Name>
          {contact.favourite && (
            <InfoItem>
              <Icon type={IconType.Favourites} />
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
                <Input
                  type={"text"}
                  label={intl.formatMessage(messages.noPhoneNumber)}
                />
              ) : (
                <div>
                  <Input
                    type={"text"}
                    data-testid={ContactDetailsTestIds.PrimaryPhoneInput}
                    value={contact.primaryPhoneNumber}
                    label={intl.formatMessage(messages.noPrimaryNumber)}
                    // TODO: Implement additional toggles for this feature
                    trailingIcons={
                      contact.primaryPhoneNumber
                        ? flags.get(Feature.ContactPhoneFieldIconsEnabled)
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
                    type={"text"}
                    data-testid={ContactDetailsTestIds.SecondaryPhoneInput}
                    value={contact.secondaryPhoneNumber}
                    label={intl.formatMessage(messages.noSecondNumber)}
                    // TODO: Implement additional toggles for this feature
                    trailingIcons={
                      contact.secondaryPhoneNumber
                        ? flags.get(Feature.ContactPhoneFieldIconsEnabled)
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
