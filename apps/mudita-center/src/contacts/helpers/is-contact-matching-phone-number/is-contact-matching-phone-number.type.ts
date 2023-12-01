/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Contact } from "App/contacts/reducers/contacts.interface"

export type Props = Pick<Contact, "primaryPhoneNumber" | "secondaryPhoneNumber">
