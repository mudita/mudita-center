/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Asset, Entry, EntryCollection } from "contentful"
import { NewsEntry } from "Renderer/models/mudita-news/mudita-news.interface"
import { getBase64 } from "Renderer/models/mudita-news/get-base-64"
import { getCommentsCount } from "Renderer/models/mudita-news/get-comments-count"
import { registerBlogpostListener } from "App/main/functions/register-blogpost-listener"

export const normalizeContentfulData = async (data: any) => {
  // const news = items.map(({ fields, sys }: Entry<NewsEntry>) => {
  //   return {
  //     ...fields,
  //     newsId: sys.id,
  //     updatedAt: sys.updatedAt,
  //     createdAt: sys.createdAt,
  //     imageId: fields?.image?.sys?.id,
  //   }
  // })
  // for (const item of data) {
  //   const {
  //     fields: {
  //       title,
  //       file: { url },
  //     },
  //   } = includes.Asset.find((asset: Asset) => {
  //     return item?.image?.sys?.id === asset.sys.id
  //   })
  // const urlSplit = item.communityLink.split("/")
  // const postId = urlSplit[urlSplit.length - 1]
  // console.log('postId', postId);
  // item.commentsCount = await (await getCommentsCount(postId)).posts_count
  // item.date = await item.link.includes("mudita.com/community/blog")  ? registerBlogpostListener() : (await getCommentsCount(postId)).created_at
  // item.imageSource = await getBase64(url)
  // item.imageAlt = title
  // }
  return {
    newsItems: data,
    lastUpdate: new Date().toISOString(),
  }
}
