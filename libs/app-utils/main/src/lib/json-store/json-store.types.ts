/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DotValue } from "app-utils/models"

type Split<S extends string> = S extends `${infer Head}.${infer Rest}`
  ? [Head, ...Split<Rest>]
  : [S]

type PathToValue<Path extends string[], Value> = Path extends [
  infer Head extends string,
  ...infer Rest extends string[],
]
  ? { [K in Head]: PathToValue<Rest, Value> }
  : Value

type Merge<A, B> = {
  [K in keyof A | keyof B]: K extends keyof A
    ? K extends keyof B
      ? A[K] extends object
        ? B[K] extends object
          ? Merge<A[K], B[K]> // głębokie scalanie
          : A[K]
        : B[K]
      : A[K]
    : K extends keyof B
      ? B[K]
      : never
}

export type ExpandPaths<
  T extends readonly string[],
  Data extends Record<string, unknown>,
> = T extends readonly [
  infer Head extends string,
  ...infer Tail extends string[],
]
  ? Merge<
      PathToValue<Split<Head>, DotValue<Data, Head>>,
      ExpandPaths<Tail, Data>
    >
  : object
