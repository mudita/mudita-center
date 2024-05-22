/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { defineMessages } from "react-intl"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { SidebarHeaderButton } from "Core/__deprecated__/renderer/components/core/table/table.component"
import Icon from "Core/__deprecated__/renderer/components/core/icon/icon.component"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { noop } from "Core/__deprecated__/renderer/utils/noop"
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
} from "Core/contacts/components/contact-details/contact-details.styled"
import { ContactDetailsTestIds } from "Core/contacts/components/contact-details/contact-details-test-ids.enum"
import { Contact } from "Core/contacts/reducers/contacts.interface"
import Text, {
  TextDisplayStyle,
} from "Core/__deprecated__/renderer/components/core/text/text.component"
import { IconType } from "Core/__deprecated__/renderer/components/core/icon/icon-type"

const messages = defineMessages({
  favourites: { id: "module.contacts.favourites" },
  speedDial: { id: "module.contacts.speedDial" },
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
})

interface ContactDetailsProps {
  contact?: Contact
  onExport: (ids: string[]) => void
  onDelete: (id: string) => void
  onEdit: (contact: Contact) => void
  onClose: () => void
}

const ContactDetails: FunctionComponent<ContactDetailsProps> = ({
  contact,
  onEdit,
  onExport,
  onDelete,
  onClose,
}) => {
  if (contact) {
    const handleEdit = () => onEdit(contact)
    const handleExport = () => onExport([contact.id])
    const handleDelete = () => onDelete(contact.id)

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
        <SidebarHeaderButton
          description={messages.editTooltipDescription}
          iconType={IconType.Edit}
          onClick={handleEdit}
        />
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
                    value={contact.primaryPhoneNumber ?? ""}
                    label={intl.formatMessage(messages.noPrimaryNumber)}
                  />
                  <Input
                    type={"text"}
                    data-testid={ContactDetailsTestIds.SecondaryPhoneInput}
                    value={contact.secondaryPhoneNumber ?? ""}
                    label={intl.formatMessage(messages.noSecondNumber)}
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
