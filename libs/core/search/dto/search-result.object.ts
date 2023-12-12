/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Contact } from "Core/contacts/dto"
import { Message, Thread } from "Core/messages/dto"
import { Template } from "Core/templates/dto"
import { DataIndex } from "Core/index-storage/constants"

export interface SearchResult {
  [DataIndex.Contact]?: Contact[] | undefined
  [DataIndex.Message]?: Message[] | undefined
  [DataIndex.Thread]?: Thread[] | undefined
  [DataIndex.Template]?: Template[] | undefined
}
