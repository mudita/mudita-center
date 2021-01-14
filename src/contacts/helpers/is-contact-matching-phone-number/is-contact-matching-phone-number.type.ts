import { Contact } from "App/contacts/store/phone.typings"

export type Props = Pick<Contact, "primaryPhoneNumber" | "secondaryPhoneNumber">
