/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  ContactObject,
  ContactInput,
  ContactEntity,
  ContactNameEntity,
  ContactNumberEntity,
  ContactAddressEntity,
  ContactGroupEntity,
  ContactMatchGroupEntity,
} from "App/data-sync/types"

const forbiddenRestrictedPureId = "0"

export class ContactPresenter {
  public findRecords<Type extends { contact_id: string }>(
    data: { contact_id: string }[],
    contactId: string
  ): Type[] {
    return (
      (data as unknown as Type[]).filter(
        (item) => item.contact_id === contactId
      ) || []
    )
  }

  public serializeRecord<Type>(values: string[][], columns: string[]): Type[] {
    return values.map((item) => {
      return columns.reduce((acc: Record<string, string>, value, index) => {
        acc[value.trim()] = String(item[index]).trim()
        return acc
      }, {})
    }) as unknown as Type[]
  }

  private contactFavored(
    groups: ContactGroupEntity[],
    contactGroup?: ContactMatchGroupEntity
  ): boolean {
    if (!contactGroup) {
      return false
    }
    return (
      groups.find((group) => group._id === contactGroup.group_id)?.name ===
      "Favourites"
    )
  }

  public serializeToObject(data: ContactInput): ContactObject[] {
    if (
      !data.contacts ||
      !data.contact_name ||
      !data.contact_address ||
      !data.contact_number
    ) {
      return []
    }

    const contacts = this.serializeRecord<ContactEntity>(
      data.contacts.values,
      data.contacts.columns
    )
    const contactNames = this.serializeRecord<ContactNameEntity>(
      data.contact_name.values,
      data.contact_name.columns
    )
    const contactNumbers = this.serializeRecord<ContactNumberEntity>(
      data.contact_number.values,
      data.contact_number.columns
    )
    const contactAddresses = this.serializeRecord<ContactAddressEntity>(
      data.contact_address.values,
      data.contact_address.columns
    )
    const contactGroupsMatch = data.contact_match_groups
      ? this.serializeRecord<ContactMatchGroupEntity>(
          data.contact_match_groups.values,
          data.contact_match_groups.columns
        )
      : []
    const contactGroups = data.contact_groups
      ? this.serializeRecord<ContactGroupEntity>(
          data.contact_groups.values,
          data.contact_groups.columns
        )
      : []

    return contacts
      .map((contact) => {
        if (
          contact.name_id === forbiddenRestrictedPureId ||
          !contact.name_id ||
          contact.numbers_id === forbiddenRestrictedPureId
        ) {
          return
        }

        const contactName = this.findRecords<ContactNameEntity>(
          contactNames,
          contact._id
        )[0]
        const contactNumber = this.findRecords<ContactNumberEntity>(
          contactNumbers,
          contact._id
        )
        const contactAddress = this.findRecords<ContactAddressEntity>(
          contactAddresses,
          contact._id
        )[0]
        const contactGroup = this.findRecords<ContactMatchGroupEntity>(
          contactGroupsMatch,
          contact._id
        )[0]

        if (!contactName) {
          return
        }

        const [primaryPhoneNumber = "", secondaryPhoneNumber = ""] =
          contactNumber.map((number) => number.number_user)
        const address = contactAddress?.address
        const firstAddressLine = address.substr(0, address.indexOf("\n"))
        const secondAddressLine = address.substr(address.indexOf("\n") + 1)

        const contactObject: ContactObject = {
          primaryPhoneNumber,
          secondaryPhoneNumber,
          firstAddressLine,
          secondAddressLine,
          id: contact._id,
          firstName: contactName?.name_primary,
          lastName: contactName?.name_alternative,
          note: contactAddress?.note,
          email: contactAddress?.mail,
          favourite: this.contactFavored(contactGroups, contactGroup),
        }
        return contactObject
      })
      .filter(
        (contact): contact is ContactObject => typeof contact !== "undefined"
      )
  }
}
