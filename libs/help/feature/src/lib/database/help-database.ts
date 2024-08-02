/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer"
import {
  create,
  Orama,
  search as oramaSearch,
  updateMultiple,
} from "@orama/orama"
import { HelpData } from "help/models"
import { articlesSchema } from "./help-database.schema"
import stopWords from "./stopwords.json"

class HelpDatabase {
  private articlesDb?: Orama<typeof articlesSchema>
  private articlesIds: string[] = []

  public constructor() {}

  async initialize(): Promise<Omit<HelpDatabase, "initialize">> {
    if (!this.articlesDb) {
      await this.createDatabase()
    }
    return this
  }

  private async createDatabase() {
    this.articlesDb = await create({
      schema: articlesSchema,
      components: {
        tokenizer: {
          stemming: false,
          stopWords,
        },
      },
    })
  }

  public async updateData(articles: HelpData["articles"]) {
    if (!this.articlesDb) {
      throw new Error("Database is not initialized")
    }
    this.articlesIds = await updateMultiple(
      this.articlesDb,
      this.articlesIds,
      Object.values(articles).map((article) => ({
        id: article.id,
        title: article.title,
        categoryId: article.categoryId,
        textContent: documentToPlainTextString(article.content),
      }))
    )
  }

  public async search(term: string) {
    if (!this.articlesDb) {
      throw new Error("Database is not initialized")
    }
    return oramaSearch(this.articlesDb, {
      term,
      properties: ["title", "textContent"],
      tolerance: 1,
      boost: { title: 2 },
    })
  }
}

export const helpDatabase = new HelpDatabase().initialize()
