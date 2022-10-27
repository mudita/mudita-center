/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  Template as PureTemplate,
  UpdateTemplateRequestConfig,
  CreateTemplateRequestConfig,
  UpdateTemplateOrderRequestConfig,
} from "App/device/types/mudita-os"
import { MessagesCategory as PureMessagesCategory } from "App/device/constants"
import { NewTemplate, Template } from "App/templates/dto"
import { Feature, flags } from "App/feature-flags"
export class TemplatePresenter {
  static mapToPureNewTemplateBody(
    template: NewTemplate
  ): CreateTemplateRequestConfig["body"] {
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

  static mapToPureTemplateBody(
    template: Template
  ): UpdateTemplateRequestConfig["body"] {
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

  static mapToPureTemplateOrder(
    template: Template
  ): UpdateTemplateOrderRequestConfig["body"] {
    return {
      templateID: Number(template.id),
      category: PureMessagesCategory.template,
      order: template.order,
    }
  }
}
