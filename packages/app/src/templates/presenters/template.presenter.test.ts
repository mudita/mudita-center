/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PureTemplate } from "App/device/types/mudita-os"
import { MessagesCategory as PureMessagesCategory } from "App/device/constants"
import { NewTemplate, Template } from "App/templates/dto"
import { TemplatePresenter } from "App/templates/presenters/template.presenter"

const newTemplate: NewTemplate = {
  text: "Hello world!",
  order: 1,
}

const template: Template = {
  id: "1",
  text: "Hello world!",
  lastUsedAt: "2",
  order: 1,
}

const pureTemplate: PureTemplate = {
  templateID: 1,
  templateBody: "Hello world!",
  lastUsedAt: 2,
  order: 1,
}

describe("`mapToPureNewTemplateBody` method", () => {
  test("returns serialized `PostTemplateBody` object", () => {
    expect(TemplatePresenter.mapToPureNewTemplateBody(newTemplate)).toEqual({
      templateBody: "Hello world!",
      category: PureMessagesCategory.template,
      order: 1,
    })
  })
})

describe("`mapToPureTemplateBody` method", () => {
  test("returns serialized `PostTemplateBody` object", () => {
    expect(TemplatePresenter.mapToPureTemplateBody(template)).toEqual({
      templateBody: "Hello world!",
      templateID: Number(template.id),
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
      order: 1,
    })
  })
})

describe("`mapToPureTemplate` method", () => {
  test("returns serialized `PureTemplate` object", () => {
    expect(TemplatePresenter.mapToPureTemplate(template)).toEqual({
      templateID: 1,
      templateBody: "Hello world!",
      lastUsedAt: 2,
      order: 1,
    })
  })
})

describe("`mapToPureTemplateOrder` method", () => {
  test("returns serialized `UpdateTemplateOrder` object", () => {
    expect(TemplatePresenter.mapToPureTemplateOrder(template)).toEqual({
      templateID: 1,
      category: PureMessagesCategory.template,
      order: 1,
    })
  })
})
