import { ChangeEvent } from "react"
import { connect } from "react-redux"
import {
  Topic,
  VisibilityFilter,
} from "Renderer/models/messages/messages.interface"
import { RootModel } from "Renderer/models/models"
import { Contact } from "Renderer/models/phone/phone.interface"
import Messages from "./messages.component"
import { select } from "Renderer/store"

const selector = select(({ messages }) => ({
  list: messages.filteredList,
}))

type ContactsCollection = Record<string, Contact>
type Getter = (id: string, collection: ContactsCollection) => Contact | false

const getContactsAsMap = (contacts: Contact[]) => {
  return contacts.reduce((acc: ContactsCollection, item: Contact) => {
    return {
      ...acc,
      [item.id]: item,
    }
  }, {})
}

const getContactDetails = (
  id: string,
  collection: ContactsCollection
): Contact | false => {
  if (id in collection) {
    return collection[id]
  }

  return false
}

const expandTopic = (
  topic: Topic,
  collection: ContactsCollection,
  getter: Getter
) => {
  const { messages } = topic

  return {
    ...topic,
    messages: messages.map((msg) => {
      const author = getter(msg.author.id, collection)

      if (author) {
        return {
          ...msg,
          author,
        }
      }

      return msg
    }),
  }
}

const getMessagesWithAuthorsSelector = (state: any, getter: Getter) => {
  const {
    messages: { topics },
    phone: { contacts: baseContacts },
  } = state

  const contacts = getContactsAsMap(baseContacts)

  return topics.map((topic: Topic) => {
    const { id } = topic.caller
    const caller = getter(id, contacts)

    if (caller) {
      return {
        ...expandTopic(topic, contacts, getter),
        caller,
      }
    }

    return topic
  })
}

const mapStateToProps = (state: RootModel) => ({
  ...selector(state, {}),
  list: getMessagesWithAuthorsSelector(state, getContactDetails),
})

const mapDispatchToProps = (dispatch: any) => ({
  changeSearchValue: ({ target }: ChangeEvent<HTMLInputElement>) =>
    dispatch.messages.changeSearchValue(target.value),
  changeVisibilityFilter: (filter: VisibilityFilter) =>
    dispatch.messages.changeVisibilityFilter(filter),
  deleteConversation: (ids: string[]) =>
    dispatch.messages.deleteConversation(ids),
})

export default connect(mapStateToProps, mapDispatchToProps)(Messages)
