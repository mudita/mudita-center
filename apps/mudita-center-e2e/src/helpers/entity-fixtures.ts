/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { EntityData } from "device/models"

export const contactEntities: EntityData[] = [
  {
    entityType: "contacts",
    contactId: "425",
    searchName: "Dr. Anna Nowak Jr.",
    sortField: "NowakAnna",
    firstName: "Anna",
    lastName: "Nowak",
    namePrefix: "Dr.",
    middleName: "Maria",
    nameSuffix: "Jr.",
    phoneNumbers: [
      {
        id: "2981",
        phoneNumber: "+48123456789",
        phoneType: "MOBILE",
      },
    ],
    emailAddresses: [
      {
        id: "2982",
        emailAddress: "anna.nowak@example.com",
        emailType: "WORK",
      },
    ],
    company: "ABC Corp.",
    department: "HR",
    workTitle: "Manager",
    address: {
      streetAddress: "Main Street 12",
      city: "Warsaw",
      country: "Poland",
      type: "WORK",
    },
    website: "https://example.com",
    notes: "VIP client",
    starred: false,
    displayName1: "Dr.",
    displayName2: "Anna",
    displayName3: "Nowak",
    displayName4: "Jr.",
  },
  {
    entityType: "contacts",
    contactId: "426",
    searchName: "Ms. Emily Clark",
    sortField: "ClarkEmily",
    firstName: "Emily",
    lastName: "Clark",
    namePrefix: "Ms.",
    middleName: "Rose",
    phoneNumbers: [
      {
        id: "2989",
        phoneNumber: "+12123456789",
        phoneType: "WORK",
      },
    ],
    emailAddresses: [
      {
        id: "2990",
        emailAddress: "emily.clark@startup.com",
        emailType: "WORK",
      },
    ],
    company: "Innovatech",
    department: "Marketing",
    workTitle: "Marketing Director",
    address: {
      streetAddress: "456 Innovation Ave",
      city: "San Francisco",
      country: "USA",
      type: "WORK",
    },
    website: "https://emilyclark.me",
    notes: "Lead of the marketing strategy team.",
    starred: false,
    displayName1: "Ms.",
    displayName2: "Emily",
    displayName3: "Clark",
  },
  {
    entityType: "contacts",
    contactId: "427",
    searchName: "Dr. Michael Johnson PhD",
    sortField: "JohnsonMichael",
    firstName: "Michael",
    lastName: "Johnson",
    namePrefix: "Dr.",
    middleName: "David",
    nameSuffix: "PhD",
    phoneNumbers: [
      {
        id: "2997",
        phoneNumber: "+49876543210",
        phoneType: "MOBILE",
      },
      {
        id: "2998",
        phoneNumber: "+49871234567",
        phoneType: "HOME",
      },
    ],
    emailAddresses: [
      {
        id: "2999",
        emailAddress: "michael.j@researchlab.com",
        emailType: "WORK",
      },
    ],
    company: "Research Labs",
    department: "R&D",
    workTitle: "Chief Scientist",
    address: {
      streetAddress: "789 Science Blvd",
      city: "Berlin",
      country: "Germany",
      type: "WORK",
    },
    website: "https://michaeljohnsonphd.com",
    notes: "Collaborating on AI research projects.",
    starred: false,
    displayName1: "Dr.",
    displayName2: "Michael",
    displayName3: "Johnson",
    displayName4: "PhD",
  },
  {
    entityType: "contacts",
    contactId: "428",
    searchName:
      "Long Display Name (last name is long) Anna Maria Katarzyna Nowak-Wielka-Zabłocka-Długosz-Ostrowska-Mickiewicz-Piękna-Sobieska-Kowalewska-Jagiellońska-Słowacka-Krzyżanowska-Kordecka-Kościuszkowska",
    sortField:
      "Anna Maria Katarzyna Nowak-Wielka-Zabłocka-Długosz-Ostrowska-Mickiewicz-Piękna-Sobieska-Kowalewska-Jagiellońska-Słowacka-Krzyżanowska-Kordecka-KościuszkowskaLong Display Name (last name is long)",
    firstName: "Long Display Name (last name is long)",
    lastName:
      "Anna Maria Katarzyna Nowak-Wielka-Zabłocka-Długosz-Ostrowska-Mickiewicz-Piękna-Sobieska-Kowalewska-Jagiellońska-Słowacka-Krzyżanowska-Kordecka-Kościuszkowska",
    phoneNumbers: [
      {
        id: "3006",
        phoneNumber: "+48123456786",
        phoneType: "MOBILE",
      },
    ],
    starred: false,
    displayName2: "Long Display Name (last name is long)",
    displayName3:
      "Anna Maria Katarzyna Nowak-Wielka-Zabłocka-Długosz-Ostrowska-Mickiewicz-Piękna-Sobieska-Kowalewska-Jagiellońska-Słowacka-Krzyżanowska-Kordecka-Kościuszkowska",
  },
  {
    entityType: "contacts",
    contactId: "429",
    searchName:
      "Aleksandra-Marianna-Katarzyna-Magdalena-Joanna-Weronika-Zofia-Karolina-Małgorzata-Anastazja Long Display Name (first name is long)",
    sortField:
      "Long Display Name (first name is long)Aleksandra-Marianna-Katarzyna-Magdalena-Joanna-Weronika-Zofia-Karolina-Małgorzata-Anastazja",
    firstName:
      "Aleksandra-Marianna-Katarzyna-Magdalena-Joanna-Weronika-Zofia-Karolina-Małgorzata-Anastazja",
    lastName: "Long Display Name (first name is long)",
    phoneNumbers: [
      {
        id: "3013",
        phoneNumber: "+48234567890",
        phoneType: "MOBILE",
      },
    ],
    starred: false,
    displayName2:
      "Aleksandra-Marianna-Katarzyna-Magdalena-Joanna-Weronika-Zofia-Karolina-Małgorzata-Anastazja",
    displayName3: "Long Display Name (first name is long)",
  },
  {
    entityType: "contacts",
    contactId: "430",
    searchName:
      "Special Character (last name with special characters) !@#$%^&*()-=+[]{}|;:',.<>?/`~",
    sortField:
      "!@#$%^&*()-=+[]{}|;:',.<>?/`~Special Character (last name with special characters)",
    firstName: "Special Character (last name with special characters)",
    lastName: "!@#$%^&*()-=+[]{}|;:',.<>?/`~",
    phoneNumbers: [
      {
        id: "3020",
        phoneNumber: "+49123454789",
        phoneType: "MOBILE",
      },
    ],
    starred: false,
    displayName2: "Special Character (last name with special characters)",
    displayName3: "!@#$%^&*()-=+[]{}|;:',.<>?/`~",
  },
  {
    entityType: "contacts",
    contactId: "431",
    searchName: "### Special Character (first name with special characters)",
    sortField: "Special Character (first name with special characters)###",
    firstName: "###",
    lastName: "Special Character (first name with special characters)",
    phoneNumbers: [
      {
        id: "3027",
        phoneNumber: "+49123426789",
        phoneType: "MOBILE",
      },
    ],
    starred: false,
    displayName2: "###",
    displayName3: "Special Character (first name with special characters)",
  },
  {
    entityType: "contacts",
    contactId: "432",
    searchName: "Plus (last name with plus) +",
    sortField: "+Plus (last name with plus)",
    firstName: "Plus (last name with plus)",
    lastName: "+",
    phoneNumbers: [
      {
        id: "3034",
        phoneNumber: "+49123156789",
        phoneType: "MOBILE",
      },
    ],
    starred: false,
    displayName2: "Plus (last name with plus)",
    displayName3: "+",
  },
  {
    entityType: "contacts",
    contactId: "433",
    searchName: "+ Plus (first name with plus)",
    sortField: "Plus (first name with plus)+",
    firstName: "+",
    lastName: "Plus (first name with plus)",
    phoneNumbers: [
      {
        id: "3041",
        phoneNumber: "+49123156789",
        phoneType: "MOBILE",
      },
    ],
    starred: false,
    displayName2: "+",
    displayName3: "Plus (first name with plus)",
  },
  {
    entityType: "contacts",
    contactId: "434",
    searchName: "Marek Marmarecki",
    sortField: "MarmareckiMarek",
    firstName: "Marek",
    lastName: "Marmarecki",
    phoneNumbers: [
      {
        id: "3048",
        phoneNumber: "500500500",
        phoneType: "MOBILE",
      },
      {
        id: "3049",
        phoneNumber: "500500600",
        phoneType: "WORK",
      },
    ],
    starred: false,
    displayName2: "Marek",
    displayName3: "Marmarecki",
  },
  {
    entityType: "contacts",
    contactId: "435",
    searchName: "Numer (last name is numeric) 12345",
    sortField: "12345Numer (last name is numeric)",
    firstName: "Numer (last name is numeric)",
    lastName: "12345",
    phoneNumbers: [
      {
        id: "3056",
        phoneNumber: "+48901234567",
        phoneType: "MOBILE",
      },
    ],
    starred: false,
    displayName2: "Numer (last name is numeric)",
    displayName3: "12345",
  },
  {
    entityType: "contacts",
    contactId: "436",
    searchName: "Prof. PhD. (prefix & suffix only)",
    sortField: "Prof.",
    namePrefix: "Prof.",
    nameSuffix: "PhD. (prefix & suffix only)",
    phoneNumbers: [
      {
        id: "3063",
        phoneNumber: "+48345678901",
        phoneType: "MOBILE",
      },
    ],
    starred: false,
    displayName1: "Prof.",
    displayName4: "PhD. (prefix & suffix only)",
  },
  {
    entityType: "contacts",
    contactId: "437",
    searchName: "Jan (only middle name)",
    sortField: "Jan (only middle name)",
    middleName: "Jan (only middle name)",
    starred: false,
    displayName3: "Jan (only middle name)",
  },
  {
    entityType: "contacts",
    contactId: "438",
    searchName: "%%%% (only middle name)",
    sortField: "%%%% (only middle name)",
    middleName: "%%%% (only middle name)",
    starred: false,
    displayName3: "%%%% (only middle name)",
  },
  {
    entityType: "contacts",
    contactId: "439",
    searchName: "490123456789",
    sortField: "490123456789",
    phoneNumbers: [
      {
        id: "3082",
        phoneNumber: "490123456789",
        phoneType: "MOBILE",
      },
    ],
    starred: false,
    displayName3: "490123456789",
  },
  {
    entityType: "contacts",
    contactId: "440",
    searchName: "911234567890",
    sortField: "911234567890",
    phoneNumbers: [
      {
        id: "3089",
        phoneNumber: "911234567890",
        phoneType: "MOBILE",
      },
    ],
    starred: false,
    displayName3: "911234567890",
  },
  {
    entityType: "contacts",
    contactId: "441",
    searchName: "8612345678901",
    sortField: "8612345678901",
    phoneNumbers: [
      {
        id: "3096",
        phoneNumber: "8612345678901",
        phoneType: "MOBILE",
      },
    ],
    starred: false,
    displayName3: "8612345678901",
  },
  {
    entityType: "contacts",
    contactId: "442",
    searchName: "+48345678902",
    sortField: "+48345678902",
    phoneNumbers: [
      {
        id: "3103",
        phoneNumber: "+48345678902",
        phoneType: "MOBILE",
      },
    ],
    starred: false,
    displayName3: "+48345678902",
  },
  {
    entityType: "contacts",
    contactId: "443",
    searchName: "+48345678902",
    sortField: "+48345678902",
    phoneNumbers: [
      {
        id: "3110",
        phoneNumber: "+48345678902",
        phoneType: "MOBILE",
      },
      {
        id: "3111",
        phoneNumber: "+48445678903",
        phoneType: "HOME",
      },
    ],
    starred: false,
    displayName3: "+48345678902",
  },
  {
    entityType: "contacts",
    contactId: "444",
    searchName: "+48345678902",
    sortField: "+48345678902",
    phoneNumbers: [
      {
        id: "3118",
        phoneNumber: "+48345678902",
        phoneType: "MOBILE",
      },
      {
        id: "3119",
        phoneNumber: "+48445678903",
        phoneType: "HOME",
      },
      {
        id: "3120",
        phoneNumber: "+48555678904",
        phoneType: "WORK",
      },
    ],
    starred: false,
    displayName3: "+48345678902",
  },
  {
    entityType: "contacts",
    contactId: "445",
    searchName: "+48345678902",
    sortField: "+48345678902",
    phoneNumbers: [
      {
        id: "3127",
        phoneNumber: "+48345678902",
        phoneType: "MOBILE",
      },
      {
        id: "3128",
        phoneNumber: "+48445678903",
        phoneType: "HOME",
      },
      {
        id: "3130",
        phoneNumber: "+48665678905",
        phoneType: "OTHER",
      },
      {
        id: "3129",
        phoneNumber: "+48555678904",
        phoneType: "WORK",
      },
    ],
    starred: false,
    displayName3: "+48345678902",
  },
  {
    entityType: "contacts",
    contactId: "446",
    searchName: "+48555678904",
    sortField: "+48555678904",
    phoneNumbers: [
      {
        id: "3138",
        phoneNumber: "+48665678905",
        phoneType: "OTHER",
      },
      {
        id: "3137",
        phoneNumber: "+48555678904",
        phoneType: "WORK",
      },
    ],
    starred: false,
    displayName3: "+48555678904",
  },
  {
    entityType: "contacts",
    contactId: "447",
    searchName: "Anna (Germany-style)",
    sortField: "Anna (Germany-style)",
    firstName: "Anna (Germany-style)",
    phoneNumbers: [
      {
        id: "3145",
        phoneNumber: "48123456789",
        phoneType: "MOBILE",
      },
    ],
    starred: false,
    displayName2: "Anna (Germany-style)",
  },
  {
    entityType: "contacts",
    contactId: "448",
    searchName: "Carlos (Brazil-style)",
    sortField: "Carlos (Brazil-style)",
    firstName: "Carlos (Brazil-style)",
    phoneNumbers: [
      {
        id: "3152",
        phoneNumber: "551112345678",
        phoneType: "MOBILE",
      },
    ],
    starred: false,
    displayName2: "Carlos (Brazil-style)",
  },
  {
    entityType: "contacts",
    contactId: "449",
    searchName: "Yuki (Japan-style)",
    sortField: "Yuki (Japan-style)",
    firstName: "Yuki (Japan-style)",
    phoneNumbers: [
      {
        id: "3159",
        phoneNumber: "81312345678",
        phoneType: "MOBILE",
      },
    ],
    starred: false,
    displayName2: "Yuki (Japan-style)",
  },
  {
    entityType: "contacts",
    contactId: "450",
    searchName: "Liam (Ireland & Australia)",
    sortField: "Liam (Ireland & Australia)",
    firstName: "Liam (Ireland & Australia)",
    phoneNumbers: [
      {
        id: "3166",
        phoneNumber: "1512345678",
        phoneType: "MOBILE",
      },
      {
        id: "3167",
        phoneNumber: "611234567890123",
        phoneType: "WORK",
      },
    ],
    starred: false,
    displayName2: "Liam (Ireland & Australia)",
  },
  {
    entityType: "contacts",
    contactId: "451",
    searchName: "Amina (Morocco & USA)",
    sortField: "Amina (Morocco & USA)",
    firstName: "Amina (Morocco & USA)",
    phoneNumbers: [
      {
        id: "3175",
        phoneNumber: "14155552671",
        phoneType: "MOBILE",
      },
      {
        id: "3174",
        phoneNumber: "201234567",
        phoneType: "HOME",
      },
    ],
    starred: false,
    displayName2: "Amina (Morocco & USA)",
  },
  {
    entityType: "contacts",
    contactId: "452",
    searchName: "home@email.com",
    sortField: "home@email.com",
    emailAddresses: [
      {
        id: "3182",
        emailAddress: "home@email.com",
        emailType: "HOME",
      },
    ],
    starred: false,
    displayName3: "home@email.com",
  },
  {
    entityType: "contacts",
    contactId: "453",
    searchName: "home@email.com",
    sortField: "home@email.com",
    emailAddresses: [
      {
        id: "3189",
        emailAddress: "home@email.com",
        emailType: "HOME",
      },
      {
        id: "3190",
        emailAddress: "work@email.com",
        emailType: "WORK",
      },
    ],
    starred: false,
    displayName3: "home@email.com",
  },
  {
    entityType: "contacts",
    contactId: "454",
    searchName: "home@email.com",
    sortField: "home@email.com",
    emailAddresses: [
      {
        id: "3197",
        emailAddress: "home@email.com",
        emailType: "HOME",
      },
      {
        id: "3198",
        emailAddress: "work@email.com",
        emailType: "WORK",
      },
      {
        id: "3199",
        emailAddress: "other@email.com",
        emailType: "OTHER",
      },
    ],
    starred: false,
    displayName3: "home@email.com",
  },
  {
    entityType: "contacts",
    contactId: "455",
    searchName: "home@email.com",
    sortField: "home@email.com",
    emailAddresses: [
      {
        id: "3206",
        emailAddress: "home@email.com",
        emailType: "HOME",
      },
      {
        id: "3207",
        emailAddress: "work@email.com",
        emailType: "WORK",
      },
      {
        id: "3208",
        emailAddress: "other@email.com",
        emailType: "OTHER",
      },
      {
        id: "3209",
        emailAddress: "unknown@email.com",
        emailType: "OTHER",
      },
    ],
    starred: false,
    displayName3: "home@email.com",
  },
  {
    entityType: "contacts",
    contactId: "456",
    searchName: "work@email.com",
    sortField: "work@email.com",
    emailAddresses: [
      {
        id: "3216",
        emailAddress: "work@email.com",
        emailType: "WORK",
      },
      {
        id: "3217",
        emailAddress: "other@email.com",
        emailType: "OTHER",
      },
    ],
    starred: false,
    displayName3: "work@email.com",
  },
  {
    entityType: "contacts",
    contactId: "457",
    searchName: "Bobby (nickname only)",
    sortField: "Bobby (nickname only)",
    nickName: "Bobby (nickname only)",
    starred: false,
    displayName3: "Bobby (nickname only)",
  },
  {
    entityType: "contacts",
    contactId: "458",
    searchName: "Innovative Technologies (company)",
    sortField: "Innovative Technologies (company)",
    company: "Innovative Technologies (company)",
    starred: false,
    displayName3: "Innovative Technologies (company)",
  },
  {
    entityType: "contacts",
    contactId: "459",
    searchName: "Human Resources (department)",
    sortField: "Human Resources (department)",
    department: "Human Resources (department)",
    starred: false,
    displayName3: "Human Resources (department)",
  },
  {
    entityType: "contacts",
    contactId: "460",
    searchName: "Chief Marketing Officer (job title)",
    sortField: "Chief Marketing Officer (job title)",
    workTitle: "Chief Marketing Officer (job title)",
    starred: false,
    displayName3: "Chief Marketing Officer (job title)",
  },
  {
    entityType: "contacts",
    contactId: "461",
    searchName: "Innovative Technologies (company & department)",
    sortField: "Innovative Technologies (company & department)",
    company: "Innovative Technologies (company & department)",
    department: "Human Resources",
    starred: false,
    displayName3: "Innovative Technologies (company & department)",
  },
  {
    entityType: "contacts",
    contactId: "462",
    searchName: "Innovative Technologies (company & job title)",
    sortField: "Innovative Technologies (company & job title)",
    company: "Innovative Technologies (company & job title)",
    workTitle: "Chief Marketing Officer",
    starred: false,
    displayName3: "Innovative Technologies (company & job title)",
  },
  {
    entityType: "contacts",
    contactId: "463",
    searchName: "Human Resources (department & job title)",
    sortField: "Human Resources (department & job title)",
    department: "Human Resources (department & job title)",
    workTitle: "Chief Marketing Officer",
    starred: false,
    displayName3: "Human Resources (department & job title)",
  },
  {
    entityType: "contacts",
    contactId: "464",
    searchName: "Innovative Technologies (company, department & job title)",
    sortField: "Innovative Technologies (company, department & job title)",
    company: "Innovative Technologies (company, department & job title)",
    department: "Human Resources",
    workTitle: "Chief Marketing Officer",
    starred: false,
    displayName3: "Innovative Technologies (company, department & job title)",
  },
  {
    entityType: "contacts",
    contactId: "465",
    searchName: "Street 7 (full address), 10115, Berlin",
    sortField: "Street 7 (full address), Berlin, 10115",
    address: {
      streetAddress: "Street 7 (full address)",
      city: "Berlin",
      zipCode: "10115",
      type: "HOME",
    },
    starred: false,
    displayName3: "Street 7 (full address), 10115, Berlin",
  },
  {
    entityType: "contacts",
    contactId: "466",
    searchName: "Jane Smith",
    sortField: "SmithJane",
    firstName: "Jane",
    lastName: "Smith",
    address: {
      streetAddress: "Street 5 (only street address)",
      type: "HOME",
    },
    starred: false,
    displayName2: "Jane",
    displayName3: "Smith",
  },
  {
    entityType: "contacts",
    contactId: "467",
    searchName: "Adam Johnson",
    sortField: "JohnsonAdam",
    firstName: "Adam",
    lastName: "Johnson",
    address: {
      city: "Krakow",
      type: "HOME",
    },
    starred: false,
    displayName2: "Adam",
    displayName3: "Johnson",
  },
  {
    entityType: "contacts",
    contactId: "468",
    searchName: "Emily Davis",
    sortField: "DavisEmily",
    firstName: "Emily",
    lastName: "Davis",
    address: {
      zipCode: "00-002",
      type: "HOME",
    },
    starred: false,
    displayName2: "Emily",
    displayName3: "Davis",
  },
  {
    entityType: "contacts",
    contactId: "469",
    searchName: "Michael Brown",
    sortField: "BrownMichael",
    firstName: "Michael",
    lastName: "Brown",
    address: {
      streetAddress: "Street 9",
      zipCode: "00-003",
      type: "HOME",
    },
    starred: false,
    displayName2: "Michael",
    displayName3: "Brown",
  },
  {
    entityType: "contacts",
    contactId: "470",
    searchName: "Michael Brown",
    sortField: "BrownMichael",
    firstName: "Michael",
    lastName: "Brown",
    address: {
      state: "California",
      country: "USA",
      type: "HOME",
    },
    starred: false,
    displayName2: "Michael",
    displayName3: "Brown",
  },
  {
    entityType: "contacts",
    contactId: "471",
    searchName: "sip:jan.nowak@siponly.com",
    sortField: "sip:jan.nowak@siponly.com",
    sip: "sip:jan.nowak@siponly.com",
    starred: false,
    displayName3: "sip:jan.nowak@siponly.com",
  },
  {
    entityType: "contacts",
    contactId: "472",
    searchName: "https://websiteonly.com",
    sortField: "https://websiteonly.com",
    website: "https://websiteonly.com",
    starred: false,
    displayName3: "https://websiteonly.com",
  },
  {
    entityType: "contacts",
    contactId: "473",
    searchName: "This is a test note. (only notes)",
    sortField: "This is a test note. (only notes)",
    notes: "This is a test note. (only notes)",
    starred: false,
    displayName3: "This is a test note. (only notes)",
  },
  {
    entityType: "contacts",
    contactId: "474",
    searchName: "🌞 Clark",
    sortField: "Clark🌞",
    firstName: "🌞",
    lastName: "Clark",
    phoneNumbers: [
      {
        id: "3327",
        phoneNumber: "+12123456789",
        phoneType: "MOBILE",
      },
    ],
    starred: false,
    displayName2: "🌞",
    displayName3: "Clark",
  },
  {
    entityType: "contacts",
    contactId: "475",
    searchName: "John 🍀",
    sortField: "🍀John",
    firstName: "John",
    lastName: "🍀",
    phoneNumbers: [
      {
        id: "3334",
        phoneNumber: "+441234567890",
        phoneType: "MOBILE",
      },
    ],
    starred: false,
    displayName2: "John",
    displayName3: "🍀",
  },
  {
    entityType: "contacts",
    contactId: "476",
    searchName: "+49876543210",
    sortField: "+49876543210",
    phoneNumbers: [
      {
        id: "3341",
        phoneNumber: "+49876543210",
        phoneType: "MOBILE",
      },
    ],
    nickName: "🐶🐱",
    starred: false,
    displayName3: "+49876543210",
  },
  {
    entityType: "contacts",
    contactId: "477",
    searchName: "+48123456789",
    sortField: "+48123456789",
    phoneNumbers: [
      {
        id: "3348",
        phoneNumber: "+48123456789",
        phoneType: "MOBILE",
      },
    ],
    company: "🚀💼",
    starred: false,
    displayName3: "+48123456789",
  },
  {
    entityType: "contacts",
    contactId: "478",
    searchName: "+48223456789",
    sortField: "+48223456789",
    phoneNumbers: [
      {
        id: "3355",
        phoneNumber: "+48223456789",
        phoneType: "WORK",
      },
    ],
    notes: "💡🚨",
    starred: false,
    displayName3: "+48223456789",
  },
]

