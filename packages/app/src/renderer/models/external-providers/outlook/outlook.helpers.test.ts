/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import {
  getOutlookEndpoint,
  mapCalendars,
} from "Renderer/models/external-providers/outlook/outlook.helpers"
import { OutLookScope } from "Renderer/models/external-providers/outlook/outlook.interface"

const scope = "offline_access, https://graph.microsoft.com/contacts.read"

test("getOutlookEndpoint returns proper value", () => {
  expect(getOutlookEndpoint(OutLookScope.Contacts)).toBe(scope)
})

test("mapCalendars returns proper values", () => {
  const calendar = [
    {
      id:
        "AQMkADAwATMwMAItMzk0MS0yZGY0LTAwAi0wMAoARgAAAw8iE_MkrdNBkDkmTx5SnwkHAKDVfFOEmcdKhNFYkpYqCvYAAAIBBgAAAKDVfFOEmcdKhNFYkpYqCvYAAAAEnFEKAAAA",
      name: "Calendar",
      color: "lightPink",
      hexColor: "#e3008c",
      isDefaultCalendar: false,
      changeKey: "oNV8U4SZx0qE0ViSlioK9gAABJtBBg==",
      canShare: true,
      canViewPrivateItems: true,
      canEdit: true,
      allowedOnlineMeetingProviders: ["skypeForConsumer"],
      defaultOnlineMeetingProvider: "skypeForConsumer",
      isTallyingResponses: false,
      isRemovable: true,
      owner: { name: "Jon Doe", address: "example@mudita.com" },
    },
  ]
  expect(mapCalendars(calendar)).toMatchInlineSnapshot(`
    Array [
      Object {
        "id": "AQMkADAwATMwMAItMzk0MS0yZGY0LTAwAi0wMAoARgAAAw8iE_MkrdNBkDkmTx5SnwkHAKDVfFOEmcdKhNFYkpYqCvYAAAIBBgAAAKDVfFOEmcdKhNFYkpYqCvYAAAAEnFEKAAAA",
        "name": "Calendar",
        "primary": false,
        "provider": "outlook",
      },
    ]
  `)
})
