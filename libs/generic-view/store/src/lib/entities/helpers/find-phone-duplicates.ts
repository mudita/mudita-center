/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { EntityData } from "device/models"

export function findPhoneDuplicates(
  contacts: EntityData[]
): Record<string, string[]> {
  const phoneToContactIds = new Map<string, Set<string>>()
  contacts.forEach((contact) => {
    const contactId = String(contact.contactId)
    const phoneNumbers: { unifiedPhoneNumber?: string }[] = Array.isArray(
      contact.phoneNumbers
    )
      ? contact.phoneNumbers
      : []
    phoneNumbers.slice(0, 2).forEach((pn) => {
      if (!pn?.unifiedPhoneNumber) return
      if (!phoneToContactIds.has(pn.unifiedPhoneNumber)) {
        phoneToContactIds.set(pn.unifiedPhoneNumber, new Set())
      }
      phoneToContactIds.get(pn.unifiedPhoneNumber)!.add(contactId)
    })
  })

  const contactIdToGroup = new Map<string, Set<string>>()

  contacts.forEach((contact) => {
    const contactId = String(
      (contact as { contactId?: string; id?: string }).contactId ??
        (contact as { id?: string }).id
    )
    const phoneNumbers: { unifiedPhoneNumber?: string }[] = Array.isArray(
      contact.phoneNumbers
    )
      ? contact.phoneNumbers
      : []
    const group = new Set<string>()
    phoneNumbers.slice(0, 2).forEach((pn) => {
      if (!pn?.unifiedPhoneNumber) return
      const ids = phoneToContactIds.get(pn.unifiedPhoneNumber)
      if (ids) {
        ids.forEach((id) => {
          if (id !== contactId) group.add(id)
        })
      }
    })
    contactIdToGroup.set(contactId, group)
  })

  const visited = new Set<string>()
  const result: Record<string, string[]> = {}

  contacts.forEach((contact) => {
    const contactId = String(contact.contactId)
    if (visited.has(contactId)) return
    const stack = [contactId]
    const group = new Set<string>()
    while (stack.length) {
      const id = stack.pop()!
      if (group.has(id)) continue
      group.add(id)
      ;(contactIdToGroup.get(id) || []).forEach((otherId) => {
        if (!group.has(otherId)) stack.push(otherId)
      })
    }
    group.forEach((id) => visited.add(id))
    const sorted = Array.from(group).sort((a, b) => Number(b) - Number(a))
    const maxId = sorted[0]
    const duplicates = sorted.slice(1)
    if (duplicates.length > 0) {
      result[maxId] = duplicates
    }
  })
  return result
}
