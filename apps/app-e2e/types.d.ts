import { defineMessages, formatMessage, enUS } from "app-localize/utils"
import { MessageDescriptor } from "@formatjs/intl"
import { FormatXMLElementFn, PrimitiveType } from "intl-messageformat"
import { Options as IntlMessageFormatOptions } from "intl-messageformat/src/core"

declare module "app-localize/utils" {
  type FormatMessage = (
    descriptor: Omit<MessageDescriptor, "id"> & {
      id: keyof typeof enUS
    },
    values?: Record<string, PrimitiveType | FormatXMLElementFn<string, string>>,
    opts?: IntlMessageFormatOptions
  ) => string
  const formatMessage = formatMessage as FormatMessage
  export { formatMessage, defineMessages }
}

declare global {
  function $(
    ...args: Parameters<WebdriverIO.Browser["$"]>
  ): Promise<ReturnType<typeof $>>

  function $$(
    ...args: Parameters<WebdriverIO.Browser["$$"]>
  ): Promise<ReturnType<typeof $$>>

  namespace WebdriverIO {
    interface Element {
      $: typeof $
      $$: typeof $$
    }
  }
}
