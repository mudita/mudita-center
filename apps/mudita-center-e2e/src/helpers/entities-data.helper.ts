import { ResponseStatus } from "Core/device"
import { E2EMockClient } from "Libs/e2e-mock/client/src"

type Data = {
  path: string
  body: {}
  status: ResponseStatus
  expected: {
    entityType: string
    responseType: "file"
  }
}

export const EntitiesDataResponse = ({ path, body, status }: Data) => {
  E2EMockClient.mockResponse({
    endpoint: "ENTITIES_DATA",
    method: "GET",
    path,
    status,
    body,
    match: {
      expected: {
        entityType: "contacts",
        responseType: "file",
      },
    },
  })
}
