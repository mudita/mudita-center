/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  ContactActions,
  ContactDetailsActions,
} from "App/contacts/components/contact-details/contact-details.component"
import { ContactPanelProps } from "App/contacts/components/contact-panel/contact-panel.component"
import {
  Contact,
  ContactID,
  NewContact,
  Store,
} from "App/contacts/store/contacts.type"
import { AuthProviders } from "Renderer/models/auth/auth.typings"
import { History, LocationState } from "history"
import { Provider } from "Renderer/models/external-providers/external-providers.interface"
import { DeviceResponseStatus } from "Backend/adapters/device-response.interface"

export interface ContactErrorResponse {
  status: DeviceResponseStatus
  message: string
}

export type PhoneProps = ContactActions &
  Omit<ContactPanelProps, "onContactSelect"> &
  ContactDetailsActions & {
    onSpeedDialSettingsSave: (contacts?: Contact[]) => void
    getContact: (id: ContactID) => Contact
    flatList: Contact[]
    speedDialChosenList: number[]
    setProviderData: (provider: AuthProviders, data: any) => void
    onManageButtonClick: (cb?: any) => Promise<void>
    isThreadOpened: (phoneNumber: string) => boolean
    onMessage: (history: History<LocationState>, phoneNumber: string) => void
    authorize: (provider: Provider) => Promise<string | undefined>
    addNewContact: (contact: NewContact) => Promise<ContactErrorResponse | void>
    importContact: (contact: NewContact) => Promise<string | void>
    editContact: (contact: Contact) => Promise<string | void>
    deleteContacts: (ids: ContactID[]) => Promise<string | void>
    loadContacts: (provider: Provider) => Promise<Contact[]>
  } & Store

export interface NewContactResponse extends NewContact {
  successfullyAdded: boolean
}

export type FormError = { field: keyof Contact; error: string }
