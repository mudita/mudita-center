/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { TemplateRepository } from "App/templates/repositories/template.repository"
import { TemplateModel } from "App/templates/models"
import { Template } from "App/templates/dto"

const template: Template = {
  id: "1",
  text: "Hello world",
  lastUsedAt: "1234567890",
  order: 1,
}

const templateModel = {
  create: jest.fn().mockImplementationOnce((value: Template) => value),
  update: jest.fn().mockImplementationOnce((value: Template) => value),
  delete: jest.fn().mockImplementationOnce((value: string) => value),
} as unknown as TemplateModel

const subject = new TemplateRepository(templateModel)

describe("`TemplateRepository`", () => {
  test("fire `delete` call `templateModel.delete` with id", () => {
    expect(subject.delete("1")).toBeUndefined()
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(templateModel.delete).toHaveBeenCalledWith("1")
  })

  test("fire `create` call `templateModel.create` with template", () => {
    expect(subject.create(template)).toEqual(template)
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(templateModel.create).toHaveBeenCalledWith(template)
  })

  test("fire `update` call `templateModel.update` with template", () => {
    expect(subject.update(template)).toEqual(template)
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(templateModel.update).toHaveBeenCalledWith(template)
  })
})
