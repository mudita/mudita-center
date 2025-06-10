/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { EntityData } from "device/models"

export const contactFullData1 = {
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
  phoneNumbers: [{ phoneNumber: "+33678901234", phoneType: "MOBILE" }],
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

const contactWithLongLastName = {
  firstName: "Long Display Name (last name is long)",
  lastName:
    "Anna Maria Katarzyna Nowak-Wielka-Zabłocka-Długosz-Ostrowska-Mickiewicz-Piękna-Sobieska-Kowalewska-Jagiellońska-Słowacka-Krzyżanowska-Kordecka-Kościuszkowska",
  phoneNumbers: [{ phoneNumber: "+48123456786", phoneType: "MOBILE" }],
  entityType: "contacts",
}
const contactWithLongFirstName = {
  firstName:
    "Aleksandra-Marianna-Katarzyna-Magdalena-Joanna-Weronika-Zofia-Karolina-Małgorzata-Anastazja",
  lastName: "Long Display Name (first name is long)",
  phoneNumbers: [{ phoneNumber: "+48234567890", phoneType: "MOBILE" }],
  entityType: "contacts",
}

const contactWithSpecialCharactersInLastName = {
  firstName: "Special Character (last name with special characters)",
  lastName: "!@#$%^&*()-=+[]{}|;:',.<>?/`~",
  phoneNumbers: [{ phoneNumber: "+49123454789", phoneType: "MOBILE" }],
  entityType: "contacts",
}

const contactWithSpecialCharactersInFirstName = {
  firstName: "###",
  lastName: "Special Character (first name with special characters)",
  phoneNumbers: [{ phoneNumber: "+49123426789", phoneType: "MOBILE" }],
  entityType: "contacts",
}

const contactWithPlusAsSpecialCharacterInLastName = {
  firstName: "Plus (last name with plus)",
  lastName: "+",
  phoneNumbers: [{ phoneNumber: "+49123156789", phoneType: "MOBILE" }],
  entityType: "contacts",
}

const contactWithPlusAsSpecialCharacterInFirstName = {
  firstName: "+",
  lastName: "Plus (first name with plus)",
  phoneNumbers: [{ phoneNumber: "+49123156789", phoneType: "MOBILE" }],
  entityType: "contacts",
}

const contactWithRepetitions = {
  firstName: "Marek",
  lastName: "Marmarecki",
  phoneNumbers: [
    { phoneNumber: "500500500", phoneType: "MOBILE" },
    { phoneNumber: "500500600", phoneType: "WORK" },
  ],
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
  entityType: "contacts",
}

const contactWithWithSpecialCharactersInMiddleName = {
  middleName: "%%%% (only middle name)",
  entityType: "contacts",
}

export const contactWithGermanyPhoneNumberOnly = {
  phoneNumbers: [{ phoneNumber: "490123456789", phoneType: "MOBILE" }],
  entityType: "contacts",
}

const contactWithIndiaPhoneNumberOnly = {
  phoneNumbers: [{ phoneNumber: "911234567890", phoneType: "MOBILE" }],
  entityType: "contacts",
}

const contactWithChinaPhoneNumberOnly = {
  phoneNumbers: [{ phoneNumber: "8612345678901", phoneType: "MOBILE" }],
  entityType: "contacts",
}

const contactWithMobilePhoneNumberOnly = {
  phoneNumbers: [{ phoneNumber: "+48345678902", phoneType: "MOBILE" }],
  entityType: "contacts",
}

const contactWithMobileAndHomePhoneNumbers = {
  phoneNumbers: [
    { phoneNumber: "+48345678902", phoneType: "MOBILE" },
    { phoneNumber: "+48445678903", phoneType: "HOME" },
  ],
  entityType: "contacts",
}

const contactWithMobileHomeAndWorkPhoneNumbers = {
  phoneNumbers: [
    { phoneNumber: "+48345678902", phoneType: "MOBILE" },
    { phoneNumber: "+48445678903", phoneType: "HOME" },
    { phoneNumber: "+48555678904", phoneType: "WORK" },
  ],
  entityType: "contacts",
}

const contactWithAllPhoneTypesPhoneNumbers = {
  phoneNumbers: [
    { phoneNumber: "+48345678902", phoneType: "MOBILE" },
    { phoneNumber: "+48445678903", phoneType: "HOME" },
    { phoneNumber: "+48555678904", phoneType: "WORK" },
    { phoneNumber: "+48665678905", phoneType: "OTHER" },
  ],
  entityType: "contacts",
}

const contactWithWorkAndOtherPhoneNumbers = {
  phoneNumbers: [
    { phoneNumber: "+48555678904", phoneType: "WORK" },
    { phoneNumber: "+48665678905", phoneType: "OTHER" },
  ],
  entityType: "contacts",
}

const contactWithGermanyPhoneNumberAndFirstName = {
  firstName: "Anna (Germany-style)",
  phoneNumbers: [{ phoneNumber: "48123456789", phoneType: "MOBILE" }],
  entityType: "contacts",
}

const contactWithBrazilPhoneNumberAndFirstName = {
  firstName: "Carlos (Brazil-style)",
  phoneNumbers: [{ phoneNumber: "551112345678", phoneType: "MOBILE" }],
  entityType: "contacts",
}

const contactWithJapanPhoneNumberAndFirstName = {
  firstName: "Yuki (Japan-style)",
  phoneNumbers: [{ phoneNumber: "81312345678", phoneType: "MOBILE" }],
  entityType: "contacts",
}

const contactWithContrastingPhoneNumbers1 = {
  firstName: "Liam (Ireland & Australia)",
  phoneNumbers: [
    { phoneNumber: "1512345678", phoneType: "MOBILE" },
    { phoneNumber: "611234567890123", phoneType: "WORK" },
  ],
  entityType: "contacts",
}

const contactWithContrastingPhoneNumbers2 = {
  firstName: "Amina (Morocco & USA)",
  phoneNumbers: [
    { phoneNumber: "201234567", phoneType: "HOME" },
    { phoneNumber: "14155552671", phoneType: "MOBILE" },
  ],
  entityType: "contacts",
}

const contactWithHomeEmailOnly = {
  emailAddresses: [{ emailAddress: "home@email.com", emailType: "HOME" }],
  entityType: "contacts",
}

const contactWithHomeAndWorkEmails = {
  emailAddresses: [
    { emailAddress: "home@email.com", emailType: "HOME" },
    { emailAddress: "work@email.com", emailType: "WORK" },
  ],
  entityType: "contacts",
}

const contactWithHomeWorkAndOtherEmails = {
  emailAddresses: [
    { emailAddress: "home@email.com", emailType: "HOME" },
    { emailAddress: "work@email.com", emailType: "WORK" },
    { emailAddress: "other@email.com", emailType: "OTHER" },
  ],
  entityType: "contacts",
}

const contactWithAllEmailTypes = {
  emailAddresses: [
    { emailAddress: "home@email.com", emailType: "HOME" },
    { emailAddress: "work@email.com", emailType: "WORK" },
    { emailAddress: "other@email.com", emailType: "OTHER" },
    { emailAddress: "unknown@email.com", emailType: "UNKNOWN" },
  ],
  entityType: "contacts",
}

const contactWithWorkAndOtherEmails = {
  emailAddresses: [
    { emailAddress: "work@email.com", emailType: "WORK" },
    { emailAddress: "other@email.com", emailType: "OTHER" },
  ],
  entityType: "contacts",
}

const contactWithNicknameOnly = {
  nickName: "Bobby (nickname only)",
  entityType: "contacts",
}

const contactWithCompanyOnly = {
  company: "Innovative Technologies (company)",
  entityType: "contacts",
}

const contactWithDepartmentOnly = {
  department: "Human Resources (department)",
  entityType: "contacts",
}

const contactWithWorkTitleOnly = {
  workTitle: "Chief Marketing Officer (job title)",
  entityType: "contacts",
}

const contactWithCompanyAndDepartment = {
  company: "Innovative Technologies (company & department)",
  department: "Human Resources",
  entityType: "contacts",
}

const contactWithCompanyAndWorkTitle = {
  company: "Innovative Technologies (company & job title)",
  workTitle: "Chief Marketing Officer",
  entityType: "contacts",
}

const contactWithDepartmentAndWorkTitle = {
  department: "Human Resources (department & job title)",
  workTitle: "Chief Marketing Officer",
  entityType: "contacts",
}

const contactWithCompanyDepartmentAndWorkTitle = {
  company: "Innovative Technologies (company, department & job title)",
  department: "Human Resources",
  workTitle: "Chief Marketing Officer",
  entityType: "contacts",
}

const contactWithFullAddressOnly = {
  address: {
    streetAddress: "Street 7 (full address)",
    city: "Berlin",
    zipCode: "10115",
    type: "HOME",
  },
  entityType: "contacts",
}

const contactWithStreetAddressOnly = {
  contactId: "2",
  firstName: "Jane",
  lastName: "Smith",
  address: {
    streetAddress: "Street 5 (only street address)",
    type: "HOME",
  },
  entityType: "contacts",
}

const contactWithCityOnly = {
  contactId: "3",
  firstName: "Adam",
  lastName: "Johnson",
  address: {
    city: "Krakow",
    type: "HOME",
  },
  entityType: "contacts",
}

const contactWithZipCodeOnly = {
  contactId: "4",
  firstName: "Emily",
  lastName: "Davis",
  address: {
    zipCode: "00-002",
    type: "HOME",
  },
  entityType: "contacts",
}

const contactWithStreetAndZipCode = {
  contactId: "5",
  firstName: "Michael",
  lastName: "Brown",
  address: {
    streetAddress: "Street 9",
    zipCode: "00-003",
    type: "HOME",
  },
  entityType: "contacts",
}

const contactWithStateAndCountry = {
  contactId: "5",
  firstName: "Michael",
  lastName: "Brown",
  address: {
    state: "California",
    country: "USA",
    type: "HOME",
  },
  entityType: "contacts",
}

const contactWithSipOnly = {
  sip: "sip:jan.nowak@siponly.com",
  entityType: "contacts",
}

const contactWithWebsiteOnly = {
  website: "https://websiteonly.com",
  entityType: "contacts",
}

const contactWithNotesOnly = {
  notes: "This is a test note. (only notes)",
  entityType: "contacts",
}

const contactWithOnlyEmojiFirstName = {
  firstName: "🌞",
  lastName: "Clark",
  phoneNumbers: [{ phoneNumber: "+12123456789", phoneType: "MOBILE" }],
  entityType: "contacts",
}

const contactWithOnlyEmojiLastName = {
  firstName: "John",
  lastName: "🍀",
  phoneNumbers: [{ phoneNumber: "+441234567890", phoneType: "MOBILE" }],
  entityType: "contacts",
}

const contactWithOnlyEmojiNickname = {
  nickName: "🐶🐱",
  phoneNumbers: [{ phoneNumber: "+49876543210", phoneType: "MOBILE" }],
  entityType: "contacts",
}

const contactWithOnlyEmojiCompany = {
  company: "🚀💼",
  phoneNumbers: [{ phoneNumber: "+48123456789", phoneType: "MOBILE" }],
  entityType: "contacts",
}

const contactWithOnlyEmojiNotes = {
  notes: "💡🚨",
  phoneNumbers: [{ phoneNumber: "+48223456789", phoneType: "WORK" }],
  entityType: "contacts",
}

export const contactsSeedData: EntityData[] = [
  contactFullData1,
  contactFullData2,
  contactFullData3,
  contactFullData4,
  contactFullData5,
  contactWithLongLastName,
  contactWithLongFirstName,
  contactWithSpecialCharactersInLastName,
  contactWithSpecialCharactersInFirstName,
  contactWithPlusAsSpecialCharacterInLastName,
  contactWithPlusAsSpecialCharacterInFirstName,
  contactWithRepetitions,
  contactWithNumbersInName,
  contactWithPrefixSuffix,
  contactWithMiddleNameOnly,
  contactWithWithSpecialCharactersInMiddleName,
  contactWithGermanyPhoneNumberOnly,
  contactWithIndiaPhoneNumberOnly,
  contactWithChinaPhoneNumberOnly,
  contactWithMobilePhoneNumberOnly,
  contactWithMobileAndHomePhoneNumbers,
  contactWithMobileHomeAndWorkPhoneNumbers,
  contactWithAllPhoneTypesPhoneNumbers,
  contactWithWorkAndOtherPhoneNumbers,
  contactWithGermanyPhoneNumberAndFirstName,
  contactWithBrazilPhoneNumberAndFirstName,
  contactWithJapanPhoneNumberAndFirstName,
  contactWithContrastingPhoneNumbers1,
  contactWithContrastingPhoneNumbers2,
  contactWithHomeEmailOnly,
  contactWithHomeAndWorkEmails,
  contactWithHomeWorkAndOtherEmails,
  contactWithAllEmailTypes,
  contactWithWorkAndOtherEmails,
  contactWithNicknameOnly,
  contactWithCompanyOnly,
  contactWithDepartmentOnly,
  contactWithWorkTitleOnly,
  contactWithCompanyAndDepartment,
  contactWithCompanyAndWorkTitle,
  contactWithDepartmentAndWorkTitle,
  contactWithCompanyDepartmentAndWorkTitle,
  contactWithFullAddressOnly,
  contactWithStreetAddressOnly,
  contactWithCityOnly,
  contactWithZipCodeOnly,
  contactWithStreetAndZipCode,
  contactWithStateAndCountry,
  contactWithSipOnly,
  contactWithWebsiteOnly,
  contactWithNotesOnly,
  contactWithOnlyEmojiFirstName,
  contactWithOnlyEmojiLastName,
  contactWithOnlyEmojiNickname,
  contactWithOnlyEmojiCompany,
  contactWithOnlyEmojiNotes,
]
