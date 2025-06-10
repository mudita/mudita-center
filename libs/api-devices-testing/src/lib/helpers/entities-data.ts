/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export interface TestContact {
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
