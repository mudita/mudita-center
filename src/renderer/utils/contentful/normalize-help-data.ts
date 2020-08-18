import { Entry, EntryCollection } from "contentful"
import { Document } from "@contentful/rich-text-types"

export interface HelpEntry {
  id: string
  question: string
  answer: Document
}

export const normalizeHelpData = (data: EntryCollection<HelpEntry>) => {
  const items = data.items.reduce(
    (acc: Record<string, HelpEntry>, currentValue: Entry<HelpEntry>) => {
      return {
        ...acc,
        [currentValue.sys.id]: {
          id: currentValue.sys.id,
          question: currentValue.fields.question,
          answer: currentValue.fields.answer,
        },
      }
    },
    {}
  )
  const collection = data.items.map(({ sys }: Entry<HelpEntry>) => sys.id)
  return {
    collection,
    items,
  }
}
