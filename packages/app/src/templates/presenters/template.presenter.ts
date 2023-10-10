/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  PureTemplate,
  UpdateTemplateRequestConfig,
  CreateTemplateRequestConfig,
  UpdateTemplateOrderRequestConfig,
} from "App/device/types/mudita-os"
import { MessagesCategory as PureMessagesCategory } from "App/device/constants"
import { NewTemplate, Template } from "App/templates/dto"

export class TemplatePresenter {
  static mapToPureNewTemplateBody(
    template: NewTemplate
  ): CreateTemplateRequestConfig["body"] {
    return {
      templateBody: template.text,
      category: PureMessagesCategory.template,
      order: template.order,
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
    return {
      id: String(pureTemplate.templateID),
      text: pureTemplate.templateBody,
      lastUsedAt: String(pureTemplate.lastUsedAt),
      order: pureTemplate.order,
    }
  }

  static mapToPureTemplate(template: Template): PureTemplate {
    return {
      templateID: Number(template.id),
      templateBody: template.text,
      lastUsedAt: Number(template.lastUsedAt),
      order: template.order,
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
