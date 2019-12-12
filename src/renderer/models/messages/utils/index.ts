import {
  InitialState as MessagesInitialState,
  Topic,
  VisibilityFilter,
} from "Renderer/models/messages/messages.interface"

export const mockedTopics = [
  {
    id: "d5c2f173-51e9-43a3-bb85-bcbc96fcb94c",
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
        id: "27a7108d-d5b8-4bb5-87bc-2cfebcecd571",
        date: "2019-10-18T11:27:15.256Z",
        content:
          "Adipisicing non qui Lorem aliqua officia laboris ad reprehenderit dolor mollit.",
        isCaller: true,
      },
      {
        id: "70cdc31d-ca8e-4d0c-8751-897ae2f3fb7d",
        date: "2019-10-18T11:45:35.112Z",
        content:
          "Dolore esse occaecat ipsum officia ad laborum excepteur quis.",
        isCaller: false,
      },
      {
        id: "a405b5ce-a77b-4abd-9671-50a04678ec77",
        date: "2019-10-18T12:38:18.726Z",
        content:
          "Mollit et enim esse labore dolore velit ipsum elit sunt dolor sit sunt aliquip sit.",
        isCaller: false,
      },
      {
        id: "c46c8652-1764-4d2a-aed0-cc10c9290ec9",
        date: "2019-10-18T13:13:09.976Z",
        content: "Nostrud deserunt deserunt ullamco et ex.",
        isCaller: false,
      },
      {
        id: "fd7eee30-691c-42b4-9119-a84050833a90",
        date: "2019-10-18T12:33:43.316Z",
        content: "Tempor magna ipsum sunt eiusmod consequat id enim.",
        isCaller: true,
      },
      {
        id: "5627c305-962e-4178-8be9-f10b93ae49ff",
        date: "2019-10-18T13:55:38.136Z",
        content: "Do aliquip in occaecat ipsum nostrud elit nulla.",
        isCaller: true,
      },
    ],
  },
  {
    id: "2fc22a07-00d6-4d42-b87b-f60326b3aa7d",
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
        id: "88ce09eb-3987-4964-98c4-e4a7afd8d01d",
        date: "2019-10-18T11:27:15.256Z",
        content:
          "Do irure laboris velit aute id deserunt adipisicing cupidatat deserunt tempor elit nisi nisi eu.",
        isCaller: false,
      },
      {
        id: "f700f2b4-1e87-42b5-98e7-7d88651a249a",
        date: "2019-10-18T11:53:41.630Z",
        content:
          "Ullamco mollit elit minim esse pariatur ullamco ullamco proident aliqua pariatur eiusmod.",
        isCaller: true,
      },
    ],
  },
  {
    id: "3362c6df-10a0-4c9d-9192-f2e5ce2e2d39",
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
        id: "7a9a9c0d-4043-4cac-a92d-e219e1e0e0c7",
        date: "2019-10-18T11:27:15.256Z",
        content:
          "Reprehenderit qui laboris minim exercitation id commodo sit commodo ullamco aliquip aute occaecat non est.",
        isCaller: true,
      },
      {
        id: "6f7e5c58-d221-42c3-9ab6-e2e30c00eef0",
        date: "2019-10-18T12:07:06.611Z",
        content:
          "Ad do nostrud velit elit sit deserunt do ullamco est elit ad voluptate.",
        isCaller: false,
      },
      {
        id: "958f5634-0a04-4de7-a00b-a3c6e77ed1d9",
        date: "2019-10-18T12:10:30.288Z",
        content: "Cupidatat Lorem fugiat magna tempor laborum.",
        isCaller: true,
      },
      {
        id: "b81f4519-6592-4c72-aaba-d2a4ec0b35a9",
        date: "2019-10-18T13:52:06.157Z",
        content:
          "Dolor excepteur excepteur incididunt cillum incididunt id esse laborum Lorem.",
        isCaller: false,
      },
      {
        id: "377ecc6d-6b51-4eee-b68a-7817060fb06b",
        date: "2019-10-18T12:27:44.396Z",
        content:
          "Quis velit et sunt amet nulla velit duis et anim proident qui.",
        isCaller: false,
      },
    ],
  },
  {
    id: "41be0de3-fb18-4554-81f4-86fd3ae36809",
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
        id: "0e988fed-cd64-4ad1-a672-8e0f09c6ee98",
        date: "2019-10-18T11:27:15.256Z",
        content: "Eu aute enim est do aliqua culpa mollit sit non aliquip.",
        isCaller: false,
      },
      {
        id: "a95db81b-6fa0-47bf-8857-4e5e5060895b",
        date: "2019-10-18T12:01:25.378Z",
        content:
          "Ad commodo laboris dolore nostrud aliqua reprehenderit ipsum elit tempor veniam est culpa sit in.",
        isCaller: false,
      },
      {
        id: "f536c4ab-14bf-441a-8360-7e3c5d1a1e32",
        date: "2019-10-18T13:02:04.088Z",
        content:
          "Elit Lorem reprehenderit dolor ullamco nulla aliqua ea veniam.",
        isCaller: false,
      },
      {
        id: "b9dfc509-89cb-45c1-ba42-3f11d4d4cf4e",
        date: "2019-10-18T13:35:30.379Z",
        content:
          "Est anim culpa duis velit dolor in officia qui occaecat enim cupidatat dolore.",
        isCaller: false,
      },
      {
        id: "567c1525-2d90-4024-82c6-3c3b06e31926",
        date: "2019-10-18T13:06:44.340Z",
        content:
          "Sint ipsum laboris sunt exercitation pariatur culpa qui ad dolore culpa anim.",
        isCaller: true,
      },
    ],
  },
  {
    id: "0110ce75-7093-46e5-b8dd-9bf9d7de243e",
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
        id: "1ffab472-67e7-4b0f-af33-46b31312e5ce",
        date: "2019-10-18T11:27:15.256Z",
        content: "Ea magna ad pariatur nostrud qui.",
        isCaller: false,
      },
      {
        id: "d4f6325a-26b7-48bc-ae15-8a4935d542a0",
        date: "2019-10-18T12:10:25.478Z",
        content: "Fugiat non laborum sunt commodo non in sunt ipsum ex.",
        isCaller: true,
      },
      {
        id: "c84f9e9c-11ca-4861-bdb5-c5644bf7e35c",
        date: "2019-10-18T12:31:06.156Z",
        content:
          "Cupidatat fugiat in labore sunt proident exercitation consequat consequat deserunt incididunt pariatur incididunt excepteur ipsum.",
        isCaller: true,
      },
      {
        id: "517abae0-3551-4b2f-95a7-544bff6afeab",
        date: "2019-10-18T12:57:50.941Z",
        content:
          "Cillum labore dolore adipisicing incididunt deserunt tempor pariatur amet qui elit occaecat.",
        isCaller: true,
      },
      {
        id: "7472044e-6fe5-456d-b7b1-7c4ec7d383df",
        date: "2019-10-18T13:58:17.928Z",
        content: "In cupidatat labore deserunt aute.",
        isCaller: false,
      },
    ],
  },
  {
    id: "fb8ce43c-7d19-4110-87b0-cedd8ab16782",
    caller: {
      id: "5dea5f4678f81fe7f5e34977",
      forename: "Misty",
      surname: "Hayes",
      phone: "+1 (892) 569-3463",
      avatar: "http://placehold.it/96/80fe08",
    },
    unread: true,
    messages: [
      {
        id: "eeee6fd5-d1d2-460d-82bb-8bb3478918d9",
        date: "2019-10-15T03:43:55.256Z",
        content:
          "Sit ea sunt est esse ad Lorem reprehenderit amet nisi quis in sint.",
        isCaller: true,
      },
      {
        id: "21f99094-03fe-4a27-9b96-183a4a727e9c",
        date: "2019-10-15T04:23:21.338Z",
        content:
          "Nostrud excepteur dolor cillum id deserunt incididunt eiusmod ad sunt eu aute eu.",
        isCaller: true,
      },
      {
        id: "bbffcb26-0666-4906-ab9e-4c481d2d8628",
        date: "2019-10-15T04:54:41.284Z",
        content:
          "Ut aute eiusmod nisi enim pariatur ea Lorem do ipsum aliquip.",
        isCaller: true,
      },
      {
        id: "160cb043-365f-4195-845c-e70f23329056",
        date: "2019-10-15T05:37:51.479Z",
        content:
          "Anim aliqua aute ad magna esse voluptate duis proident sint veniam mollit qui.",
        isCaller: true,
      },
    ],
  },
  {
    id: "ed94e938-cad9-4ed1-9040-eec2e849efd8",
    caller: {
      id: "5dea5f46aa4b90fb24975e05",
      forename: "Susanna",
      surname: "Guthrie",
      phone: "+1 (975) 481-3940",
      avatar: "http://placehold.it/96/b83260",
    },
    unread: true,
    messages: [
      {
        id: "05661ee1-8587-4fe9-bc52-3fe7946f9924",
        date: "2019-10-15T03:43:55.256Z",
        content: "Est Lorem dolor ut id duis commodo eiusmod.",
        isCaller: false,
      },
      {
        id: "95b865d1-2a53-43dc-b5d7-f5f388628102",
        date: "2019-10-15T04:29:12.143Z",
        content: "Ullamco pariatur in nulla velit incididunt.",
        isCaller: true,
      },
      {
        id: "1afa5ade-fd80-480d-85a5-2d4523a688c6",
        date: "2019-10-15T04:49:10.404Z",
        content: "Non eu adipisicing aliqua et commodo.",
        isCaller: true,
      },
      {
        id: "54d32f12-ebbe-4edd-a94b-537e6ba88493",
        date: "2019-10-15T06:08:18.719Z",
        content:
          "Duis est officia elit nulla ut quis voluptate minim labore commodo aute eiusmod.",
        isCaller: false,
      },
      {
        id: "7999f357-ab85-4bcb-b2b8-cfadf079dde2",
        date: "2019-10-15T05:37:23.016Z",
        content:
          "Cupidatat eu cupidatat commodo eu proident occaecat aliqua eu aute nostrud ex elit nisi pariatur.",
        isCaller: true,
      },
      {
        id: "9be0b8de-224f-4d08-a9c4-dc05f0dafbde",
        date: "2019-10-15T07:19:53.126Z",
        content:
          "Esse voluptate fugiat officia tempor culpa culpa ullamco sint.",
        isCaller: true,
      },
      {
        id: "6bbe37b3-26f6-438e-b5c0-6d0163de46b2",
        date: "2019-10-15T06:31:42.014Z",
        content: "Incididunt excepteur anim esse exercitation ullamco.",
        isCaller: false,
      },
    ],
  },
  {
    id: "4422867b-ef3e-4184-b9be-f700c1ceb9e5",
    caller: {
      id: "5dea5f4616749205bf3c441f",
      forename: "Lauren",
      surname: "Mathews",
      phone: "+1 (971) 570-2721",
      avatar: "http://placehold.it/96/bbf6bc",
    },
    unread: true,
    messages: [
      {
        id: "87278291-374e-486c-94c1-141cf8137f3f",
        date: "2019-10-15T03:43:55.256Z",
        content:
          "Incididunt enim occaecat excepteur ad elit qui elit consequat deserunt ad aliqua eiusmod.",
        isCaller: false,
      },
      {
        id: "98bc9d9c-0d42-4f1b-b07a-5876a4387ac2",
        date: "2019-10-15T04:01:15.004Z",
        content: "Aliqua Lorem in elit laborum.",
        isCaller: false,
      },
      {
        id: "18e58c97-16f8-41f6-b257-6fd9b92f0868",
        date: "2019-10-15T05:19:45.496Z",
        content: "Velit in nostrud nisi fugiat reprehenderit laboris.",
        isCaller: false,
      },
      {
        id: "5291fb81-139d-4513-8cbf-203c1f5e5a6b",
        date: "2019-10-15T05:43:52.262Z",
        content:
          "Nisi cupidatat mollit laborum culpa ex excepteur deserunt esse excepteur aute occaecat proident minim.",
        isCaller: false,
      },
      {
        id: "b0d91c81-66a6-474a-adb9-bfb8cabfd284",
        date: "2019-10-15T05:27:42.132Z",
        content:
          "Ex fugiat pariatur ipsum nulla voluptate officia ad anim ut ex sint ullamco eu consectetur.",
        isCaller: false,
      },
      {
        id: "9c72980f-1e86-4f37-8539-3232a2c854ed",
        date: "2019-10-15T07:30:20.211Z",
        content: "Enim Lorem magna quis laborum.",
        isCaller: false,
      },
    ],
  },
  {
    id: "79531385-f4b9-4d5a-b510-4369187c7556",
    caller: {
      id: "5dea5f46f55a9b8fa9df2745",
      forename: "Bolton",
      surname: "Harvey",
      phone: "+1 (865) 474-3456",
      avatar: "http://placehold.it/96/e07113",
    },
    unread: false,
    messages: [
      {
        id: "0eba4fa7-ab69-4d24-9312-d9da5bd2c08e",
        date: "2019-10-15T03:43:55.256Z",
        content: "Sunt dolore duis minim ad non.",
        isCaller: true,
      },
      {
        id: "8d04a3ff-2bb9-4bac-b948-52e46b0498d6",
        date: "2019-10-15T04:08:40.867Z",
        content: "Est eu nisi in nostrud.",
        isCaller: false,
      },
      {
        id: "08d0c9fb-5047-41aa-bfce-d8fde12b4d07",
        date: "2019-10-15T05:15:54.070Z",
        content: "Est aute dolor ullamco voluptate non.",
        isCaller: false,
      },
      {
        id: "39715ca0-f50b-4085-ae91-6219377f8aca",
        date: "2019-10-15T05:47:12.323Z",
        content: "Laborum in dolore officia esse qui.",
        isCaller: false,
      },
      {
        id: "7d6e2884-a3b8-42a6-9d11-6e05798900d9",
        date: "2019-10-15T06:40:58.692Z",
        content: "Eiusmod ipsum deserunt magna exercitation in non.",
        isCaller: true,
      },
      {
        id: "8f0c8079-90a4-4a7f-b83e-93a33a4c7864",
        date: "2019-10-15T07:32:07.031Z",
        content:
          "Aute exercitation adipisicing eu pariatur nulla non ex in nisi adipisicing veniam dolor aliquip.",
        isCaller: true,
      },
      {
        id: "e0977cc3-7de6-4a26-a6b2-ee81c69c1b20",
        date: "2019-10-15T05:25:44.030Z",
        content: "Dolor excepteur velit proident id ea sit.",
        isCaller: true,
      },
    ],
  },
  {
    id: "b13a56e4-8aad-4429-97f0-7af8c63084bb",
    caller: {
      id: "5dea5f46a7f5106ca729eaa7",
      forename: "Concetta",
      surname: "Rosario",
      phone: "+1 (875) 435-2831",
      avatar: undefined,
    },
    unread: false,
    messages: [
      {
        id: "6375bddc-d692-4820-b9cd-29cdc5d87b3c",
        date: "2019-10-15T03:43:55.256Z",
        content: "Ullamco ea amet ut quis minim irure do.",
        isCaller: true,
      },
      {
        id: "30b7023c-05c8-4f24-981b-c3eb8a4ec89f",
        date: "2019-10-15T04:19:04.669Z",
        content:
          "Lorem pariatur tempor Lorem in sunt pariatur dolor magna labore non ea amet voluptate voluptate.",
        isCaller: true,
      },
    ],
  },
  {
    id: "db94ab2b-917f-4901-808d-dbec5e556ae4",
    caller: {
      id: "5dea5f4680c284a2d58ccd27",
      forename: "Gwendolyn",
      surname: "Morgan",
      phone: "+1 (863) 593-2852",
      avatar: "http://placehold.it/96/ccdee3",
    },
    unread: false,
    messages: [
      {
        id: "c722e0f4-bc17-4a66-8a73-0a3c5fb774e7",
        date: "2019-10-15T03:43:55.256Z",
        content:
          "Deserunt ad consequat excepteur reprehenderit et veniam sit aute dolore cillum amet ut.",
        isCaller: true,
      },
      {
        id: "f056a3bd-06ff-49f7-a27f-d4075c5c5698",
        date: "2019-10-15T04:25:27.228Z",
        content:
          "Anim tempor anim magna mollit incididunt officia qui labore nulla labore.",
        isCaller: false,
      },
    ],
  },
  {
    id: "e5e8a352-c526-4eb4-b8d3-a546785c430d",
    caller: {
      id: "5dea5f46a74c1bb00e8852fd",
      forename: "Vincent",
      surname: "Rowe",
      phone: "+1 (922) 488-2206",
      avatar: "http://placehold.it/96/31740",
    },
    unread: true,
    messages: [
      {
        id: "823ff47d-6523-4ac0-aad9-ae9ff7fda33e",
        date: "2019-10-15T03:43:55.256Z",
        content: "Labore elit nostrud minim Lorem Lorem.",
        isCaller: false,
      },
      {
        id: "864d32ed-fc58-452c-8f4a-85fcb7dd92f5",
        date: "2019-10-15T04:22:20.913Z",
        content: "Commodo amet pariatur id ex labore excepteur sunt minim.",
        isCaller: false,
      },
    ],
  },
]

