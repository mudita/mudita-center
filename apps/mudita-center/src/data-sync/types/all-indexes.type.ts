/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ContactObject } from "App/data-sync/types/contact-object.type"
import { MessageObject } from "App/data-sync/types/message-object.type"
import { TemplateObject } from "App/data-sync/types/template-object.type"
import { ThreadObject } from "App/data-sync/types/thread-object.type"

export interface AllIndexes {
  contacts: Record<string, ContactObject>
  messages: Record<string, MessageObject>
  templates: Record<string, TemplateObject>
  threads: Record<string, ThreadObject>
}
