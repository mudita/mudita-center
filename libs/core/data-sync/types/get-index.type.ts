/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SerialisedIndexData } from "elasticlunr"
import { ContactObject } from "./contact-object.type"
import { MessageObject } from "./message-object.type"
import { DataIndex } from "../constants/index.constant"
import { TemplateObject } from "./template-object.type"
import { ThreadObject } from "./thread-object.type"
import { CallLogObject } from "Core/data-sync/types/call-log-object.type"

export type GetIndex<Name extends DataIndex> =
  | SerialisedIndexData<
      Name extends DataIndex.Contact
        ? ContactObject
        : Name extends DataIndex.Message
        ? MessageObject
        : Name extends DataIndex.Template
        ? TemplateObject
        : Name extends DataIndex.Thread
        ? ThreadObject
        : Name extends DataIndex.CallLog
        ? CallLogObject
        : never
    >
  | undefined
