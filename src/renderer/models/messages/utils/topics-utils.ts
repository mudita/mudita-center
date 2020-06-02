import {
  StateProps as MessagesProps,
  Topic,
  VisibilityFilter,
} from "Renderer/models/messages/messages.interface"

export const searchTopics = (
  topics: MessagesProps["topics"],
  searchValue: MessagesProps["searchValue"]
) => {
  if (searchValue.length) {
    return topics?.filter(({ caller, messages }) => {
      const search = searchValue.toLowerCase()
      const matchesForename = caller.firstName.toLowerCase().includes(search)
      const matchesSurname = caller.lastName.toLowerCase().includes(search)
      const matchesPhone = caller.phoneNumber.includes(search)
      const matchesMessages = messages.some(({ content }) =>
        content.some(msg => msg.toLowerCase().includes(search))
      )
      return (
        matchesForename || matchesSurname || matchesPhone || matchesMessages
      )
    })
  } else {
    return topics
  }
}
export const filterTopics = (
  topics: MessagesProps["topics"],
  visibilityFilter: MessagesProps["visibilityFilter"]
) =>
  topics?.filter(({ unread }) =>
    visibilityFilter === VisibilityFilter.Unread ? unread : true
  )

export const sortTopics = (topics: MessagesProps["topics"]) => {
  const lastMessageDate = ({ messages }: Topic) => {
    return messages[messages.length - 1].date
  }
  return topics?.sort((a, b) => {
    const x = lastMessageDate(a)
    const y = lastMessageDate(b)
    return x > y ? -1 : x < y ? 1 : 0
  })
}
