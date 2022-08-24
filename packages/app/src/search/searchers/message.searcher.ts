/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DataIndex } from "App/index-storage/constants"
import { Message } from "App/messages/dto"
import { BaseSearcher } from "App/search/searchers/base.searcher"

export class MessageSearcher extends BaseSearcher {
  public search(query: string): Message[] | undefined {
    const index = this.index.get(DataIndex.Message)
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const result = index!.search(query)

    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-non-null-assertion
    return this.hydrate(index!, result)
  }
}
