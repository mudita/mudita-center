import { Author, Topic } from "Renderer/models/messages/messages.interface"
import findTopicBySearchParams from "Renderer/modules/messages/find-topic-by-search-params"

const caller: Author = {
  id: "1",
  primaryPhoneNumber: "+33999999999",
}

const topics = [{ caller } as Topic]

const searchValue = `?callerId=${caller.id}&phoneNumber=${caller.primaryPhoneNumber}`

test("topic is found by search params", () => {
  const topic = findTopicBySearchParams(
    new URLSearchParams(searchValue),
    topics
  )
  expect(topic?.caller.id).toEqual(caller.id)
})

test("topic is found even phoneNumber has another format", () => {
  const topic = findTopicBySearchParams(new URLSearchParams(searchValue), [
    { caller: { ...caller, primaryPhoneNumber: "+33 999 999 999" } } as Topic,
  ])
  expect(topic?.caller.id).toEqual(caller.id)
})

test("topic isn't founded without callerId in search value", () => {
  const topic = findTopicBySearchParams(
    new URLSearchParams(`?phoneNumber=${caller.primaryPhoneNumber}`),
    topics
  )
  expect(topic).toBeUndefined()
})

test("topic isn't founded without phoneNumber in search value", () => {
  const topic = findTopicBySearchParams(
    new URLSearchParams(`?callerId=${caller.id}`),
    topics
  )
  expect(topic).toBeUndefined()
})

test("topic isn't founded without search value", () => {
  const topic = findTopicBySearchParams(new URLSearchParams(``), topics)
  expect(topic).toBeUndefined()
})
