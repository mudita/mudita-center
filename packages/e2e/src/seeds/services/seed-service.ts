/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SeedDataResult, SeedParams } from "../types"
import { ContactService } from "./contact.service"
import { TemplatesService } from "./templates.service"

export class SeedService {
  constructor(
    private contactsService: ContactService,
    private templateService: TemplatesService
  ) {}

  async seed({ contacts, templates }: SeedParams): Promise<SeedDataResult> {
    const contactsResults: SeedDataResult = {}
    if (contacts) {
      const result = await this.contactsService.addContacts(contacts)
      contactsResults.contactsResult = result
    }

    if (templates) {
      const result = await this.templateService.addTemplates(templates)
      contactsResults.templatesResult = result
    }

    return contactsResults
  }

  async removeSeededData({ contactsResult, templatesResult }: SeedDataResult) {
    await this.contactsService.removeContacts(
      contactsResult.map((contactResult) => contactResult.body.id)
    )
    await this.templateService.removeTemplates(
      templatesResult.map((templateResult) => templateResult.body.id)
    )
  }
}
