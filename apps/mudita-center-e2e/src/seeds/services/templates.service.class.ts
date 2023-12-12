/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Response } from "../../pure/types"
import { AddEntityResult, NewTemplate } from "../types"

export interface TemplatesServiceClass {
  addTemplates(
    newTemplates: NewTemplate[]
  ): Promise<Response<AddEntityResult>[]>

  removeTemplates(templatesIds: number[]): Promise<void>
}
