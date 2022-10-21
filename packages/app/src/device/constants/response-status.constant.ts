/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum ResponseStatus {
  Ok = 200,
  Accepted = 202,
  Redirect = 303,
  NoContent = 204,
  BadRequest = 400,
  NotFound = 404,
  PhoneLocked = 403,
  NotAcceptable = 406,
  Conflict = 409,
  InternalServerError = 500,
  UnprocessableEntity = 422,
  NotAccepted = 423,
  InsufficientStorage = 507,

  // lib status
  ConnectionError = 503,
  ParserError = 504,
  Timeout = 505,
}
