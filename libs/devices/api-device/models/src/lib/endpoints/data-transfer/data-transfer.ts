/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"
import { response200Schema, response202Schema } from "../common"

const transferIdScheme = z.int().positive()

// POST PRE_DATA_TRANSFER
export const PreDataTransferPostRequestValidator = z.object({
  dataTransferId: transferIdScheme,
  domains: z.array(z.string().min(1)).min(1),
})

export type PreDataTransferPostRequest = z.infer<
  typeof PreDataTransferPostRequestValidator
>

export const PreDataTransferPostResponseValidator = z.object({
  dataTransferId: transferIdScheme,
  domains: z.record(z.string().min(1), z.string().min(1)),
})

export type PreDataTransferPostResponse = z.infer<
  typeof PreDataTransferPostResponseValidator
>

// POST DATA_TRANSFER
export const DataTransferPostRequestValidator = z.object({
  dataTransferId: transferIdScheme,
})

export type DataTransferPostRequest = z.infer<
  typeof DataTransferPostRequestValidator
>

export const DataTransferPostResponseValidator200 = response200Schema.extend({
  progress: z.number().min(0).max(100).optional(),
  rebootRequired: z.boolean().optional(),
  message: z.string().optional(),
})

export const DataTransferPostResponseValidator202 = response202Schema.extend({
  progress: z.number().min(0).max(100).optional(),
  message: z.string().optional(),
})

// GET DATA_TRANSFER (STATUS)
export const DataTransferGetRequestValidator = z.object({
  dataTransferId: transferIdScheme,
})

export type DataTransferGetRequest = z.infer<
  typeof DataTransferGetRequestValidator
>

export const DataTransferGetResponseValidator200 =
  DataTransferPostResponseValidator200

export const DataTransferGetResponseValidator202 =
  DataTransferPostResponseValidator202

// DELETE DATA_TRANSFER
export const DataTransferDeleteRequestValidator =
  DataTransferPostRequestValidator

export type DataTransferDeleteRequest = z.infer<
  typeof DataTransferDeleteRequestValidator
>

export const DataTransferDeleteResponseValidator200 = response200Schema

export const DataTransferDeleteResponseValidator202 = response202Schema

export const buildPreDataTransferPostRequest = (
  req: PreDataTransferPostRequest
) => {
  return {
    endpoint: "PRE_DATA_TRANSFER",
    method: "POST",
    body: req,
  } as const
}

export const buildDataTransferPostRequest = (req: DataTransferPostRequest) => {
  return {
    endpoint: "DATA_TRANSFER",
    method: "POST",
    body: req,
  } as const
}

export const buildDataTransferGetRequest = (req: DataTransferGetRequest) => {
  return {
    endpoint: "DATA_TRANSFER",
    method: "GET",
    body: req,
  } as const
}
