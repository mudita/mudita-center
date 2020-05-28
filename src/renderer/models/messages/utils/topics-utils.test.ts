import { searchTopics } from "Renderer/models/messages/utils/topics-utils"
import { mockedList } from "Renderer/components/rest/messages/__mocks__/caller-data"

test("finds search value - first name", () => {
  const searchValue = mockedList[0].caller.firstName
  expect(searchTopics(mockedList, searchValue)).toBeTruthy()
})

test("finds search value - last name", () => {
  const searchValue = mockedList[0].caller.lastName
  expect(searchTopics(mockedList, searchValue)).toBeTruthy()
})

test("finds search value - phone number", () => {
  const searchValue = mockedList[0].caller.phoneNumber
  expect(searchTopics(mockedList, searchValue)).toBeTruthy()
})

test("finds search value - messages", () => {
  const searchValue = mockedList[0].messages[0].content[0]
  expect(searchTopics(mockedList, searchValue)).toBeTruthy()
})
