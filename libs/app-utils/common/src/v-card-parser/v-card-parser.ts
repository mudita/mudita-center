/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"
import { versionValidator } from "./helpers/common-validators"
import { splitByDelimiter } from "./helpers/split-by-delimiter"
import { validators as validators40 } from "./4-0/properties-validators"
import { validators as validators30 } from "./3-0/properties-validators"
import { validators as validators21 } from "./2-1/properties-validators"
import { VCardVersion } from "./v-card-parser.types"

export { VCardVersion } from "./v-card-parser.types"

const NEW_LINE_CHAR = "\n"

export class VCardParser<V extends VCardVersion = VCardVersion> {
  constructor(public version: V) {}

  private parsers = {
    [VCardVersion.v40]: validators40,
    [VCardVersion.v30]: validators30,
    [VCardVersion.v21]: validators21,
  }

  static determineVersion(data: string): VCardVersion | null {
    const startIndex = data.indexOf("VERSION:")
    if (startIndex === -1) {
      return null
    }
    const versionLine = data.slice(startIndex, startIndex + 11)

    const result = versionValidator.safeParse(versionLine)
    if (!result.success) {
      return null
    }
    return result.data.value
  }

  parse(vcf: string) {
    const cleanedVcf = this.cleanLineEndings(vcf)
    const contactEntries = this.splitContacts(cleanedVcf)

    return contactEntries
      .map((entry) => {
        const lines = this.splitLines(entry)
        return this.parseLines(lines)
      })
      .filter(Boolean)
      .map((lines) => {
        return lines.reduce(
          (acc, entry) => {
            if (!entry) {
              return acc
            }
            const parameters = entry.parameters.reduce(
              (acc, param) => {
                if (!param || !param.value) {
                  return acc
                }
                if (!acc[param.param]) {
                  acc[param.param] = []
                }
                acc[param.param] = acc[param.param].concat(param.value).flat()
                return acc
              },
              {} as Record<string, unknown[]>
            )

            if (!acc[entry.type]) {
              acc[entry.type] = []
            }
            acc[entry.type].push({
              value: entry.value,
              parameters,
            })
            return acc
          },
          {} as Record<
            string,
            {
              value: unknown
              parameters: Record<string, unknown[]>
            }[]
          >
        )
      }) as VCard<V>[]
  }

  private parseLines(lines: string[]) {
    return lines
      .map((line) => {
        const { data, success } =
          this.parsers[this.version as VCardVersion].safeParse(line)
        if (success) {
          return data
        }
        return null
      })
      .filter(Boolean)
  }

  private splitLines(vcf: string) {
    return splitByDelimiter(vcf, NEW_LINE_CHAR)
      .map((line) => line.trim())
      .filter(Boolean)
  }

  private splitContacts(vcf: string) {
    return vcf.split(/END:VCARD\s*/gi).filter(Boolean)
  }

  private cleanLineEndings(vcf: string) {
    return vcf.replace(/\r\n/g, NEW_LINE_CHAR).replace(/\r/g, NEW_LINE_CHAR)
  }
}

type VCard4Property = z.output<typeof validators40>
type VCard4Parameter = NonNullable<VCard4Property["parameters"][number]>

export type VCard40<
  Type extends VCard4Property["type"] = VCard4Property["type"],
> = {
  [T in Type]?: {
    value: Extract<VCard4Property, { type: T }>["value"]
    parameters: {
      [P in VCard4Parameter["param"]]?: NonNullable<
        Extract<VCard4Parameter, { param: P }>
      >["value"] extends Array<unknown>
        ? NonNullable<Extract<VCard4Parameter, { param: P }>>["value"]
        : NonNullable<Extract<VCard4Parameter, { param: P }>>["value"][]
    }
  }[]
}

type VCard3Property = z.output<typeof validators30>
type VCard3Parameter = NonNullable<VCard3Property["parameters"][number]>

export type VCard30<
  Type extends VCard3Property["type"] = VCard3Property["type"],
> = {
  [T in Type]?: {
    value: Extract<VCard3Property, { type: T }>["value"]
    parameters: {
      [P in VCard3Parameter["param"]]?: NonNullable<
        Extract<VCard3Parameter, { param: P }>
      >["value"] extends Array<unknown>
        ? NonNullable<Extract<VCard3Parameter, { param: P }>>["value"]
        : NonNullable<Extract<VCard3Parameter, { param: P }>>["value"][]
    }
  }[]
}

type VCard2Property = z.output<typeof validators21>
type VCard2Parameter = NonNullable<VCard2Property["parameters"][number]>

export type Vcard21<
  Type extends VCard2Property["type"] = VCard2Property["type"],
> = {
  [T in Type]?: {
    value: Extract<VCard2Property, { type: T }>["value"]
    parameters: {
      [P in VCard2Parameter["param"]]?: NonNullable<
        Extract<VCard2Parameter, { param: P }>
      >["value"] extends Array<unknown>
        ? NonNullable<Extract<VCard2Parameter, { param: P }>>["value"]
        : NonNullable<Extract<VCard2Parameter, { param: P }>>["value"][]
    }
  }[]
}

export type VCard<T extends VCardVersion> = T extends VCardVersion.v40
  ? VCard40
  : T extends VCardVersion.v30
    ? VCard30
    : T extends VCardVersion.v21
      ? Vcard21
      : never
