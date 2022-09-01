/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { NewContact } from "./new-contact"
import { NewTemplate } from "./new-template"

export interface SeedParams {
  contacts?: NewContact[]
  templates?: NewTemplate[]
}
