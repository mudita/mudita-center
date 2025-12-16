/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { mapCsvContacts } from "./map-csv-contacts"
import { mapVcardContacts } from "./map-vcard-contacts"
import { mapGoogleApiContacts } from "./map-google-api-contacts"
import { mapOutlookApiContacts } from "./map-outlook-api-contacts"

export const contactsMapper = {
  fromCsv: mapCsvContacts,
  fromVcard: mapVcardContacts,
  fromGoogleApi: mapGoogleApiContacts,
  fromOutlookApi: mapOutlookApiContacts,
}
