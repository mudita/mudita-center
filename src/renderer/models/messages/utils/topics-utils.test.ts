import { searchTopics } from "Renderer/models/messages/utils/topics-utils"
import { mockedList } from "Renderer/components/rest/messages/__mocks__/caller-data"

test("searches value - first name", () => {
  const searchValue = mockedList[0].caller.firstName
  expect(searchTopics(mockedList, searchValue)).toHaveLength(mockedList.length)
  const wrongSearchValue = "asdadaa"
  expect(searchTopics(mockedList, wrongSearchValue)).toHaveLength(0)
})

test("searches value - last name", () => {
  const searchValue = mockedList[0].caller.lastName
  expect(searchTopics(mockedList, searchValue)).toHaveLength(mockedList.length)
  const wrongSearchValue = "ladakslodasiopd"
  expect(searchTopics(mockedList, wrongSearchValue)).toHaveLength(0)
})

test("searches value - phone number", () => {
  const searchValue = mockedList[0].caller.phoneNumber
  expect(searchTopics(mockedList, searchValue)).toHaveLength(mockedList.length)
  const wrongSearchValue = "+123 456 789"
  expect(searchTopics(mockedList, wrongSearchValue)).toHaveLength(0)
})

test("searches value - messages", () => {
  const searchValue = mockedList[0].messages[0].content[0]
  expect(searchTopics(mockedList, searchValue)).toHaveLength(mockedList.length)
  const wrongSearchValue = "lalal sadrsa"
  expect(searchTopics(mockedList, wrongSearchValue)).toHaveLength(0)
})
