import { searchTopics } from "Renderer/models/messages/utils/topics-utils"
import { randomMockedList } from "Renderer/components/rest/messages/__mocks__/caller-data"

test("searches value - first name", () => {
  const searchValue = randomMockedList[0].caller.firstName
  expect(searchTopics(randomMockedList, searchValue)).toHaveLength(1)
})

test("fails search - first name", () => {
  const wrongSearchValue = "asdadaa"
  expect(searchTopics(randomMockedList, wrongSearchValue)).toHaveLength(0)
})

test("searches value - last name", () => {
  const searchValue = randomMockedList[0].caller.lastName
  expect(searchTopics(randomMockedList, searchValue)).toHaveLength(1)
})

test("fails search - last name", () => {
  const wrongSearchValue = "ladakslodasiopd"
  expect(searchTopics(randomMockedList, wrongSearchValue)).toHaveLength(0)
})

test("searches value - phone number", () => {
  const searchValue = randomMockedList[0].caller.phoneNumber
  expect(searchTopics(randomMockedList, searchValue)).toHaveLength(1)
})

test("fails search - phone number", () => {
  const wrongSearchValue = "+123 456 789"
  expect(searchTopics(randomMockedList, wrongSearchValue)).toHaveLength(0)
})

test("searches value - messages", () => {
  const searchValue = randomMockedList[0].messages[0].content[0]
  expect(searchTopics(randomMockedList, searchValue)).toHaveLength(1)
})

test("fails search - messages", () => {
  const wrongSearchValue = "lalal sadrsa"
  expect(searchTopics(randomMockedList, wrongSearchValue)).toHaveLength(0)
})

test("no search value returns initial list", () => {
  const emptySearchValue = ""
  expect(searchTopics(randomMockedList, emptySearchValue)).toBe(
    randomMockedList
  )
})
