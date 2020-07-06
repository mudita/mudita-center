import { Topic } from "Renderer/models/messages/messages.interface"

export const mockedMessages: Topic = {
  id: "17a78196-42b3-4538-a0ef-f38a90a922d5",
  caller: {
    id: "c0e9fe9e-8db2-4046-b8c5-6f1aacb106c2",
    firstName: "Roman",
    lastName: "Boski",
    primaryPhoneNumber: "+66 191 051 417",
  },
  unread: false,
  messages: [
    {
      author: {
        id: "c0e9fe9e-8db2-4046-b8c5-6f1aacb106c2",
        firstName: "Emil",
        lastName: "",
        primaryPhoneNumber: "+66 191 051 417",
      },
      id: "4eba6218-3159-444d-854e-e1a9a99b3b9f",
      date: new Date("2019-07-10T19:46:30.477Z"),
      content:
        "Debitis quisquam beatae nulla et. Vel velit itaque sunt similique.",
      interlocutor: true,
    },
    {
      author: {
        id: "123",
        firstName: "John",
        lastName: "Doe",
        primaryPhoneNumber: "123 123 123",
      },
      id: "bc057752-9db7-4aaf-b5ff-fcec6489cde9",
      date: new Date("2020-01-15T00:58:19.505Z"),
      content:
        "Voluptatem inventore rerum placeat qui saepe nisi repellendus. In hic placeat et excepturi dignissimos.",
      interlocutor: false,
    },
    {
      author: {
        id: "c0e9fe9e-8db2-4046-b8c5-6f1aacb106c2",
        firstName: "Emil",
        lastName: "",
        primaryPhoneNumber: "+66 191 051 417",
      },
      id: "c4ad9510-a962-42f7-a4f4-1f8173532435",
      date: new Date("2019-09-21T06:09:51.214Z"),
      content: "Magnam velit illum et ab eum quo. Sed maiores asperiores.",
      interlocutor: true,
    },
    {
      author: {
        id: "c0e9fe9e-8db2-4046-b8c5-6f1aacb106c2",
        firstName: "Emil",
        lastName: "",
        primaryPhoneNumber: "+66 191 051 417",
      },
      id: "4b449a8e-c90b-4fa2-a850-553f541538a5",
      date: new Date("2019-08-10T01:20:22.305Z"),
      content:
        "Laudantium nulla enim voluptatem temporibus impedit temporibus veritatis aperiam nesciunt. Velit modi ullam beatae ullam quisquam optio aut.",
      interlocutor: true,
    },
    {
      author: {
        id: "123",
        firstName: "John",
        lastName: "Doe",
        primaryPhoneNumber: "123 123 123",
      },
      id: "e6cf3565-73b3-4f9a-9a6b-3e8ca860ac2d",
      date: new Date("2019-09-07T13:08:05.212Z"),
      content: "Vel praesentium rerum. Ea quisquam veritatis quia.",
      interlocutor: false,
    },
    {
      author: {
        id: "123",
        firstName: "John",
        lastName: "Doe",
        primaryPhoneNumber: "123 123 123",
      },
      id: "8d7ed62f-73e2-42ee-82f6-86b9b172a6fc",
      date: new Date("2020-04-14T02:54:57.500Z"),
      content:
        "Est officiis consequatur dolor aut illo nostrum eos consequatur rem. Praesentium qui consequuntur quae dignissimos non odit.",
      interlocutor: false,
    },
  ],
}
