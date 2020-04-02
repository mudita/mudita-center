import {
  IdItem,
  NewsEntry,
} from "Renderer/models/mudita-news/mudita-news.interface"

export interface DefaultNewsItems {
  newsItems: Record<string, NewsEntry>
  newsIds: IdItem[]
}

const getDefaultNewsItems = (): DefaultNewsItems => {
  return {
    newsIds: [
      { id: "299", createdAt: "2019-07-11T09:48:32.097Z" },
      { id: "1027", createdAt: "2019-07-11T09:55:32.097Z" },
      { id: "703", createdAt: "2019-07-11T09:56:32.097Z" },
    ],
    newsItems: {
      "299": {
        category: "Takie inne Forum",
        title: "Hot discussion",
        content: "One feature I would love to see added",
        createdAt: "2019-07-11T09:48:32.097Z",
        communityLink:
          "https://forum.mudita.com/t/one-feature-i-would-love-to-see-added/299",
        link:
          "https://forum.mudita.com/t/one-feature-i-would-love-to-see-added/299",
        discussionId: "299",
        imageSource:
          "//images.ctfassets.net/isxmxtc67n72/6j1K3VOLf3aAdijTuObagd/5c406b7a69a6806003aff0a4b8cb5493/MuditaOS.jpg",
      },
      "703": {
        category: "Blog",
        title: "Latest News",
        content:
          "Our campaign on Kickstarter was a success, reaching 262% of the initial goal!",
        createdAt: "2019-07-11T09:56:32.097Z",
        communityLink:
          "https://forum.mudita.com/t/mudita-pure-kickstarter-campaign-is-live/703",
        link:
          "https://mudita.com/community/blog/the-kickstarter-campaign-of-mudita-pure-is-finished/",
        discussionId: "703",
        imageSource:
          "//images.ctfassets.net/isxmxtc67n72/6j1K3VOLf3aAdijTuObagd/5c406b7a69a6806003aff0a4b8cb5493/MuditaOS.jpg",
      },
      "1027": {
        category: "Blog",
        title: "Featured Article",
        content: "Attention: The precious currency we’re giving away for free.",
        createdAt: "2019-07-11T09:55:32.097Z",
        communityLink:
          "https://forum.mudita.com/t/attention-the-precious-currency-we-re-giving-away-for-free/1027",
        link:
          "https://mudita.com/community/blog/attention-the-precious-currency-were-giving-away-for-free/",
        discussionId: "1027",
        imageSource:
          "//images.ctfassets.net/isxmxtc67n72/6j1K3VOLf3aAdijTuObagd/5c406b7a69a6806003aff0a4b8cb5493/MuditaOS.jpg",
      },
    },
  }
}

export default getDefaultNewsItems
