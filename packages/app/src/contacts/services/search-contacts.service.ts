/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Contact } from "App/contacts/dto"
import { ContactRepository } from "App/contacts/repositories"
import { DataIndex } from "App/index-storage/constants"
import { SearchService } from "App/search/services"

export class SearchContactsService {
  constructor(
    private readonly contactRepository: ContactRepository,
    private readonly searchService: SearchService
  ) {}
  searchContacts(query: string) {
    return this.searchService.search<Contact>(
      DataIndex.Contact,
      this.contactRepository,
      {
        query,
        searchConfig: {
          fields: {
            firstName: { boost: 1 },
            lastName: { boost: 2 },
            primaryPhoneNumber: { boost: 3 },
            secondaryPhoneNumber: { boost: 4 },
            email: { boost: 5 },
            firstAddressLine: { boost: 6 },
            secondAddressLine: { boost: 7 },
          },
          expand: true,
        },
      }
    )
  }
}