export const searchTopics = (
  topics: MessagesInitialState["topics"],
  searchValue: MessagesInitialState["searchValue"]
) => {
  return topics.filter(({ caller, messages }) => {
    const search = searchValue.toLowerCase()
    const matchesForename = caller.forename.toLowerCase().includes(search)
    const matchesSurname = caller.surname.toLowerCase().includes(search)
    const matchesPhone = caller.phone.includes(search)
    const matchesMessage = messages.some(({ content }) =>
      content.toLowerCase().includes(search)
    )
    return matchesForename || matchesSurname || matchesPhone || matchesMessage
  })
}

export const filterTopics = (
  topics: MessagesInitialState["topics"],
  visibilityFilter: MessagesInitialState["visibilityFilter"]
) => {
  return topics.filter(({ unread }) => {
    switch (visibilityFilter) {
      case VisibilityFilter.All:
        return true
      case VisibilityFilter.Read:
        return !unread
      case VisibilityFilter.Unread:
        return unread
    }
  })
}

export const sortTopics = (topics: MessagesInitialState["topics"]) => {
  const lastMessageDate = ({ messages }: Topic) => {
    return messages[messages.length - 1].date
  }
  return topics.sort((a, b) => {
    const x = lastMessageDate(a)
    const y = lastMessageDate(b)
    return x > y ? -1 : x < y ? 1 : 0
  })
}
