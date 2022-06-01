/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  Template as PureTemplate,
  MessagesCategory as PureMessagesCategory,
} from "@mudita/pure"
import { NewTemplate, Template } from "App/templates/dto"
import { TemplatePresenter } from "App/templates/presenters/template.presenter"

const newTemplate: NewTemplate = {
  text: "Hello world!",
}

const template: Template = {
  id: "1",
  text: "Hello world!",
  lastUsedAt: "2",
}

const pureTemplate: PureTemplate = {
  templateID: 1,
  templateBody: "Hello world!",
  lastUsedAt: 2,
}

describe("`mapToPureTemplateBody` method", () => {
  test("returns serialized `PostTemplateBody` object", () => {
    expect(TemplatePresenter.mapToPureTemplateBody(newTemplate)).toEqual({
      templateBody: "Hello world!",
      category: PureMessagesCategory.template,
    })
  })
})

describe("`mapToTemplate` method", () => {
  test("returns serialized `Template` object", () => {
    expect(TemplatePresenter.mapToTemplate(pureTemplate)).toEqual({
      id: "1",
      text: "Hello world!",
      lastUsedAt: "2",
    })
  })
})

describe("`mapToPureTemplate` method", () => {
  test("returns serialized `PureTemplate` object", () => {
    expect(TemplatePresenter.mapToPureTemplate(template)).toEqual({
      templateID: 1,
      templateBody: "Hello world!",
      lastUsedAt: 2,
    })
  })
})
