/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { v4 as uuid } from "uuid"
import { E2EMockClient } from "../../../../libs/e2e-mock/client/src/lib/e2e-mock-client"

interface mockEntityDeleteProcessOptions {
  totalEntities: number
  entityType: string
}

export const mockEntityDeleteProcess = ({
  totalEntities,
  entityType,
}: mockEntityDeleteProcessOptions) => {
  E2EMockClient.mockResponsesOnce([
    {
      path: "path-1",
      body: { totalEntities, uniqueKey: `${uuid()}` },
      match: {
        expected: {
          entityType: entityType,
        },
      },
      endpoint: "ENTITIES_METADATA",
      method: "GET",
      status: 200,
    },
    {
      path: "path-1",
      endpoint: "ENTITIES_DATA",
      method: "DELETE",
      status: 200,
      body: {},
    },
  ])
}
