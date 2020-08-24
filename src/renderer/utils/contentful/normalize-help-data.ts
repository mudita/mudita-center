import { Entry } from "contentful"
import { Document } from "@contentful/rich-text-types"

export interface HelpEntry {
  id: string
  question: Record<string, string>
  answer: { [key: string]: Document & { [key: string]: any } }
}

interface ContentfulInput {
  items: Array<Entry<HelpEntry>>
  nextSyncToken: string
  locale: string
}

export const normalizeHelpData = (data: ContentfulInput, locale: string) => {
  const { items: entries, nextSyncToken } = data
  const items = entries.reduce((acc, currentValue) => {
    return {
      ...acc,
      [currentValue.sys.id]: {
        id: currentValue.sys.id,
        question: currentValue.fields.question[locale],
        answer: currentValue.fields.answer[locale],
      },
    }
  }, {})
  const collection = data.items.map(({ sys }: Entry<HelpEntry>) => sys.id)
  return {
    collection,
    items,
    nextSyncToken,
  }
}
