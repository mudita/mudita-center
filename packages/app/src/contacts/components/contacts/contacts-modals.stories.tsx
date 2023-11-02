/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import {
  ModalBackdrop,
  ModalWrapper,
} from "App/__deprecated__/renderer/components/core/modal/modal.styled.elements"
import SpeedDialModal from "App/contacts/components/speed-dial-modal/speed-dial-modal.component"
import { noop } from "App/__deprecated__/renderer/utils/noop"
import { action } from "@storybook/addon-actions"
import DeleteModal from "App/__deprecated__/renderer/components/core/modal/delete-modal.component"
import { intl, textFormatters } from "App/__deprecated__/renderer/utils/intl"
import { messages } from "App/contacts/components/contacts/contacts.component"
import {
  createFullName,
  getFlatList,
} from "App/contacts/helpers/contacts.helpers"
import { contactsSeed } from "App/__deprecated__/seeds/contacts"
import { Contact } from "App/contacts/reducers"
import { defaultContact } from "App/contacts/components/contact-edit/contact-edit.component"

const flatList: any = getFlatList(contactsSeed)

const singleContact = ({
  favourite = false,
  blocked = false,
  speedDial,
}: Partial<Contact> = {}) => ({
  ...defaultContact,
  id: "107c8787-31a8-4499-ab43-776640fd3ca7",
  firstName: "John",
  lastName: "Doe",
  primaryPhoneNumber: "+40 211 456 285",
  secondaryPhoneNumber: "+37 030 922 283",
  email: "example@mudita.com",
  note: "Lorem ipsum dolor sit amet.",
  firstAddressLine: "50856 Mabelle Motorway",
  secondAddressLine: "USA",
  favourite,
  blocked,
  speedDial,
  ice: true,
})

export default {
  title: "Views|Contacts/Modals",
}

export const SpeedDialSettings = () => (
  <>
    <ModalWrapper>
      <SpeedDialModal
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
        editContact={noop as any}
        onSave={action("Save")}
        onClose={action("Close")}
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        flatList={flatList}
      />
    </ModalWrapper>
    <ModalBackdrop />
  </>
)

SpeedDialSettings.story = {
  name: "Speed dial settings",
}

export const DeleteContact = () => (
  <>
    <ModalWrapper>
      <DeleteModal
        title={intl.formatMessage({
          ...messages.deleteTitle,
        })}
        message={{
          ...messages.deleteText,
          values: {
            name: createFullName(singleContact()),
            ...textFormatters,
          },
        }}
        onDelete={action("Delete")}
        onClose={action("Close")}
      />
    </ModalWrapper>
    <ModalBackdrop />
  </>
)

DeleteContact.story = {
  name: "Delete contact",
}
