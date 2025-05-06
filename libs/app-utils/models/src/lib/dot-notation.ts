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
