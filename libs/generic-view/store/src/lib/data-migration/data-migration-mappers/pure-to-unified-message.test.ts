/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  pureToUnifiedMessage,
  PureToUnifiedMessageOptions,
} from "./pure-to-unified-message"
import { MessageType } from "Core/messages/constants"

describe("`pureToUnifiedMessage`", () => {
  describe("`pureToUnifiedMessage` - Basic Mapping", () => {
    test("maps a single basic message correctly", () => {
      const mockOptions: PureToUnifiedMessageOptions = {
        threads: {
          "1": {
            contactId: "4",
            contactName: "Luke Skywalker",
            id: "1",
            lastUpdatedAt: new Date("1970-01-01T00:06:31.000Z"),
            messageSnippet: "Hello",
            messageType: MessageType.INBOX,
            phoneNumber: "+123456789",
            unread: true,
          },
        },
        messages: {
          "1": {
            content: "Hello",
            date: new Date("1970-01-01T00:06:31.000Z"),
            id: "1",
            messageType: MessageType.INBOX,
            phoneNumber: "+123456789",
            threadId: "1",
          },
        },
      }

      const unifiedMessages = pureToUnifiedMessage(mockOptions)
      expect(unifiedMessages).toEqual([
        {
          id: "1",
          body: "Hello",
          date: 391000,
          read: false,
          type: "SMS",
          address: [{ address: "+123456789" }],
          status: "SENT",
          deliveryStatus: "DELIVERED",
        },
      ])
    })

    test("maps two messages from different senders correctly", () => {
      const mockOptionsMultiple: PureToUnifiedMessageOptions = {
        threads: {
          "1": {
            contactId: "4",
            contactName: "Skywalker Luke",
            id: "1",
            lastUpdatedAt: new Date("1970-01-01T00:06:31.000Z"),
            messageSnippet: "Test Message from Luke",
            messageType: MessageType.INBOX,
            phoneNumber: "+91898402777",
            unread: true,
          },
          "2": {
            contactId: "5",
            contactName: "Leia Organa",
            id: "2",
            lastUpdatedAt: new Date("1970-01-01T00:06:32.000Z"),
            messageSnippet: "Test Message from Leia",
            messageType: MessageType.INBOX,
            phoneNumber: "+91898405555",
            unread: false,
          },
        },
        messages: {
          "1": {
            content: "Hello from Luke",
            date: new Date("1970-01-01T00:06:31.000Z"),
            id: "1",
            messageType: MessageType.INBOX,
            phoneNumber: "+91898402777",
            threadId: "1",
          },
          "2": {
            content: "Hello from Leia",
            date: new Date("1970-01-01T00:06:32.000Z"),
            id: "2",
            messageType: MessageType.INBOX,
            phoneNumber: "+91898405555",
            threadId: "2",
          },
        },
      }

      const unifiedMessages = pureToUnifiedMessage(mockOptionsMultiple)
      expect(unifiedMessages).toEqual([
        {
          id: "1",
          body: "Hello from Luke",
          date: 391000,
          read: false,
          type: "SMS",
          address: [{ address: "+91898402777" }],
          status: "SENT",
          deliveryStatus: "DELIVERED",
        },
        {
          id: "2",
          body: "Hello from Leia",
          date: 392000,
          read: true,
          type: "SMS",
          address: [{ address: "+91898405555" }],
          status: "SENT",
          deliveryStatus: "DELIVERED",
        },
      ])
    })
  })

  describe("`pureToUnifiedMessage` - Message Type Mapping", () => {
    test("maps INBOX message type to SENT and DELIVERED", () => {
      const mockOptions: PureToUnifiedMessageOptions = {
        threads: {
          "1": {
            contactId: "4",
            contactName: "Skywalker Luke",
            id: "1",
            lastUpdatedAt: new Date("1970-01-01T00:06:31.000Z"),
            messageSnippet: "Test Message",
            messageType: MessageType.INBOX,
            phoneNumber: "+91898402777",
            unread: true,
          },
        },
        messages: {
          "1": {
            content: "Test Message #1",
            date: new Date("1970-01-01T00:06:31.000Z"),
            id: "1",
            messageType: MessageType.INBOX,
            phoneNumber: "+91898402777",
            threadId: "1",
          },
        },
      }
      const unifiedMessages = pureToUnifiedMessage(mockOptions)
      expect(unifiedMessages).toEqual([
        {
          id: "1",
          body: "Test Message #1",
          date: 391000,
          read: false,
          type: "SMS",
          address: [{ address: "+91898402777" }],
          status: "SENT",
          deliveryStatus: "DELIVERED",
        },
      ])
    })

    test("maps FAILED message type to SENT and FAILED", () => {
      const mockOptions: PureToUnifiedMessageOptions = {
        threads: {
          "1": {
            contactId: "4",
            contactName: "Skywalker Luke",
            id: "1",
            lastUpdatedAt: new Date("1970-01-01T00:06:31.000Z"),
            messageSnippet: "Test Message",
            messageType: MessageType.FAILED,
            phoneNumber: "+91898402777",
            unread: true,
          },
        },
        messages: {
          "1": {
            content: "Test Message #2",
            date: new Date("1970-01-01T00:06:31.000Z"),
            id: "1",
            messageType: MessageType.FAILED,
            phoneNumber: "+91898402777",
            threadId: "1",
          },
        },
      }
      const unifiedMessages = pureToUnifiedMessage(mockOptions)
      expect(unifiedMessages).toEqual([
        {
          id: "1",
          body: "Test Message #2",
          date: 391000,
          read: false,
          type: "SMS",
          address: [{ address: "+91898402777" }],
          status: "SENT",
          deliveryStatus: "FAILED",
        },
      ])
    })

    test("ignores DRAFT message type", () => {
      const mockOptions: PureToUnifiedMessageOptions = {
        threads: {
          "1": {
            contactId: "4",
            contactName: "Skywalker Luke",
            id: "1",
            lastUpdatedAt: new Date("1970-01-01T00:06:31.000Z"),
            messageSnippet: "Draft Message",
            messageType: MessageType.DRAFT,
            phoneNumber: "+91898402777",
            unread: true,
          },
        },
        messages: {
          "1": {
            content: "Draft Message #1",
            date: new Date("1970-01-01T00:06:31.000Z"),
            id: "1",
            messageType: MessageType.DRAFT,
            phoneNumber: "+91898402777",
            threadId: "1",
          },
        },
      }
      const unifiedMessages = pureToUnifiedMessage(mockOptions)
      expect(unifiedMessages).toEqual([]) // DRAFT messages should be ignored
    })

    test("maps QUEUED message type to SENT and PENDING", () => {
      const mockOptions: PureToUnifiedMessageOptions = {
        threads: {
          "1": {
            contactId: "4",
            contactName: "Skywalker Luke",
            id: "1",
            lastUpdatedAt: new Date("1970-01-01T00:06:31.000Z"),
            messageSnippet: "Test Message",
            messageType: MessageType.QUEUED,
            phoneNumber: "+91898402777",
            unread: true,
          },
        },
        messages: {
          "1": {
            content: "Test Message #3",
            date: new Date("1970-01-01T00:06:31.000Z"),
            id: "1",
            messageType: MessageType.QUEUED,
            phoneNumber: "+91898402777",
            threadId: "1",
          },
        },
      }
      const unifiedMessages = pureToUnifiedMessage(mockOptions)
      expect(unifiedMessages).toEqual([
        {
          id: "1",
          body: "Test Message #3",
          date: 391000,
          read: false,
          type: "SMS",
          address: [{ address: "+91898402777" }],
          status: "SENT",
          deliveryStatus: "PENDING",
        },
      ])
    })

    test("maps OUTBOX message type to RECEIVED and NONE", () => {
      const mockOptions: PureToUnifiedMessageOptions = {
        threads: {
          "1": {
            contactId: "4",
            contactName: "Skywalker Luke",
            id: "1",
            lastUpdatedAt: new Date("1970-01-01T00:06:31.000Z"),
            messageSnippet: "Sent Message",
            messageType: MessageType.OUTBOX,
            phoneNumber: "+91898402777",
            unread: true,
          },
        },
        messages: {
          "1": {
            content: "Sent Message #1",
            date: new Date("1970-01-01T00:06:31.000Z"),
            id: "1",
            messageType: MessageType.OUTBOX,
            phoneNumber: "+91898402777",
            threadId: "1",
          },
        },
      }
      const unifiedMessages = pureToUnifiedMessage(mockOptions)
      expect(unifiedMessages).toEqual([
        {
          id: "1",
          body: "Sent Message #1",
          date: 391000,
          read: false,
          type: "SMS",
          address: [{ address: "+91898402777" }],
          status: "RECEIVED",
          deliveryStatus: "NONE",
        },
      ])
    })
  })

  describe("`pureToUnifiedMessage` - Read Flag Mapping", () => {
    test("should mark all messages as read when thread unread is false", () => {
      const mockOptions: PureToUnifiedMessageOptions = {
        threads: {
          "1": {
            contactId: "4",
            contactName: "Skywalker Luke",
            id: "1",
            lastUpdatedAt: new Date("1970-01-01T00:06:33.000Z"),
            messageSnippet: "Latest Message",
            messageType: MessageType.OUTBOX,
            phoneNumber: "+91898402777",
            unread: false,
          },
        },
        messages: {
          "1": {
            content: "Old Message #1",
            date: new Date("1970-01-01T00:06:31.000Z"),
            id: "1",
            messageType: MessageType.OUTBOX,
            phoneNumber: "+91898402777",
            threadId: "1",
          },
          "2": {
            content: "Old Message #2",
            date: new Date("1970-01-01T00:06:32.000Z"),
            id: "2",
            messageType: MessageType.OUTBOX,
            phoneNumber: "+91898402777",
            threadId: "1",
          },
          "3": {
            content: "Latest Message",
            date: new Date("1970-01-01T00:06:33.000Z"),
            id: "3",
            messageType: MessageType.OUTBOX,
            phoneNumber: "+91898402777",
            threadId: "1",
          },
        },
      }
      const unifiedMessages = pureToUnifiedMessage(mockOptions)
      expect(unifiedMessages).toEqual([
        {
          id: "1",
          body: "Old Message #1",
          date: 391000,
          read: true,
          type: "SMS",
          address: [{ address: "+91898402777" }],
          status: "RECEIVED",
          deliveryStatus: "NONE",
        },
        {
          id: "2",
          body: "Old Message #2",
          date: 392000,
          read: true,
          type: "SMS",
          address: [{ address: "+91898402777" }],
          status: "RECEIVED",
          deliveryStatus: "NONE",
        },
        {
          id: "3",
          body: "Latest Message",
          date: 393000,
          read: true,
          type: "SMS",
          address: [{ address: "+91898402777" }],
          status: "RECEIVED",
          deliveryStatus: "NONE",
        },
      ])
    })

    test("should mark only the latest message as unread when thread unread is true", () => {
      const mockOptions: PureToUnifiedMessageOptions = {
        threads: {
          "1": {
            contactId: "4",
            contactName: "Skywalker Luke",
            id: "1",
            lastUpdatedAt: new Date("1970-01-01T00:06:33.000Z"),
            messageSnippet: "Latest Message",
            messageType: MessageType.OUTBOX,
            phoneNumber: "+91898402777",
            unread: true,
          },
        },
        messages: {
          "1": {
            content: "Old Message #1",
            date: new Date("1970-01-01T00:06:31.000Z"),
            id: "1",
            messageType: MessageType.OUTBOX,
            phoneNumber: "+91898402777",
            threadId: "1",
          },
          "2": {
            content: "Old Message #2",
            date: new Date("1970-01-01T00:06:32.000Z"),
            id: "2",
            messageType: MessageType.OUTBOX,
            phoneNumber: "+91898402777",
            threadId: "1",
          },
          "3": {
            content: "Latest Message",
            date: new Date("1970-01-01T00:06:33.000Z"),
            id: "3",
            messageType: MessageType.OUTBOX,
            phoneNumber: "+91898402777",
            threadId: "1",
          },
        },
      }
      const unifiedMessages = pureToUnifiedMessage(mockOptions)
      expect(unifiedMessages).toEqual([
        {
          id: "1",
          body: "Old Message #1",
          date: 391000,
          read: true,
          type: "SMS",
          address: [{ address: "+91898402777" }],
          status: "RECEIVED",
          deliveryStatus: "NONE",
        },
        {
          id: "2",
          body: "Old Message #2",
          date: 392000,
          read: true,
          type: "SMS",
          address: [{ address: "+91898402777" }],
          status: "RECEIVED",
          deliveryStatus: "NONE",
        },
        {
          id: "3",
          body: "Latest Message",
          date: 393000,
          read: false,
          type: "SMS",
          address: [{ address: "+91898402777" }],
          status: "RECEIVED",
          deliveryStatus: "NONE",
        },
      ])
    })

    test("should correctly map read flags across two threads with different unread states", () => {
      const mockOptions: PureToUnifiedMessageOptions = {
        threads: {
          "1": {
            contactId: "4",
            contactName: "Skywalker Luke",
            id: "1",
            lastUpdatedAt: new Date("1970-01-01T00:06:32.000Z"),
            messageSnippet: "Message in first thread",
            messageType: MessageType.OUTBOX,
            phoneNumber: "+91898402777",
            unread: false,
          },
          "2": {
            contactId: "5",
            contactName: "Leia Organa",
            id: "2",
            lastUpdatedAt: new Date("1970-01-01T00:06:33.000Z"),
            messageSnippet: "Latest in second thread",
            messageType: MessageType.OUTBOX,
            phoneNumber: "+91898405555",
            unread: true,
          },
        },
        messages: {
          "1": {
            content: "Old Message in Thread 1",
            date: new Date("1970-01-01T00:06:31.000Z"),
            id: "1",
            messageType: MessageType.OUTBOX,
            phoneNumber: "+91898402777",
            threadId: "1",
          },
          "2": {
            content: "Message in Thread 2",
            date: new Date("1970-01-01T00:06:32.000Z"),
            id: "2",
            messageType: MessageType.OUTBOX,
            phoneNumber: "+91898402777",
            threadId: "1",
          },
          "3": {
            content: "Latest in Thread 2",
            date: new Date("1970-01-01T00:06:33.000Z"),
            id: "3",
            messageType: MessageType.OUTBOX,
            phoneNumber: "+91898405555",
            threadId: "2",
          },
        },
      }
      const unifiedMessages = pureToUnifiedMessage(mockOptions)
      expect(unifiedMessages).toEqual([
        {
          id: "1",
          body: "Old Message in Thread 1",
          date: 391000,
          read: true,
          type: "SMS",
          address: [{ address: "+91898402777" }],
          status: "RECEIVED",
          deliveryStatus: "NONE",
        },
        {
          id: "2",
          body: "Message in Thread 2",
          date: 392000,
          read: true,
          type: "SMS",
          address: [{ address: "+91898402777" }],
          status: "RECEIVED",
          deliveryStatus: "NONE",
        },
        {
          id: "3",
          body: "Latest in Thread 2",
          date: 393000,
          read: false,
          type: "SMS",
          address: [{ address: "+91898405555" }],
          status: "RECEIVED",
          deliveryStatus: "NONE",
        },
      ])
    })

    test("should ignore DRAFT messages and set read flag as true for latest message when thread unread is false", () => {
      const mockOptions: PureToUnifiedMessageOptions = {
        threads: {
          "1": {
            contactId: "4",
            contactName: "Skywalker Luke",
            id: "1",
            lastUpdatedAt: new Date("1970-01-01T00:06:34.000Z"), // Czas ostatniej wiadomości jako `DRAFT`
            messageSnippet: "Draft Message",
            messageType: MessageType.OUTBOX,
            phoneNumber: "+91898402777",
            unread: false,
          },
        },
        messages: {
          "1": {
            content: "Old Message #1",
            date: new Date("1970-01-01T00:06:31.000Z"),
            id: "1",
            messageType: MessageType.OUTBOX,
            phoneNumber: "+91898402777",
            threadId: "1",
          },
          "2": {
            content: "Another OUTBOX Message",
            date: new Date("1970-01-01T00:06:32.000Z"),
            id: "2",
            messageType: MessageType.OUTBOX,
            phoneNumber: "+91898402777",
            threadId: "1",
          },
          "3": {
            content: "Draft Message",
            date: new Date("1970-01-01T00:06:34.000Z"),
            id: "3",
            messageType: MessageType.DRAFT,
            phoneNumber: "+91898402777",
            threadId: "1",
          },
        },
      }
      const unifiedMessages = pureToUnifiedMessage(mockOptions)
      expect(unifiedMessages).toEqual([
        {
          id: "1",
          body: "Old Message #1",
          date: 391000,
          read: true,
          type: "SMS",
          address: [{ address: "+91898402777" }],
          status: "RECEIVED",
          deliveryStatus: "NONE",
        },
        {
          id: "2",
          body: "Another OUTBOX Message",
          date: 392000,
          read: true,
          type: "SMS",
          address: [{ address: "+91898402777" }],
          status: "RECEIVED",
          deliveryStatus: "NONE",
        },
      ])
    })

    // If the last message is `DRAFT` and `thread.unread` is `true`, we ignore the `DRAFT` and mark the previous message as `read: true`.
    test("should ignore the last DRAFT message and mark the latest message as read to true when thread unread is true", () => {
      const mockOptions: PureToUnifiedMessageOptions = {
        threads: {
          "1": {
            contactId: "4",
            contactName: "Skywalker Luke",
            id: "1",
            lastUpdatedAt: new Date("1970-01-01T00:06:34.000Z"),
            messageSnippet: "Draft Message",
            messageType: MessageType.OUTBOX,
            phoneNumber: "+91898402777",
            unread: true,
          },
        },
        messages: {
          "1": {
            content: "Old Message #1",
            date: new Date("1970-01-01T00:06:31.000Z"),
            id: "1",
            messageType: MessageType.OUTBOX,
            phoneNumber: "+91898402777",
            threadId: "1",
          },
          "2": {
            content: "Another OUTBOX Message",
            date: new Date("1970-01-01T00:06:32.000Z"),
            id: "2",
            messageType: MessageType.OUTBOX,
            phoneNumber: "+91898402777",
            threadId: "1",
          },
          "3": {
            content: "Draft Message",
            date: new Date("1970-01-01T00:06:34.000Z"),
            id: "3",
            messageType: MessageType.DRAFT,
            phoneNumber: "+91898402777",
            threadId: "1",
          },
        },
      }
      const unifiedMessages = pureToUnifiedMessage(mockOptions)
      expect(unifiedMessages).toEqual([
        {
          id: "1",
          body: "Old Message #1",
          date: 391000,
          read: true,
          type: "SMS",
          address: [{ address: "+91898402777" }],
          status: "RECEIVED",
          deliveryStatus: "NONE",
        },
        {
          id: "2",
          body: "Another OUTBOX Message",
          date: 392000,
          read: true,
          type: "SMS",
          address: [{ address: "+91898402777" }],
          status: "RECEIVED",
          deliveryStatus: "NONE",
        },
      ])
    })
  })

  describe("`pureToUnifiedMessage` - Handling Incomplete or Empty Data", () => {
    test("should handle undefined contactId and contactName in Thread", () => {
      const mockOptions: PureToUnifiedMessageOptions = {
        threads: {
          "1": {
            contactId: undefined,
            contactName: undefined,
            id: "1",
            lastUpdatedAt: new Date("1970-01-01T00:06:31.000Z"),
            messageSnippet: "Test Message",
            messageType: MessageType.INBOX,
            phoneNumber: "+91898402777",
            unread: true,
          },
        },
        messages: {
          "1": {
            content: "Test Message #1",
            date: new Date("1970-01-01T00:06:31.000Z"),
            id: "1",
            messageType: MessageType.INBOX,
            phoneNumber: "+91898402777",
            threadId: "1",
          },
        },
      }
      const unifiedMessages = pureToUnifiedMessage(mockOptions)
      expect(unifiedMessages).toEqual([
        {
          id: "1",
          body: "Test Message #1",
          date: 391000,
          read: false,
          type: "SMS",
          address: [{ address: "+91898402777" }],
          status: "SENT",
          deliveryStatus: "DELIVERED",
        },
      ])
    })

    test("should handle empty phoneNumber in Thread and Message", () => {
      const mockOptions: PureToUnifiedMessageOptions = {
        threads: {
          "1": {
            contactId: "4",
            contactName: "Luke Skywalker",
            id: "1",
            lastUpdatedAt: new Date("1970-01-01T00:06:31.000Z"),
            messageSnippet: "Test Message",
            messageType: MessageType.INBOX,
            phoneNumber: "",
            unread: true,
          },
        },
        messages: {
          "1": {
            content: "Test Message #1",
            date: new Date("1970-01-01T00:06:31.000Z"),
            id: "1",
            messageType: MessageType.INBOX,
            phoneNumber: "",
            threadId: "1",
          },
        },
      }
      const unifiedMessages = pureToUnifiedMessage(mockOptions)
      expect(unifiedMessages).toEqual([
        {
          id: "1",
          body: "Test Message #1",
          date: 391000,
          read: false,
          type: "SMS",
          address: [{ address: "" }], // Pusty adres
          status: "SENT",
          deliveryStatus: "DELIVERED",
        },
      ])
    })

    test("should handle undefined content in Message", () => {
      const mockOptions: PureToUnifiedMessageOptions = {
        threads: {
          "1": {
            contactId: "4",
            contactName: "Luke Skywalker",
            id: "1",
            lastUpdatedAt: new Date("1970-01-01T00:06:31.000Z"),
            messageSnippet: "Test Message",
            messageType: MessageType.INBOX,
            phoneNumber: "+91898402777",
            unread: true,
          },
        },
        messages: {
          "1": {
            content: "",
            date: new Date("1970-01-01T00:06:31.000Z"),
            id: "1",
            messageType: MessageType.INBOX,
            phoneNumber: "+91898402777",
            threadId: "1",
          },
        },
      }
      const unifiedMessages = pureToUnifiedMessage(mockOptions)
      expect(unifiedMessages).toEqual([
        {
          id: "1",
          body: "",
          date: 391000,
          read: false,
          type: "SMS",
          address: [{ address: "+91898402777" }],
          status: "SENT",
          deliveryStatus: "DELIVERED",
        },
      ])
    })

    test("should handle minimal date for date in Message", () => {
      const mockOptions: PureToUnifiedMessageOptions = {
        threads: {
          "1": {
            contactId: "4",
            contactName: "Luke Skywalker",
            id: "1",
            lastUpdatedAt: new Date(0),
            messageSnippet: "Test Message",
            messageType: MessageType.INBOX,
            phoneNumber: "+91898402777",
            unread: true,
          },
        },
        messages: {
          "1": {
            content: "Test Message #1",
            date: new Date(0),
            id: "1",
            messageType: MessageType.INBOX,
            phoneNumber: "+91898402777",
            threadId: "1",
          },
        },
      }
      const unifiedMessages = pureToUnifiedMessage(mockOptions)
      expect(unifiedMessages).toEqual([
        {
          id: "1",
          body: "Test Message #1",
          date: 0,
          read: false,
          type: "SMS",
          address: [{ address: "+91898402777" }],
          status: "SENT",
          deliveryStatus: "DELIVERED",
        },
      ])
    })
  })

  describe("`pureToUnifiedMessage` - Filtering Messages Without Threads", () => {
    test("excludes messages without a matching thread", () => {
      const mockOptions: PureToUnifiedMessageOptions = {
        threads: {
          "2": {
            contactId: "5",
            contactName: "Leia Organa",
            id: "2",
            lastUpdatedAt: new Date("1970-01-01T00:06:32.000Z"),
            messageSnippet: "Message without thread",
            messageType: MessageType.INBOX,
            phoneNumber: "+123456789",
            unread: false,
          },
        },
        messages: {
          "1": {
            content: "Message without a thread",
            date: new Date("1970-01-01T00:06:31.000Z"),
            id: "1",
            messageType: MessageType.INBOX,
            phoneNumber: "+123456789",
            threadId: "3",
          },
        },
      }

      const unifiedMessages = pureToUnifiedMessage(mockOptions)
      expect(unifiedMessages).toEqual([])
    })

    test("includes only messages with matching threads among multiple messages", () => {
      const mockOptions: PureToUnifiedMessageOptions = {
        threads: {
          "1": {
            contactId: "4",
            contactName: "Luke Skywalker",
            id: "1",
            lastUpdatedAt: new Date("1970-01-01T00:06:31.000Z"),
            messageSnippet: "Test Message",
            messageType: MessageType.INBOX,
            phoneNumber: "+91898402777",
            unread: true,
          },
        },
        messages: {
          "1": {
            content: "Test Message #1",
            date: new Date("1970-01-01T00:06:31.000Z"),
            id: "1",
            messageType: MessageType.INBOX,
            phoneNumber: "+91898402777",
            threadId: "1",
          },
          "2": {
            content: "Unmatched Message",
            date: new Date("1970-01-01T00:06:32.000Z"),
            id: "2",
            messageType: MessageType.INBOX,
            phoneNumber: "+91898405555",
            threadId: "2",
          },
        },
      }

      const unifiedMessages = pureToUnifiedMessage(mockOptions)
      expect(unifiedMessages).toEqual([
        {
          id: "1",
          body: "Test Message #1",
          date: 391000,
          read: false,
          type: "SMS",
          address: [{ address: "+91898402777" }],
          status: "SENT",
          deliveryStatus: "DELIVERED",
        },
      ])
    })
  })
})
