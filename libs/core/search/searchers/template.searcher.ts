/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Index } from "elasticlunr"
import { AppError } from "Core/core/errors"
import { DataIndex } from "Core/index-storage/constants"
import { Template } from "Core/templates/dto"
import { SearcherError } from "Core/search/constants"
import { BaseSearcher } from "Core/search/searchers/base.searcher"

export class TemplateSearcher extends BaseSearcher {
  public search(query: string): Template[] | undefined {
    const index = this.index.get(DataIndex.Template) as Index<Template>

    if (!index) {
      throw new AppError(
        SearcherError.SearcherDoesntExists,
        `Index: ${DataIndex.Template} can't be found`
      )
    }

    const result = index.search(query, {
      expand: true,
      fields: {
        text: {
          boost: 2,
        },
      },
    })

    return this.hydrate(index, result)
  }
}
