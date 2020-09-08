import { Auth, AuthProviders } from "Renderer/models/auth/auth.typings"
import { SimpleRecord } from "Common/typings"

export enum AuthKeys {
  Valid = "validUntil",
  Token = "token",
  TokenType = "tokenType",
}

export const authFactory = (
  data: SimpleRecord,
  fallbackValidity = 3600000 // one hour in ms
): Record<AuthKeys, number | string> => {
  // add token and type to model
  const token = data["access_token"] || data["token"] || data["bearer_token"]
  const tokenType = data["token_type"] || "Bearer"
  const validityPeriod =
    (data["expires_in"] && Number(data["expires_in"])) || fallbackValidity

  if (token && typeof token === "string" && typeof tokenType === "string") {
    return {
      ...data,
      [AuthKeys.Token]: token,
      [AuthKeys.TokenType]: tokenType,
      [AuthKeys.Valid]: Date.now() + validityPeriod,
    }
  }

  throw new Error("No token present in the payload!")
}

export const tokenIsValid = (data: Auth, provider: AuthProviders): boolean => {
  if (provider in data) {
    const validityValue = data[provider][AuthKeys.Valid] || 0
    return validityValue > Date.now()
  }

  return false
}
