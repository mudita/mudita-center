/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Index } from "elasticlunr"
import { Model, Field } from "App/core/decorators"
import { BaseModel } from "App/core/models"
import { Thread, Message } from "App/messages/dto"
import { Contact } from "App/contacts/dto"
import { DataIndex } from "App/index-storage/constants"

@Model(DataIndex.Thread)
export class ThreadModel extends BaseModel<Thread> {
  @Field("ref")
  public id: string | undefined

  @Field()
  public contactId: string | undefined

  @Field()
  public contactName: string | undefined

  @Field()
  public phoneNumber: string | undefined

  @Field()
  public lastUpdatedAt: Date | undefined

  @Field()
  public messageSnippet: string | undefined

  @Field()
  public unread: boolean | undefined

  @Field()
  public messageType: number | undefined

  public afterDelete(data: Thread): void {
    const messageIndex = this.index.get(DataIndex.Message) as Index<Message>
    const messages = messageIndex.search(data.id, {
      fields: {
        threadId: { boost: 1 },
      },
    })

    if (messages.length > 0) {
      messages.forEach((messageRef) => {
        messageIndex.removeDocByRef(messageRef.ref)
      })
    }
  }

  public beforeCreate(data: Thread): Thread {
    return this.assignContactData(data)
  }

  public beforeUpdate(data: Thread): Thread {
    return this.assignContactData(data)
  }

  private assignContactData(data: Thread): Thread {
    const contactIndex = this.index.get(DataIndex.Contact) as Index<Contact>
    const contactRef = contactIndex.search(data.phoneNumber, {
      fields: {
        primaryPhoneNumber: { boost: 1 },
      },
    })

    if (contactRef.length > 0) {
      const contact = contactIndex.documentStore.getDoc(contactRef[0].ref)

      data.contactId = contact.id
      data.contactName = [contact.firstName, contact.lastName].join(" ")
    }

    return data
  }
}