export const selectedContactsEntities: EntityData[] = [
  contactEntities[0], // Dr. Anna Nowak Jr. – spełnia wymagania a (First name and Last name + Phone)
  contactEntities[2], // Dr. Michael Johnson PhD – spełnia wymagania c (Suffix, First name and Last name + Phone)
  contactEntities[3], // Long Display Name (last name is long) – spełnia wymagania e (Last name only + Phone)
  contactEntities[9], // Plus (last name with plus) – nietypowy przypadek nazwiska z symbolem "+"
  contactEntities[10], // Marek Marmarecki – spełnia wymagania g (Contact with two phone numbers)
  contactEntities[19], // +48345678902 – spełnia wymagania f (Phone only)
  contactEntities[31], // Anna (Germany-style) – różnicujący przypadek z imieniem i numerem
  contactEntities[33], // Carlos (Brazil-style) – różnicujący przypadek regionalny
  contactEntities[44], // 🌞 Clark – różnicujący przypadek z emoji w imieniu
  contactEntities[45], // John 🍀 – różnicujący przypadek z emoji w nazwisku
  contactEntities[46], // 🐶🐱 (nickname) – różnicujący przypadek z emoji w pseudonimie
  contactEntities[53], // 💡🚨 (notes) – różnicujący przypadek z emoji w notatkach
  contactEntities[7], // Special Character (last name with special characters) – różnicujący przypadek z nietypowym nazwiskiem
  contactEntities[13], // Numer (last name is numeric) – różnicujący przypadek z liczbami w nazwisku
  contactEntities[19], // +48345678902 – sam numer, spełnia wymaganie f
  contactEntities[47], // Liam (Ireland & Australia) – kontakt z numerami z różnych regionów
  contactEntities[48], // Amina (Morocco & USA) – różnorodność regionalna i wiele numerów
]

export const audioFileEntities: EntityData[] = [
  {
    id: "457",
    filePath: "/storage/emulated/0/test.mp3",
    fileName: "test.mp3",
    extension: "mp3",
    fileSize: 1048576000,
    fileType: "AUDIO",
    mimeType: "audio/mpeg",
    isInternal: true,
    entityType: "audioFiles",
  },
]
