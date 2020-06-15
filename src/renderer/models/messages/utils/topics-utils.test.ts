import { searchTopics } from "Renderer/models/messages/utils/topics-utils"
import { randomMockedList } from "Renderer/components/rest/messages/__mocks__/caller-data"

test("searches value - first name", () => {
  const searchValue = randomMockedList[0].caller.firstName
  expect(searchTopics(randomMockedList, searchValue)).toHaveLength(1)
})

test("fails search - first name", () => {
  expect(searchTopics(randomMockedList, "asdadaa")).toHaveLength(0)
})

test("searches value - last name", () => {
  const searchValue = randomMockedList[0].caller.lastName
  expect(searchTopics(randomMockedList, searchValue)).toHaveLength(1)
})

test("fails search - last name", () => {
  expect(searchTopics(randomMockedList, "ladakslodasiopd")).toHaveLength(0)
})

test("searches value - phone number", () => {
  const searchValue = randomMockedList[0].caller.phoneNumber
  expect(searchTopics(randomMockedList, searchValue)).toHaveLength(1)
})

test("fails search - phone number", () => {
  expect(searchTopics(randomMockedList, "+123 456 789")).toHaveLength(0)
})

test("searches value - messages", () => {
  const searchValue = randomMockedList[0].messages[0].content[0].text
  expect(searchTopics(randomMockedList, searchValue)).toHaveLength(1)
})

test("fails search - messages", () => {
  expect(searchTopics(randomMockedList, "lalal sadrsa")).toHaveLength(0)
})

test("no search value returns initial list", () => {
  expect(searchTopics(randomMockedList, "")).toBe(randomMockedList)
})
