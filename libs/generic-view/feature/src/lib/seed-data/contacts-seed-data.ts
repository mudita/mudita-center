/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { EntityData } from "device/models"

const contactFullData1 = {
  firstName: "Anna",
  lastName: "Nowak",
  namePrefix: "Dr.",
  nameSuffix: "Jr.",
  middleName: "Maria",
  phoneNumbers: [{ phoneNumber: "+48123456789", phoneType: "MOBILE" }],
  emailAddresses: [
    { emailAddress: "anna.nowak@example.com", emailType: "WORK" },
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
  entityType: "contacts",
}

const contactFullData2 = {
  firstName: "John",
  lastName: "Doe",
  namePrefix: "Mr.",
  nameSuffix: "Sr.",
  middleName: "Paul",
  phoneNumbers: [
    { phoneNumber: "+441234567890", phoneType: "MOBILE" },
    { phoneNumber: "+441987654321", phoneType: "HOME" },
  ],
  emailAddresses: [
    { emailAddress: "john.doe@workplace.com", emailType: "WORK" },
    { emailAddress: "johnny.doe@gmail.com", emailType: "PERSONAL" },
  ],
  company: "Tech Solutions Inc.",
  department: "Engineering",
  workTitle: "Senior Developer",
  address: {
    streetAddress: "123 Elm Street",
    city: "London",
    country: "UK",
    type: "HOME",
  },
  website: "https://johndoe.com",
  notes: "Key project stakeholder.",
  entityType: "contacts",
}

const contactFullData3 = {
  firstName: "Emily",
  lastName: "Clark",
  namePrefix: "Ms.",
  nameSuffix: "",
  middleName: "Rose",
  phoneNumbers: [{ phoneNumber: "+12123456789", phoneType: "WORK" }],
  emailAddresses: [
    { emailAddress: "emily.clark@startup.com", emailType: "WORK" },
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
  entityType: "contacts",
}

const contactFullData4 = {
  firstName: "Michael",
  lastName: "Johnson",
  namePrefix: "Dr.",
  nameSuffix: "PhD",
  middleName: "David",
  phoneNumbers: [
    { phoneNumber: "+49876543210", phoneType: "MOBILE" },
    { phoneNumber: "+49871234567", phoneType: "HOME" },
  ],
  emailAddresses: [
    { emailAddress: "michael.j@researchlab.com", emailType: "WORK" },
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
  entityType: "contacts",
}

const contactFullData5 = {
  firstName: "Sophia",
  lastName: "Martinez",
  namePrefix: "Mrs.",
  nameSuffix: "",
  middleName: "Isabel",
  phoneNumbers: [
    { phoneNumber: "+33678901234", phoneType: "MOBILE" },
  ],
  emailAddresses: [
    {

      emailAddress: "sophia.martinez@fashionhouse.com",
      emailType: "WORK",
    },
    {

      emailAddress: "sophia.isabel@yahoo.com",
      emailType: "PERSONAL",
    },
  ],
  company: "Fashion House",
  department: "Design",
  workTitle: "Creative Director",
  address: {
    streetAddress: "101 Avenue des Champs-Élysées",
    city: "Paris",
    country: "France",
    type: "WORK",
  },
  website: "https://sophiamartinezdesigns.com",
  notes: "Influential in modern fashion trends.",
  entityType: "contacts",
}

const contactWithNumbersInName = {
  firstName: "Numer (last name is numeric)",
  lastName: "12345",
  phoneNumbers: [{ phoneNumber: "+48901234567", phoneType: "MOBILE" }],
  entityType: "contacts",
}

const contactWithPrefixSuffix = {
  namePrefix: "Prof.",
  nameSuffix: "PhD. (prefix & suffix only)",
  phoneNumbers: [{ phoneNumber: "+48345678901", phoneType: "MOBILE" }],
  entityType: "contacts",
}

const contactWithMiddleNameOnly = {
  middleName: "Jan (only middle name)",
  phoneNumbers: [{ phoneNumber: "+48234567890", phoneType: "HOME" }],
  entityType: "contacts",
}

const contactWithEmailOnly = {
  emailAddresses: [
    { emailAddress: "only@email.com", emailType: "HOME" },
  ],
  entityType: "contacts",
}

const contactWithNickname = {
  nickName: "Bobby (nickname only)",
  phoneNumbers: [{ phoneNumber: "+48456789012", phoneType: "WORK" }],
  entityType: "contacts",
}

const contactWithCompanyAndJobTitle = {
  company: "XYZ Inc. (company and job title)",
  workTitle: "CEO",
  phoneNumbers: [{ phoneNumber: "+48567890123", phoneType: "WORK" }],
  entityType: "contacts",
}

const contactWithAddressOnly = {
  address: {
    streetAddress: "Street 7 (only address)",
    city: "Berlin",
    postalCode: "10115",
    type: "HOME",
  },
  phoneNumbers: [{ phoneNumber: "+48678901234", phoneType: "OTHER" }],
  entityType: "contacts",
}

const contactWithSip = {
  sip: "sip:jan.nowak@siponly.com",
  phoneNumbers: [{ phoneNumber: "+48890123456", phoneType: "MOBILE" }],
  entityType: "contacts",
}

const contactWithWebsite = {
  website: "https://websiteonly.com",
  phoneNumbers: [
    { phoneNumber: "+48123456780", phoneType: "MOBILE" },
  ],
  entityType: "contacts",
}

const contactWithNotes = {
  notes: "This is a test note. (only notes)",
  phoneNumbers: [{ phoneNumber: "+48789012345", phoneType: "MOBILE" }],
  entityType: "contacts",
}

export const contactsSeedData: EntityData[] = [
  contactFullData1,
  contactFullData2,
  contactFullData3,
  contactFullData4,
  contactFullData5,
  contactWithNumbersInName,
  contactWithPrefixSuffix,
  contactWithMiddleNameOnly,
  contactWithEmailOnly,
  contactWithNickname,
  contactWithCompanyAndJobTitle,
  contactWithAddressOnly,
  contactWithSip,
  contactWithWebsite,
  contactWithNotes,
]
