/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { Entry, SyncCollection } from "contentful"
import { Document } from "@contentful/rich-text-types"
import { QuestionAndAnswer } from "Renderer/modules/help/help.component"

export interface HelpEntry {
  id: string
  question: Record<string, string>
  answer: { [key: string]: Document }
}

export interface NormalizedHelpEntry {
  id: string
  question: string
  answer: Document
}

export interface QuestionAndAnswerWithToken extends QuestionAndAnswer {
  nextSyncToken?: string
}

export const normalizeHelpData = (
  data: SyncCollection,
  locale: string
): QuestionAndAnswerWithToken => {
  const { entries, nextSyncToken } = data
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
  const collection = entries.map(({ sys }: Entry<HelpEntry>) => sys.id)
  return {
    collection,
    items,
    nextSyncToken,
  }
}
