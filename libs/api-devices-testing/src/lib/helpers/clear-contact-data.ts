/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { EntityData } from "device/models"

export function clearContact(entityData: EntityData): TestContact {
  const contact = entityData as unknown as TestContact

  const cleanString = (value: unknown): string | undefined =>
    typeof value === "string" && value.trim() !== "" ? value : undefined

  return {
    address: cleanString(contact.address),
    company: cleanString(contact.company),
    department: cleanString(contact.department),
    emailAddresses: contact.emailAddresses
      ?.slice()
      .sort((a, b) => a.emailAddress.localeCompare(b.emailAddress))
      .map((email) => ({
        emailAddress: email.emailAddress,
        emailType: normalizeType(email.emailType),
      })),
    entityType: cleanString(contact.entityType),
    firstName: cleanString(contact.firstName),
    lastName: cleanString(contact.lastName),
    middleName: cleanString(contact.middleName),
    namePrefix: cleanString(contact.namePrefix),
    nameSuffix: cleanString(contact.nameSuffix),
    notes: cleanString(contact.notes),
    phoneNumbers: contact.phoneNumbers
      ?.slice()
      .sort((a, b) => a.phoneNumber.localeCompare(b.phoneNumber))
      ?.map((phone) => ({
        phoneNumber: phone.phoneNumber,
        phoneType: normalizeType(phone.phoneType),
      })),
    website: cleanString(contact.website),
    workTitle: cleanString(contact.workTitle),
  }
}

interface TestContact {
  address?: string
  company?: string
  department?: string
  emailAddresses?: {
    emailAddress: string
    emailType: string
  }[]
  entityType?: string
  firstName?: string
  lastName?: string
  middleName?: string
  namePrefix?: string
  nameSuffix?: string
  notes?: string
  phoneNumbers?: {
    phoneNumber: string
    phoneType: string
  }[]
  website?: string
  workTitle?: string
}

function normalizeType(type: string): "HOME" | "WORK" | "OTHER" {
  const allowedTypes = ["HOME", "WORK", "OTHER"]
  return allowedTypes.includes(type as string)
    ? (type as "HOME" | "WORK" | "OTHER")
    : "OTHER"
}
