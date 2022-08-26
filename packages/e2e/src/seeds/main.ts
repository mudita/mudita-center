/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SeedServiceFactory } from "./factories"
import { resolveSeedData } from "./resolve-seed-data"
import { SeedDataResult } from "./types"

const seedService = new SeedServiceFactory().create()

let seedResult: SeedDataResult

export const seedData = async (specFileName: string) => {
  const data = resolveSeedData(specFileName)

  if (data) {
    console.log(`Adding seed data to ${specFileName}`, data)
    const result = await seedService.seed(data)
    seedResult = result
  }
}

export const afterDataSeed = async () => {
  if (seedResult) {
    console.log("Removing seed data result", seedResult)
    await seedService.removeSeededData(seedResult)
  }

  seedResult = undefined
}
