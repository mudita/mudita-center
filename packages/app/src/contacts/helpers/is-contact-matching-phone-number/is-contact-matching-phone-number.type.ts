import { Contact } from "App/contacts/store/contacts.type"

export type Props = Pick<Contact, "primaryPhoneNumber" | "secondaryPhoneNumber">
