/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Response } from "../../pure/types"
import { AddEntityResult, NewContact } from "../types"

export interface ContactServiceClass {
  addContacts(newContacts: NewContact[]): Promise<Response<AddEntityResult>[]>
  removeContacts(contactIds: number[]): Promise<void>
}
