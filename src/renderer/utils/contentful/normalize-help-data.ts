import { Entry } from "contentful"
import { Document } from "@contentful/rich-text-types"

export interface HelpEntry {
  id: string
  question: Record<string, string>
  answer: { [key: string]: Document & { [key: string]: any } }
}

export const normalizeHelpData = (data: any) => {
  const items = data.items.reduce(
    (acc: Record<string, HelpEntry>, currentValue: Entry<HelpEntry>) => {
      return {
        ...acc,
        [currentValue.sys.id]: {
          id: currentValue.sys.id,
          question:
            currentValue.fields.question[
              Object.keys(currentValue.fields.question)[0]
            ],
          answer:
            currentValue.fields.answer[
              Object.keys(currentValue.fields.answer)[0]
            ],
        },
      }
    },
    {}
  )
  const collection = data.items.map(({ sys }: Entry<HelpEntry>) => sys.id)
  return {
    collection,
    items,
    nextSyncToken: data.nextSyncToken,
  }
}
