import { E2EMockClient } from "../../../../libs/e2e-mock/client/src"
import { overviewDataWithOneSimCard } from "../../../../libs/e2e-mock/responses/src"

export const addDeviceWithGivenSerialNumber = (serialNumber: string) => {
  const overviewBody = { ...overviewDataWithOneSimCard }
  overviewBody.summary.about.serialNumber.text = serialNumber
  E2EMockClient.mockResponse({
    path: serialNumber,
    body: overviewBody,
    endpoint: "FEATURE_DATA",
    method: "GET",
    status: 200,
  })
  E2EMockClient.addDevice({
    path: serialNumber,
    serialNumber: serialNumber,
  })
}
