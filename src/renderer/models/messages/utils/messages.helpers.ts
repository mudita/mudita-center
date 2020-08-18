import { Contact } from "Renderer/models/phone/phone.typings"
import { Topic } from "Renderer/models/messages/messages.interface"

export type ContactsCollection = Record<string, Contact>
export type Getter = (
  id: string,
  collection: ContactsCollection
) => Contact | undefined

export const getContactsAsMap = (contacts: Contact[]) => {
  return contacts.reduce((acc: ContactsCollection, item: Contact) => {
    return {
      ...acc,
      [item.id]: item,
    }
  }, {})
}

export const getContactDetails = (
  id: string,
  collection: ContactsCollection
): Contact | undefined => {
  if (id in collection) {
    return collection[id]
  }

  return undefined
}

export const expandTopic = (
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

export const createFullMessagesCollection = (state: any) => {
  const {
    messages: { topics },
    phone: { contacts: baseContacts },
  } = state

  const contacts = getContactsAsMap(baseContacts)

  return topics.map((topic: Topic) => {
    const { id } = topic.caller
    const caller = getContactDetails(id, contacts)

    if (caller) {
      return {
        ...expandTopic(topic, contacts, getContactDetails),
        caller,
      }
    }

    return topic
  })
}
