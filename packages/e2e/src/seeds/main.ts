/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SeedServiceFactory } from "./factories"
import { SeedDataResult, SeedParams } from "./types"

const seedService = new SeedServiceFactory().create()

let seedResult: SeedDataResult

export const seedData = async (specFileName: string) => {
  const data = getData(specFileName)

  if (data) {
    console.log(`Adding seed data to ${specFileName}`, data)
    const result = await seedService.seed(data)
    seedResult = result
  }
}

// TODO [mw] implement it - scope of the next PR
const getData = (specFileName: string): SeedParams | undefined => {
  return
}

export const afterDataSeed = async () => {
  console.log("Removing seed data result", seedResult)

  if (seedResult) {
    await seedService.removeSeededData(seedResult)
  }

  seedResult = undefined
}
