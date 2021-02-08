/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import axios from "axios"

export const getCommentsCount = async (discussionId: string) => {
  const {
    data: { posts_count },
  } = await axios.get(
    `${process.env.MUDITA_COMMUNITY_URL}/t/${discussionId}.json`
  )
  return posts_count
}
