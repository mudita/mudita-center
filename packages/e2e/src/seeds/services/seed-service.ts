/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SeedDataResult, SeedParams } from "../types"
import { ContactService } from "./contact.service"

export class SeedService {
  constructor(private contactsService: ContactService) {}

  async seed({ contacts }: SeedParams): Promise<SeedDataResult> {
    const contactsResults: SeedDataResult = {}
    if (contacts) {
      const result = await this.contactsService.addContacts(contacts)
      contactsResults.contactsResult = result
    }

    return contactsResults
  }

  async removeSeededData({ contactsResult }: SeedDataResult) {
    await this.contactsService.removeContacts(
      contactsResult.map((contactResult) => contactResult.body.id)
    )
  }
}
