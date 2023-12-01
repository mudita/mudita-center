/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Contact } from "App/contacts/dto"
import { Message, Thread } from "App/messages/dto"
import { Template } from "App/templates/dto"
import { DataIndex } from "App/index-storage/constants"

export interface SearchResult {
  [DataIndex.Contact]?: Contact[] | undefined
  [DataIndex.Message]?: Message[] | undefined
  [DataIndex.Thread]?: Thread[] | undefined
  [DataIndex.Template]?: Template[] | undefined
}
