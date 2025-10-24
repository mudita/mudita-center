/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import z from "zod"

const headerBaseSchema = z.object({
  vendorId: z.string().min(1),
  productId: z.string().min(1),
  serialNumber: z.string().optional(),
})

const headerPasswordSchema = headerBaseSchema.extend({
  password: z.string().min(1),
  crypto: z.string().min(1),
})

export const BackupFileValidator = z.object({
  header: z.union([headerPasswordSchema, headerBaseSchema]),
  data: z.record(z.string().min(1), z.string().min(1)),
})
export type BackupFile = z.infer<typeof BackupFileValidator>

export const BackupFileDecryptedValidator = BackupFileValidator.extend({
  data: z.record(
    z.string().min(1),
    z.looseObject({
      data: z.array(z.any()),
    })
  ),
})

export type BackupFileDecrypted = z.infer<typeof BackupFileDecryptedValidator>
