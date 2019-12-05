import React from "react"
import TopicRow from "Renderer/components/rest/messages/topic-row.component"
import FunctionComponent from "Renderer/types/function-component.interface"

export interface Caller {
  id: string
  forename: string
  surname: string
  phone: string
  avatar?: string
}

export interface Message {
  _id: string
  date: string
  content: string
  isCaller: boolean
}

export interface Topic {
  _id: string
  caller: Caller
  unread: boolean
  messages: Message[]
}

const mockedCUrrentUser = {
  id: "5de92281daa2dc02ac4881f8",
  forename: "Alba",
  surname: "Hendrix",
  phone: "+1 (861) 446-2765",
  avatar: "http://placehold.it/96/b3a697",
}
console.log("I'm using current user", mockedCUrrentUser)

const mockedTopics = [
  {
    _id: "d5c2f173-51e9-43a3-bb85-bcbc96fcb94c",
    caller: {
      id: "5de921e47855ba8dd6b2bbbd",
      forename: "Katie",
      surname: "Good",
      phone: "+1 (867) 518-3436",
      avatar: undefined,
    },
    unread: true,
    messages: [
      {
        _id: "27a7108d-d5b8-4bb5-87bc-2cfebcecd571",
        date: "2019-10-18T11:27:15.256Z",
        content:
          "Adipisicing non qui Lorem aliqua officia laboris ad reprehenderit dolor mollit.",
        isCaller: true,
      },
      {
        _id: "70cdc31d-ca8e-4d0c-8751-897ae2f3fb7d",
        date: "2019-10-18T11:45:35.112Z",
        content:
          "Dolore esse occaecat ipsum officia ad laborum excepteur quis.",
        isCaller: false,
      },
      {
        _id: "a405b5ce-a77b-4abd-9671-50a04678ec77",
        date: "2019-10-18T12:38:18.726Z",
        content:
          "Mollit et enim esse labore dolore velit ipsum elit sunt dolor sit sunt aliquip sit.",
        isCaller: false,
      },
      {
        _id: "c46c8652-1764-4d2a-aed0-cc10c9290ec9",
        date: "2019-10-18T13:13:09.976Z",
        content: "Nostrud deserunt deserunt ullamco et ex.",
        isCaller: false,
      },
      {
        _id: "fd7eee30-691c-42b4-9119-a84050833a90",
        date: "2019-10-18T12:33:43.316Z",
        content: "Tempor magna ipsum sunt eiusmod consequat id enim.",
        isCaller: true,
      },
      {
        _id: "5627c305-962e-4178-8be9-f10b93ae49ff",
        date: "2019-10-18T13:55:38.136Z",
        content: "Do aliquip in occaecat ipsum nostrud elit nulla.",
        isCaller: true,
      },
    ],
  },
  {
    _id: "2fc22a07-00d6-4d42-b87b-f60326b3aa7d",
    caller: {
      id: "5de921e41f035f0118643298",
      forename: "Beulah",
      surname: "Mcleod",
      phone: "+1 (862) 506-2668",
      avatar: "http://placehold.it/96/e34b3d",
    },
    unread: true,
    messages: [
      {
        _id: "88ce09eb-3987-4964-98c4-e4a7afd8d01d",
        date: "2019-10-18T11:27:15.256Z",
        content:
          "Do irure laboris velit aute id deserunt adipisicing cupidatat deserunt tempor elit nisi nisi eu.",
        isCaller: false,
      },
      {
        _id: "f700f2b4-1e87-42b5-98e7-7d88651a249a",
        date: "2019-10-18T11:53:41.630Z",
        content:
          "Ullamco mollit elit minim esse pariatur ullamco ullamco proident aliqua pariatur eiusmod.",
        isCaller: true,
      },
    ],
  },
  {
    _id: "3362c6df-10a0-4c9d-9192-f2e5ce2e2d39",
    caller: {
      id: "5de921e41d8527e1e7fdeefe",
      forename: "Alana",
      surname: "Riddle",
      phone: "+1 (951) 478-3073",
      avatar: undefined,
    },
    unread: false,
    messages: [
      {
        _id: "7a9a9c0d-4043-4cac-a92d-e219e1e0e0c7",
        date: "2019-10-18T11:27:15.256Z",
        content:
          "Reprehenderit qui laboris minim exercitation id commodo sit commodo ullamco aliquip aute occaecat non est.",
        isCaller: true,
      },
      {
        _id: "6f7e5c58-d221-42c3-9ab6-e2e30c00eef0",
        date: "2019-10-18T12:07:06.611Z",
        content:
          "Ad do nostrud velit elit sit deserunt do ullamco est elit ad voluptate.",
        isCaller: false,
      },
      {
        _id: "958f5634-0a04-4de7-a00b-a3c6e77ed1d9",
        date: "2019-10-18T12:10:30.288Z",
        content: "Cupidatat Lorem fugiat magna tempor laborum.",
        isCaller: true,
      },
      {
        _id: "b81f4519-6592-4c72-aaba-d2a4ec0b35a9",
        date: "2019-10-18T13:52:06.157Z",
        content:
          "Dolor excepteur excepteur incididunt cillum incididunt id esse laborum Lorem.",
        isCaller: false,
      },
      {
        _id: "377ecc6d-6b51-4eee-b68a-7817060fb06b",
        date: "2019-10-18T12:27:44.396Z",
        content:
          "Quis velit et sunt amet nulla velit duis et anim proident qui.",
        isCaller: false,
      },
    ],
  },
  {
    _id: "41be0de3-fb18-4554-81f4-86fd3ae36809",
    caller: {
      id: "5de921e4e7bd49d73fac161f",
      forename: "Donna",
      surname: "Ware",
      phone: "+1 (935) 531-2881",
      avatar: "http://placehold.it/96/3b85b2",
    },
    unread: false,
    messages: [
      {
        _id: "0e988fed-cd64-4ad1-a672-8e0f09c6ee98",
        date: "2019-10-18T11:27:15.256Z",
        content: "Eu aute enim est do aliqua culpa mollit sit non aliquip.",
        isCaller: false,
      },
      {
        _id: "a95db81b-6fa0-47bf-8857-4e5e5060895b",
        date: "2019-10-18T12:01:25.378Z",
        content:
          "Ad commodo laboris dolore nostrud aliqua reprehenderit ipsum elit tempor veniam est culpa sit in.",
        isCaller: false,
      },
      {
        _id: "f536c4ab-14bf-441a-8360-7e3c5d1a1e32",
        date: "2019-10-18T13:02:04.088Z",
        content:
          "Elit Lorem reprehenderit dolor ullamco nulla aliqua ea veniam.",
        isCaller: false,
      },
      {
        _id: "b9dfc509-89cb-45c1-ba42-3f11d4d4cf4e",
        date: "2019-10-18T13:35:30.379Z",
        content:
          "Est anim culpa duis velit dolor in officia qui occaecat enim cupidatat dolore.",
        isCaller: false,
      },
      {
        _id: "567c1525-2d90-4024-82c6-3c3b06e31926",
        date: "2019-10-18T13:06:44.340Z",
        content:
          "Sint ipsum laboris sunt exercitation pariatur culpa qui ad dolore culpa anim.",
        isCaller: true,
      },
    ],
  },
  {
    _id: "0110ce75-7093-46e5-b8dd-9bf9d7de243e",
    caller: {
      id: "5de921e47cc44866f1c52f43",
      forename: "Kaitlin",
      surname: "Curry",
      phone: "+1 (963) 573-2002",
      avatar: undefined,
    },
    unread: false,
    messages: [
      {
        _id: "1ffab472-67e7-4b0f-af33-46b31312e5ce",
        date: "2019-10-18T11:27:15.256Z",
        content: "Ea magna ad pariatur nostrud qui.",
        isCaller: false,
      },
      {
        _id: "d4f6325a-26b7-48bc-ae15-8a4935d542a0",
        date: "2019-10-18T12:10:25.478Z",
        content: "Fugiat non laborum sunt commodo non in sunt ipsum ex.",
        isCaller: true,
      },
      {
        _id: "c84f9e9c-11ca-4861-bdb5-c5644bf7e35c",
        date: "2019-10-18T12:31:06.156Z",
        content:
          "Cupidatat fugiat in labore sunt proident exercitation consequat consequat deserunt incididunt pariatur incididunt excepteur ipsum.",
        isCaller: true,
      },
      {
        _id: "517abae0-3551-4b2f-95a7-544bff6afeab",
        date: "2019-10-18T12:57:50.941Z",
        content:
          "Cillum labore dolore adipisicing incididunt deserunt tempor pariatur amet qui elit occaecat.",
        isCaller: true,
      },
      {
        _id: "7472044e-6fe5-456d-b7b1-7c4ec7d383df",
        date: "2019-10-18T13:58:17.928Z",
        content: "In cupidatat labore deserunt aute.",
        isCaller: false,
      },
    ],
  },
]

const MessagesActions: FunctionComponent = () => <div>•••</div>

const Messages: FunctionComponent = () => {
  return (
    <>
      {mockedTopics.map(topic => (
        <TopicRow {...topic} key={topic._id} actions={<MessagesActions />} />
      ))}
    </>
  )
}

export default Messages
