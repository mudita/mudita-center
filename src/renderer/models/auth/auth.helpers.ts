import { SimpleRecord } from "Renderer/models/phone/phone.typings"

export const authFactory = (
  data: SimpleRecord,
  fallbackHoursValidity = 1
): SimpleRecord => {
  return {
    ...data,
    validUntil:
      data["expires_at"] ||
      data["valid_until"] ||
      data["valid_to"] ||
      new Date().setHours(new Date().getHours() + fallbackHoursValidity),
  }
}
