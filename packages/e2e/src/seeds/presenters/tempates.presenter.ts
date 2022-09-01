/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MessagesCategory, PostTemplateBody } from "../../pure/types"
import { NewTemplate } from "../types"

export class TemplatePresenter {
  static mapToPureNewTemplateBody(template: NewTemplate): PostTemplateBody {
    return {
      templateBody: template.text,
      category: MessagesCategory.template,
    }
  }
}
