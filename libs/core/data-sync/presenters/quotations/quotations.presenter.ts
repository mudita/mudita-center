/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  QuotationEntity,
  QuotationInput,
  QuotationObject,
} from "Core/data-sync/types"
import { BasePresenter } from "Core/data-sync/presenters/base-presenter"
import { QuotationsTable } from "Core/data-sync/constants"

export class QuotationsPresenter extends BasePresenter {
  public serializeToObject(data: QuotationInput): QuotationObject[] {
    if (!data[QuotationsTable.Custom]) {
      return []
    }

    const quotations = this.serializeRecord<QuotationEntity>(
      data[QuotationsTable.Custom].values,
      data[QuotationsTable.Custom].columns
    )

    return quotations
      .map((quotation): QuotationObject | undefined => {
        if (!quotation.quote_id || !quotation.quote) {
          return undefined
        }

        return {
          id: quotation.quote_id,
          quote: quotation.quote,
          author: quotation.author,
        }
      })
      .filter(
        (quotation): quotation is QuotationObject =>
          typeof quotation !== "undefined"
      )
  }
}
