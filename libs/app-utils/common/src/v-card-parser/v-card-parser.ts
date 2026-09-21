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

const cleanLineEndings = (vcf: string) =>
  vcf.replace(/\r\n/g, NEW_LINE_CHAR).replace(/\r/g, NEW_LINE_CHAR)

/**
 * The part of a content line ahead of its value, holding the property name and
 * the parameters. The value starts at the first colon that is not inside a
 * quoted parameter value (RFC 6350 sec. 3.3), and the scan stops there, so a
 * long value such as an embedded photo is never walked.
 */
const getParameterSection = (line: string) => {
  let quoted = false

  for (let index = 0; index < line.length; index++) {
    const char = line[index]
    if (char === `"`) {
      quoted = !quoted
    } else if (char === ":" && !quoted) {
      return line.slice(0, index)
    }
  }

  return line
}

/**
 * Whether the line declares the quoted-printable encoding. Only the parameters
 * count: a value that merely contains the words - a note quoting them, say -
 * must not make the line that follows look like a continuation of it.
 */
const declaresQuotedPrintable = (line: string) =>
  splitByDelimiter(getParameterSection(line), ";").some((parameter) =>
    /^ENCODING\s*=\s*QUOTED-PRINTABLE$/i.test(parameter.trim())
  )

/**
 * A quoted-printable value is broken up with a soft line break - an "=" at the
 * end of a line - which stands for neither the "=" nor the line break, while
 * everything that follows, leading white space included, is part of the value
 * (vCard 2.1 sec. 2.1.5, RFC 2045 sec. 6.7).
 *
 * This has to be resolved before unfolding. vCard 2.1 indents such a
 * continuation - its own NOTE example does - and unfolding would take that
 * indent for a line fold, leaving the "=" glued to the value where the decoder
 * reads it as the start of a hex escape.
 */
const joinQuotedPrintableLines = (lines: string[]) =>
  lines.reduce<string[]>((acc, line) => {
    const previous = acc[acc.length - 1]
    const continues =
      previous?.endsWith("=") &&
      declaresQuotedPrintable(previous) &&
      !/^(BEGIN|END|VERSION):/i.test(line.trim())

    if (continues) {
      acc[acc.length - 1] = previous.slice(0, -1) + line
      return acc
    }

    acc.push(line)
    return acc
  }, [])

/**
 * A line break followed by a single white space character is a line fold and
 * stands for no characters at all (RFC 6350 sec. 3.2, RFC 2425 sec. 5.8.1).
 * Without unfolding, every continuation line is dropped as an unknown
 * property, which silently truncates long values.
 *
 * vCard 2.1 defines no folding of its own, but producers emit it, and a line
 * opening with white space is not a content line in that version either, so
 * unfolding is applied there as well.
 */
const unfoldLines = (lines: string[]) =>
  lines.reduce<string[]>((acc, line) => {
    if (acc.length > 0 && /^[ \t]/.test(line)) {
      acc[acc.length - 1] += line.slice(1)
      return acc
    }

    acc.push(line)
    return acc
  }, [])

// Anchored to a whole content line, so that the words "END:VCARD" inside a
// value do not cut the card in half.
const CARD_END = /^END:VCARD[ \t]*\n?/im

export class VCardParser<V extends VCardVersion = VCardVersion> {
  constructor(public version: V) {}

  private parsers = {
    [VCardVersion.v40]: validators40,
    [VCardVersion.v30]: validators30,
    [VCardVersion.v21]: validators21,
  }

  static determineVersion(data: string): VCardVersion | null {
    // Unfolded first, so that an indented line is read as the continuation it
    // is rather than as a property of its own (RFC 6350 sec. 3.2). Property
    // names are case-insensitive (RFC 6350 sec. 3.3).
    const versionLine = unfoldLines(
      cleanLineEndings(data).split(NEW_LINE_CHAR)
    ).find((line) => /^VERSION:/i.test(line))

    if (!versionLine) {
      return null
    }

    const result = versionValidator.safeParse(versionLine.trim())
    if (!result.success) {
      return null
    }
    return result.data.value
  }

  /**
   * Tells whether the data declares a VERSION property at all, which is not
   * the same as declaring one this parser supports.
   */
  static declaresVersion(data: string): boolean {
    return unfoldLines(cleanLineEndings(data).split(NEW_LINE_CHAR)).some(
      (line) => /^VERSION:/i.test(line)
    )
  }

  /**
   * Splits a file into single vCard entries, so that each one can be parsed
   * with the version it declares itself instead of the one the file opens
   * with. Every vCard has to carry its own VERSION (RFC 6350 sec. 6.7.9).
   */
  static splitCards(vcf: string): string[] {
    return cleanLineEndings(vcf)
      .split(CARD_END)
      .filter((entry) => entry.trim())
  }

  parse(vcf: string) {
    const contactEntries = this.splitContacts(cleanLineEndings(vcf))

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
        try {
          const { data, success } =
            this.parsers[this.version as VCardVersion].safeParse(line)
          return success ? data : null
        } catch {
          // A single malformed line must never take down the whole file.
          return null
        }
      })
      .filter(Boolean)
  }

  private splitLines(vcf: string) {
    // A line break always ends a content line, so it is split on plainly - a
    // stray quotation mark inside a value must not glue the rest of the card
    // into a single line.
    const rawLines = vcf.split(NEW_LINE_CHAR)

    return unfoldLines(joinQuotedPrintableLines(rawLines))
      .map((line) => line.trim())
      .filter(Boolean)
  }

  private splitContacts(vcf: string) {
    return vcf.split(CARD_END).filter(Boolean)
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
