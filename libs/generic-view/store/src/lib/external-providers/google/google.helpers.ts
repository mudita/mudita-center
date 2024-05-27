/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { RequestWrapperPayload } from "Core/__deprecated__/renderer/models/external-providers/external-providers.interface"
import { GoogleContactResourceItem } from "Core/__deprecated__/renderer/models/external-providers/google/google.interface"
import { ReduxRootState, TmpDispatch } from "Core/__deprecated__/renderer/store"
import { Contact } from "Core/contacts/reducers/contacts.interface"
import axios, { AxiosResponse } from "axios"
import logger from "Core/__deprecated__/main/utils/logger"
import { googleAuthorize } from "./google-authorize.action"
import { setAuthData } from "../actions"

export const mapContact = (contact: GoogleContactResourceItem): Contact => {
  let firstName = ""
  let lastName = ""
  let primaryPhoneNumber = ""
  let secondaryPhoneNumber = ""
  let firstAddressLine = ""
  let secondAddressLine = ""
  let email = ""
  let note = ""

  if (contact.names) {
    ;[lastName, firstName = ""] =
      contact.names[0].displayNameLastFirst.split(",")
  }

  if (contact.phoneNumbers) {
    primaryPhoneNumber =
      contact.phoneNumbers.find(({ metadata }) => metadata.primary)?.value ||
      contact.phoneNumbers[0].value
    secondaryPhoneNumber =
      contact.phoneNumbers.find(({ value }) => value !== primaryPhoneNumber)
        ?.value || ""
  }

  if (contact.addresses) {
    firstAddressLine = contact.addresses[0].streetAddress
    secondAddressLine = `${contact.addresses[0].postalCode} ${contact.addresses[0].city} ${contact.addresses[0].extendedAddress}`
  }

  if (contact.emailAddresses) {
    email = contact.emailAddresses[0].value
  }

  if (contact.biographies) {
    note = contact.biographies[0].value
  }
  return {
    id: contact.resourceName,
    firstName: firstName.trim(),
    lastName,
    primaryPhoneNumber,
    secondaryPhoneNumber,
    firstAddressLine,
    secondAddressLine,
    email,
    ice: false,
    favourite: false,
    note,
  }
}

export const requestWrapper = async <ReturnType>(
  payload: RequestWrapperPayload,
  getState: () => ReduxRootState,
  dispatch: TmpDispatch
): Promise<AxiosResponse<ReturnType>> => {
  const { scope, axiosProps, tries = 0 } = payload
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { url, method = "GET", headers, params = {}, ...rest } = axiosProps

  let currentToken = getState().externalProviders.google[scope].access_token

  if (!currentToken) {
    await dispatch(googleAuthorize(scope))
    currentToken = getState().externalProviders.google[scope].access_token
  }

  const request = (token?: string) => {
    return axios(url as string, {
      ...rest,
      params,
      method,
      headers: {
        ...headers,
        Authorization: `${
          getState().externalProviders.google[scope].token_type
        } ${token || currentToken}`,
      },
    })
  }

  try {
    return await request()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response.status === 401 && tries < 2) {
      const refreshToken =
        getState().externalProviders.google[scope].refresh_token

      const url = `${process.env.MUDITA_CENTER_SERVER_URL}/google-auth-refresh-token`
      const { data } = await axios.post(`${url}?refreshToken=${refreshToken}`)
      await dispatch(setAuthData({ scope, data }))
      return requestWrapper(
        { scope, axiosProps, tries: tries + 1 },
        getState,
        dispatch
      )
    } else {
      logger.error(
        `Google Client: get refresh token fail. Data: ${JSON.stringify(error)}`
      )

      try {
        logger.info("Reauthorizing Google account")
        await dispatch(googleAuthorize(scope))
        return await request()
      } catch (authorizeError) {
        logger.error(
          `Google Client: authorize fail. Data: ${JSON.stringify(
            authorizeError
          )}`
        )
        throw authorizeError
      }
    }
  }
}
