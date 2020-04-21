export const newsResponse = {
  sys: { type: "Array" },
  total: 3,
  skip: 0,
  limit: 100,
  items: [
    {
      sys: {
        space: {
          sys: { type: "Link", linkType: "Space", id: "isxmxtc67n72" },
        },
        id: "23cbaCgEf6PC1llqI5XYBf",
        type: "Entry",
        createdAt: "2019-07-11T08:54:31.710Z",
        updatedAt: "2020-01-22T12:08:23.397Z",
        environment: {
          sys: { id: "master", type: "Link", linkType: "Environment" },
        },
        revision: 13,
        contentType: {
          sys: { type: "Link", linkType: "ContentType", id: "newsItem" },
        },
        locale: "en-US",
      },
      fields: {
        category: "Forum",
        title: "Hot discussion",
        content: "One feature I would love to see added",
        image: {
          sys: {
            type: "Link",
            linkType: "Asset",
            id: "6j1K3VOLf3aAdijTuObagd",
          },
        },
        communityLink:
          "https://forum.mudita.com/t/one-feature-i-would-love-to-see-added/299",
        link:
          "https://forum.mudita.com/t/one-feature-i-would-love-to-see-added/299",
        discussionId: "299",
      },
    },
    {
      sys: {
        space: {
          sys: { type: "Link", linkType: "Space", id: "isxmxtc67n72" },
        },
        id: "3RU0ukJVFGhzT61mXB4xn9",
        type: "Entry",
        createdAt: "2019-07-11T09:48:32.097Z",
        updatedAt: "2020-01-13T16:04:08.966Z",
        environment: {
          sys: { id: "master", type: "Link", linkType: "Environment" },
        },
        revision: 28,
        contentType: {
          sys: { type: "Link", linkType: "ContentType", id: "newsItem" },
        },
        locale: "en-US",
      },
      fields: {
        category: "Blog",
        title: "Featured Article",
        content: "Attention: The precious currency we’re giving away for free.",
        image: {
          sys: {
            type: "Link",
            linkType: "Asset",
            id: "7qdkPb6OhjDR3ZRb90bcck",
          },
        },
        communityLink:
          "https://forum.mudita.com/t/attention-the-precious-currency-we-re-giving-away-for-free/1027",
        link:
          "https://mudita.com/community/blog/attention-the-precious-currency-were-giving-away-for-free/",
        discussionId: "1027",
      },
    },
    {
      sys: {
        space: {
          sys: { type: "Link", linkType: "Space", id: "isxmxtc67n72" },
        },
        id: "9YFH9NLyIvt8Z1dDEc1nf",
        type: "Entry",
        createdAt: "2019-07-11T08:58:38.928Z",
        updatedAt: "2019-10-25T10:40:45.068Z",
        environment: {
          sys: { id: "master", type: "Link", linkType: "Environment" },
        },
        revision: 24,
        contentType: {
          sys: { type: "Link", linkType: "ContentType", id: "newsItem" },
        },
        locale: "en-US",
      },
      fields: {
        category: "Blog",
        title: "Latest News",
        content:
          "Our campaign on Kickstarter was a success, reaching 262% of the initial goal!",
        image: {
          sys: {
            type: "Link",
            linkType: "Asset",
            id: "6mdeQ9Pm5Kgsek3x8Pt7Yh",
          },
        },
        communityLink:
          "https://forum.mudita.com/t/mudita-pure-kickstarter-campaign-is-live/703",
        link:
          "https://mudita.com/community/blog/the-kickstarter-campaign-of-mudita-pure-is-finished/",
        discussionId: "703",
      },
    },
  ],
  includes: {
    Asset: [
      {
        sys: {
          space: {
            sys: { type: "Link", linkType: "Space", id: "isxmxtc67n72" },
          },
          id: "6j1K3VOLf3aAdijTuObagd",
          type: "Asset",
          createdAt: "2019-09-24T14:33:22.922Z",
          updatedAt: "2019-09-24T14:33:22.922Z",
          environment: {
            sys: { id: "master", type: "Link", linkType: "Environment" },
          },
          revision: 1,
          locale: "en-US",
        },
        fields: {
          title: "MuditaOS",
          file: {
            url:
              "//images.ctfassets.net/isxmxtc67n72/6j1K3VOLf3aAdijTuObagd/5c406b7a69a6806003aff0a4b8cb5493/MuditaOS.jpg",
            details: { size: 77166, image: { width: 1352, height: 1079 } },
            fileName: "MuditaOS.jpg",
            contentType: "image/jpeg",
          },
        },
      },
      {
        sys: {
          space: {
            sys: { type: "Link", linkType: "Space", id: "isxmxtc67n72" },
          },
          id: "6mdeQ9Pm5Kgsek3x8Pt7Yh",
          type: "Asset",
          createdAt: "2019-10-24T15:22:08.851Z",
          updatedAt: "2019-10-24T15:23:03.740Z",
          environment: {
            sys: { id: "master", type: "Link", linkType: "Environment" },
          },
          revision: 2,
          locale: "en-US",
        },
        fields: {
          title: "The Kickstarter campaign of Mudita Pure was a success",
          description: "The Kickstarter campaign of Mudita Pure was a success",
          file: {
            url:
              "//images.ctfassets.net/isxmxtc67n72/6mdeQ9Pm5Kgsek3x8Pt7Yh/2a946227e8a874a8dd047b0497309d4c/final.jpg",
            details: { size: 286220, image: { width: 1440, height: 1080 } },
            fileName: "final.jpg",
            contentType: "image/jpeg",
          },
        },
      },
      {
        sys: {
          space: {
            sys: { type: "Link", linkType: "Space", id: "isxmxtc67n72" },
          },
          id: "7qdkPb6OhjDR3ZRb90bcck",
          type: "Asset",
          createdAt: "2020-01-13T15:23:22.497Z",
          updatedAt: "2020-01-13T15:23:22.497Z",
          environment: {
            sys: { id: "master", type: "Link", linkType: "Environment" },
          },
          revision: 1,
          locale: "en-US",
        },
        fields: {
          title: "Attention",
          file: {
            url:
              "//images.ctfassets.net/isxmxtc67n72/7qdkPb6OhjDR3ZRb90bcck/67c404e8e737a86ed743569ebb39f761/attention.jpg",
            details: { size: 1493422, image: { width: 1640, height: 1324 } },
            fileName: "attention.jpg",
            contentType: "image/jpeg",
          },
        },
      },
    ],
  },
}
