import { Entry } from "contentful"
import { Document } from "@contentful/rich-text-types"

export interface HelpEntry {
  question: string
  answer: Document
  slug: string
}

export const normalizeHelpData = (data: any) => {
  const items = data.items.reduce(
    (
      acc: Record<string, Partial<HelpEntry>>,
      currentValue: Entry<HelpEntry>
    ) => {
      return {
        ...acc,
        [currentValue.sys.id]: {
          question: currentValue.fields.question,
          answer: currentValue.fields.answer,
        },
      }
    },
    {}
  )
  const collection = data.items.map(({ sys }: any) => sys.id)
  return {
    collection,
    items,
  }
}
