/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ContactObject } from "Core/data-sync/types/contact-object.type"
import { MessageObject } from "Core/data-sync/types/message-object.type"
import { TemplateObject } from "Core/data-sync/types/template-object.type"
import { ThreadObject } from "Core/data-sync/types/thread-object.type"
import { CallLogObject } from "Core/data-sync/types/call-log-object.type"
import { AlarmObject } from "Core/data-sync/types/alarm-object.type"
import { NoteObject } from "Core/data-sync/types/note-object.type"

export interface AllIndexes {
  contacts: Record<string, ContactObject>
  messages: Record<string, MessageObject>
  templates: Record<string, TemplateObject>
  threads: Record<string, ThreadObject>
  callLog: Record<string, CallLogObject>
  alarms: Record<string, AlarmObject>
  notes: Record<string, NoteObject>
}
