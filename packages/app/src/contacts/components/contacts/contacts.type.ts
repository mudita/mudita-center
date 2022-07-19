/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  ContactActions,
  ContactDetailsActions,
} from "App/contacts/components/contact-details/contact-details.component"
import ContactPanel from "App/contacts/components/contact-panel/contact-panel.component"
import { AuthProviders } from "App/__deprecated__/renderer/models/auth/auth.typings"
import { History, LocationState } from "history"
import {
  ExternalProvider,
  Provider,
} from "App/__deprecated__/renderer/models/external-providers/external-providers.interface"
import { ComponentProps } from "react"
import {
  Contact,
  ContactID,
  NewContact,
  Store,
} from "App/contacts/reducers/contacts.interface"
import { PayloadAction } from "@reduxjs/toolkit"
import { RequestResponseStatus } from "App/core/types/request-response.interface"

export interface ContactErrorResponse {
  status: RequestResponseStatus
  message: string
}

type ContactPanelProps = ComponentProps<typeof ContactPanel>

export type PhoneProps = ContactActions &
  Omit<ContactPanelProps, "onContactSelect"> &
  ContactDetailsActions & {
    onSpeedDialSettingsSave: (contacts?: Contact[]) => void
    getContact: (id: ContactID) => Contact
    flatList: Contact[]
    speedDialChosenList: number[]
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setProviderData: (provider: AuthProviders, data: any) => void
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onManageButtonClick: (cb?: any) => Promise<void>
    isThreadOpened: (phoneNumber: string) => boolean
    onMessage: (history: History<LocationState>, phoneNumber: string) => void
    authorize: (
      provider: ExternalProvider
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ) => Promise<PayloadAction<Error | any>>
    addNewContact: (
      contact: NewContact
    ) => Promise<PayloadAction<Error | undefined>>
    importContact: (
      contact: NewContact
    ) => Promise<PayloadAction<Error | Contact>>
    editContact: (contact: Contact) => Promise<PayloadAction<Error | undefined>>
    deleteContacts: (
      ids: ContactID[]
    ) => Promise<PayloadAction<Error | undefined>>
    loadContacts: (provider: Provider) => Promise<Contact[]>
    addNewContactsToState: (contacts: Contact[]) => Promise<void>
    exportContacts: (contacts: Contact[]) => Promise<boolean>
  } & Store

export interface NewContactResponse extends NewContact {
  successfullyAdded: boolean
}

export type FormError = { field: keyof Contact; error: string }
