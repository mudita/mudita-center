/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { goToHelpArticleWithTitle } from "../helpers/help-center.helper"
import HelpArticlePage from '../page-objects/help-article.page'

describe('Help Center - Link Navigation Flow', () => {
  before(async () => {
    await goToHelpArticleWithTitle("How to connect Mudita devices to Mudita Center")
  })

  it('should display at least one internal link in the article', async () => {
    const links = await HelpArticlePage.getArticleInternalLinks
    await expect(links).toBeElementsArrayOfSize({ gte: 1 })
    await expect(links[0]).toHaveText('Update Mudita Center')
    await expect(links[0]).toBeClickable()
  })
})
