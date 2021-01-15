import { Contact } from "App/contacts/store/contacts.typings"

export type Props = Pick<Contact, "primaryPhoneNumber" | "secondaryPhoneNumber">
