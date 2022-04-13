/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import elasticlunr, { Index } from "elasticlunr"
import { EventEmitter } from "events"
import { BaseModel } from "./base.model"
import { DataIndex } from "App/index-storage/constants"
import { IndexConnectionError } from "App/core/errors"

type TestingRecord = { id: string; text: string }

let index = elasticlunr<TestingRecord>()
const dataIndexMap = new Map<DataIndex, Index<TestingRecord>>()
dataIndexMap.set(DataIndex.Contact, index)

const fakeEventEmitter = new EventEmitter()
const subject = new BaseModel<TestingRecord>(dataIndexMap, fakeEventEmitter)

describe("Index: exists", () => {
  beforeAll(() => {
    subject.modelName = DataIndex.Contact
  })

  describe("Method: all", () => {
    beforeEach(() => {
      index = elasticlunr<TestingRecord>()
      dataIndexMap.set(DataIndex.Contact, index)
    })

    test("returns the empty list of records", () => {
      expect(subject.all()).toEqual([])
    })

    test("returns the list of records", () => {
      index.addDoc({ id: "1", text: "Test #1" })
      index.addDoc({ id: "2", text: "Test #2" })
      index.addDoc({ id: "3", text: "Test #3" })

      expect(subject.all()).toEqual([
        { id: "1", text: "Test #1" },
        { id: "2", text: "Test #2" },
        { id: "3", text: "Test #3" },
      ])
    })
  })

  describe("Method: findById", () => {
    beforeEach(() => {
      index = elasticlunr<TestingRecord>()

      index.addDoc({ id: "1", text: "Test #1" })
      index.addDoc({ id: "2", text: "Test #2" })
      index.addDoc({ id: "3", text: "Test #3" })

      dataIndexMap.set(DataIndex.Contact, index)
    })

    test("returns `null` if object with provided `id` doesn't exists", () => {
      expect(subject.findById("4")).toBeNull()
    })

    test("returns object when provided `id` exists in index", () => {
      expect(subject.findById("1")).toEqual({ id: "1", text: "Test #1" })
    })
  })

  describe("Method: create", () => {
    beforeEach(() => {
      index = elasticlunr<TestingRecord>()
      dataIndexMap.set(DataIndex.Contact, index)
    })

    test("returns created object", () => {
      expect(subject.all()).toEqual([])
      expect(subject.create({ id: "1", text: "Test #1" })).toEqual({
        id: "1",
        text: "Test #1",
      })
    })

    test("overrides the object with the same `id`", () => {
      expect(subject.all()).toEqual([])
      index.addDoc({ id: "1", text: "Test #1" })
      expect(subject.create({ id: "1", text: "Test #2" })).toEqual({
        id: "1",
        text: "Test #2",
      })
      expect(subject.all()).toEqual([{ id: "1", text: "Test #2" }])
    })

    test("transform provided data in `beforeCreate` callback", () => {
      expect(subject.all()).toEqual([])

      jest
        .spyOn(subject, "beforeCreate")
        .mockImplementationOnce((data: TestingRecord) => {
          data.text = `Adjusted ${data.text}`
          return data
        })

      expect(subject.create({ id: "1", text: "Test #2" })).toEqual({
        id: "1",
        text: "Adjusted Test #2",
      })
    })

    test("runs side effect in `afterCreate` callback", () => {
      expect(subject.all()).toEqual([])

      const afterCreate = jest.fn()

      expect(afterCreate).toBeCalledTimes(0)

      jest.spyOn(subject, "afterCreate").mockImplementationOnce(afterCreate)

      expect(subject.create({ id: "1", text: "Test #2" })).toEqual({
        id: "1",
        text: "Test #2",
      })
      expect(afterCreate).toBeCalledTimes(1)
    })

    test("when `skipCallbacks` is set to `true` any side effects aren't run", () => {
      expect(subject.all()).toEqual([])

      const afterCreate = jest.fn()

      expect(afterCreate).toBeCalledTimes(0)

      jest.spyOn(subject, "afterCreate").mockImplementationOnce(afterCreate)

      expect(subject.create({ id: "1", text: "Test #2" }, true)).toEqual({
        id: "1",
        text: "Test #2",
      })
      expect(afterCreate).toBeCalledTimes(0)
    })
  })

  describe("Method: update", () => {
    beforeEach(() => {
      index = elasticlunr<TestingRecord>()
      index.addDoc({ id: "1", text: "Test #1" })
      dataIndexMap.set(DataIndex.Contact, index)
    })

    test("returns updated object", () => {
      expect(subject.update({ id: "1", text: "Updated #1" })).toEqual({
        id: "1",
        text: "Updated #1",
      })
    })

    test("transform provided data in `beforeUpdate` callback", () => {
      jest
        .spyOn(subject, "beforeUpdate")
        .mockImplementationOnce((data: TestingRecord) => {
          data.text = `Adjusted ${data.text}`
          return data
        })

      expect(subject.update({ id: "1", text: "Updated #1" })).toEqual({
        id: "1",
        text: "Adjusted Updated #1",
      })
    })

    test("runs side effect in `afterUpdate` callback", () => {
      const afterUpdate = jest.fn()

      expect(afterUpdate).toBeCalledTimes(0)

      jest.spyOn(subject, "afterUpdate").mockImplementationOnce(afterUpdate)

      expect(subject.update({ id: "1", text: "Updated #2" })).toEqual({
        id: "1",
        text: "Updated #2",
      })
      expect(afterUpdate).toBeCalledTimes(1)
    })

    test("when `skipCallbacks` is set to `true` any side effects aren't run", () => {
      const afterUpdate = jest.fn()

      expect(afterUpdate).toBeCalledTimes(0)

      jest.spyOn(subject, "afterUpdate").mockImplementationOnce(afterUpdate)

      expect(subject.update({ id: "1", text: "Updated #2" }, true)).toEqual({
        id: "1",
        text: "Updated #2",
      })
      expect(afterUpdate).toBeCalledTimes(0)
    })
  })

  describe("Method: delete", () => {
    beforeEach(() => {
      index = elasticlunr<TestingRecord>()
      index.addDoc({ id: "1", text: "Test #1" })
      dataIndexMap.set(DataIndex.Contact, index)
    })

    test("deleted record from index by provided `id`", () => {
      expect(subject.all()).toEqual([{ id: "1", text: "Test #1" }])
      subject.delete("1")
      expect(subject.all()).toEqual([])
    })

    test("runs side effect in `beforeDelete` callback", () => {
      const beforeDelete = jest.fn()

      expect(beforeDelete).toBeCalledTimes(0)

      jest.spyOn(subject, "beforeDelete").mockImplementationOnce(beforeDelete)

      subject.delete("1")
      expect(subject.all()).toEqual([])
      expect(beforeDelete).toBeCalledTimes(1)
    })

    test("runs side effect in `afterDelete` callback", () => {
      const afterDelete = jest.fn()

      expect(afterDelete).toBeCalledTimes(0)

      jest.spyOn(subject, "afterDelete").mockImplementationOnce(afterDelete)

      subject.delete("1")
      expect(subject.all()).toEqual([])
      expect(afterDelete).toBeCalledTimes(1)
    })

    test("when `skipCallbacks` is set to `true` any side effects aren't run", () => {
      const afterDelete = jest.fn()

      expect(afterDelete).toBeCalledTimes(0)

      jest.spyOn(subject, "afterDelete").mockImplementationOnce(afterDelete)

      subject.delete("1", true)
      expect(subject.all()).toEqual([])
      expect(afterDelete).toBeCalledTimes(0)
    })
  })
})

describe("Index: doesn't exists", () => {
  beforeAll(() => {
    subject.modelName = "I doesn't exists" as unknown as DataIndex
  })

  test("throw an `IndexConnectionError` error", () => {
    expect(() => subject.all()).toThrow(
      new IndexConnectionError("Cannot connect to 'I doesn't exists' index")
    )
  })
})
