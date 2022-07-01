/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Contact } from "App/contacts/dto"

export interface ContactInputSearchProps {
  onContactSelect: (contact: Contact) => void
  onSearchEnterClick: () => void
  showSearchResults?: boolean
  searchValue: string
  onSearchValueChange: (value: string) => void
  results: Contact[]
}
