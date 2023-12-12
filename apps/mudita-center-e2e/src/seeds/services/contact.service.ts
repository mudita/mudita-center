/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ContactPresenter } from "../presenters/contact.presenter"
import { Response, Endpoint, Method } from "../../pure/types"
import { RequestsService } from "../../device/services/requests.service"
import { AddEntityResult, NewContact } from "../types"
import { ContactServiceClass } from "./contact-service.class"

export class ContactService implements ContactServiceClass {
  constructor(private requestsService: RequestsService) {}

  async addContacts(
    newContacts: NewContact[]
  ): Promise<Response<AddEntityResult>[]> {
    const params = newContacts.map((contact) => ({
      endpoint: Endpoint.Contacts,
      method: Method.Post,
      body: ContactPresenter.mapToPureContact(contact),
    }))

    const result = await this.requestsService.requests<AddEntityResult>(params)

    return result
  }

  async removeContacts(contactIds: number[]): Promise<void> {
    const params = contactIds.map((id) => ({
      endpoint: Endpoint.Contacts,
      method: Method.Delete,
      body: {
        id,
      },
    }))

    await this.requestsService.requests(params)
  }
}
