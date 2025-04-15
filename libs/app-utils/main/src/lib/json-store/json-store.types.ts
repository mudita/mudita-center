/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

type BuildRange<
  N extends number,
  R extends number[] = [],
> = R["length"] extends N ? R[number] : BuildRange<N, [...R, R["length"]]>

type Indexes = BuildRange<20>

export type DotNotation<T> = {
  [K in keyof T]: T[K] extends (infer U)[]
    ?
        | `${K & string}`
        | `${K & string}[${Indexes}]`
        | `${K & string}[${Indexes}].${DotNotation<U>}`
    : T[K] extends object
      ? `${K & string}` | `${K & string}.${DotNotation<T[K]>}`
      : `${K & string}`
}[keyof T]

export type DotValue<
  T,
  P extends string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
> = P extends `${infer Key}[${infer _Index}].${infer Rest}`
  ? Key extends keyof T
    ? T[Key] extends Array<infer U>
      ? DotValue<U, Rest>
      : never
    : never
  : // eslint-disable-next-line @typescript-eslint/no-unused-vars
    P extends `${infer Key}[${infer _Index}]`
    ? Key extends keyof T
      ? T[Key] extends Array<infer U>
        ? U
        : never
      : never
    : P extends `${infer Key}.${infer Rest}`
      ? Key extends keyof T
        ? DotValue<T[Key], Rest>
        : never
      : P extends keyof T
        ? T[P]
        : never

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
