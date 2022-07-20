/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  Template as PureTemplate,
  PutTemplateBody,
  MessagesCategory as PureMessagesCategory,
  PostTemplateBody,
  UpdateTemplateOrder,
} from "@mudita/pure"
import { NewTemplate, Template } from "App/templates/dto"
import { Feature, flags } from "App/feature-flags"
export class TemplatePresenter {
  static mapToPureNewTemplateBody(template: NewTemplate): PostTemplateBody {
    return flags.get(Feature.OrderTemplate)
      ? {
          templateBody: template.text,
          category: PureMessagesCategory.template,
          order: template.order,
        }
      : {
          templateBody: template.text,
          category: PureMessagesCategory.template,
        }
  }

  static mapToPureTemplateBody(template: Template): PutTemplateBody {
    return {
      templateID: Number(template.id),
      templateBody: template.text,
      category: PureMessagesCategory.template,
    }
  }

  static mapToTemplate(pureTemplate: PureTemplate): Template {
    return flags.get(Feature.OrderTemplate)
      ? {
          id: String(pureTemplate.templateID),
          text: pureTemplate.templateBody,
          lastUsedAt: String(pureTemplate.lastUsedAt),
          order: pureTemplate.order,
        }
      : {
          id: String(pureTemplate.templateID),
          text: pureTemplate.templateBody,
          lastUsedAt: String(pureTemplate.lastUsedAt),
        }
  }

  static mapToPureTemplate(template: Template): PureTemplate {
    return flags.get(Feature.OrderTemplate)
      ? {
          templateID: Number(template.id),
          templateBody: template.text,
          lastUsedAt: Number(template.lastUsedAt),
          order: template.order,
        }
      : {
          templateID: Number(template.id),
          templateBody: template.text,
          lastUsedAt: Number(template.lastUsedAt),
        }
  }

  static mapToPureTemplateOrder(template: Template): UpdateTemplateOrder {
    return {
      templateID: Number(template.id),
      category: PureMessagesCategory.template,
      order: template.order,
    }
  }
}
