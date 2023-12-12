/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Result, ResultObject } from "Core/core/builder"
import { AppError } from "Core/core/errors"
import { DataIndex } from "Core/index-storage/constants"
import { Message, Thread } from "Core/messages/dto"
import { Contact } from "Core/contacts/dto"
import { Template } from "Core/templates/dto"
import { SearchParams, SearchResult } from "Core/search/dto"
import { SearcherMediator } from "Core/search/mediators"

export class SearchService {
  constructor(private searcherMediator: SearcherMediator) {}

  public search(params: SearchParams): ResultObject<SearchResult | undefined> {
    try {
      const result = params.scope.reduce((acc: SearchResult, value) => {
        if (value === DataIndex.Message) {
          acc[value] = this.searcherMediator.searchByScope<Message>(
            value,
            params.query
          )
        }

        if (value === DataIndex.Thread) {
          acc[value] = this.searcherMediator.searchByScope<Thread>(
            value,
            params.query
          )
        }

        if (value === DataIndex.Contact) {
          acc[value] = this.searcherMediator.searchByScope<Contact>(
            value,
            params.query
          )
        }

        if (value === DataIndex.Template) {
          acc[value] = this.searcherMediator.searchByScope<Template>(
            value,
            params.query
          )
        }

        return acc
      }, {})

      return Result.success(result)
    } catch (error) {
      return Result.failed(error as AppError)
    }
  }
}
