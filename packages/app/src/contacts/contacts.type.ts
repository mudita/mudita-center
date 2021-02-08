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

export type PhoneProps = ContactActions &
  Omit<ContactPanelProps, "onContactSelect"> &
  ContactDetailsActions & {
    onSpeedDialSettingsSave: (contacts?: Contact[]) => void
    getContact: (id: ContactID) => Contact
    flatList: Contact[]
    speedDialChosenList: number[]
    setProviderData: (provider: AuthProviders, data: any) => void
    onManageButtonClick: (cb?: any) => Promise<void>
    isTopicThreadOpened: (phoneNumber: string) => boolean
    onMessage: (history: History<LocationState>, phoneNumber: string) => void
    authorize: (provider: Provider) => Promise<string | undefined>
    addNewContact: (contact: NewContact) => Promise<string | void>
    editContact: (contact: Contact) => Promise<string | void>
    deleteContacts: (ids: ContactID[]) => Promise<string | void>
    loadContacts: (provider: Provider) => Promise<Contact[]>
  } & Store
