/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export const generateMockedNewsResponse = (upsertDate: string) => {
  return {
    sys: {
      type: "Array",
    },
    total: 11,
    skip: 0,
    limit: 6,
    items: [
      {
        metadata: {
          tags: [],
        },
        sys: {
          space: {
            sys: {
              type: "Link",
              linkType: "Space",
              id: "isxmxtc67n72",
            },
          },
          id: "3IVgLGkVDPZl1g7qFg1vHu",
          type: "Entry",
          createdAt: upsertDate,
          updatedAt: upsertDate,
          environment: {
            sys: {
              id: "master",
              type: "Link",
              linkType: "Environment",
            },
          },
          revision: 1,
          contentType: {
            sys: {
              type: "Link",
              linkType: "ContentType",
              id: "newsItem",
            },
          },
          locale: "en-US",
        },
        fields: {
          category: "Blog",
          title: "Mudita Zaprasza na Festiwal Wibracje! ",
          content:
            "Jesteśmy bardzo szczęśliwi mogąc ogłosić, że Mudita weźmie udział w tegorocznym Festiwalu Wibracje! ",
          image: {
            metadata: {
              tags: [],
            },
            sys: {
              space: {
                sys: {
                  type: "Link",
                  linkType: "Space",
                  id: "isxmxtc67n72",
                },
              },
              id: "4V0n9I2pR0jRhTnbuaZiHr",
              type: "Asset",
              createdAt: upsertDate,
              updatedAt: upsertDate,
              environment: {
                sys: {
                  id: "master",
                  type: "Link",
                  linkType: "Environment",
                },
              },
              revision: 3,
              locale: "en-US",
            },
            fields: {
              title: "Festiwal Wibracje 2022 ",
              description: "",
              file: {
                url: "//images.ctfassets.net/isxmxtc67n72/4V0n9I2pR0jRhTnbuaZiHr/c0e428afa273e4e79abd40e0390ebd86/festiwal_wibracje_blog__2_.png",
                details: {
                  size: 1057531,
                  image: {
                    width: 1158,
                    height: 1158,
                  },
                },
                fileName: "festiwal_wibracje_blog (2).png",
                contentType: "image/png",
              },
            },
          },
          communityLink:
            "https://forum.mudita.com/t/win-free-tickets-to-the-vibes-festival-in-poland-and-a-mudita-bell/4549",
          link: "https://mudita.com/community/blog/mudita-zaprasza-na-festiwal-wibracje/",
          commentsCount: 2,
          date: "2022-03-10T16:55:20.273Z",
        },
      },
      {
        metadata: {
          tags: [],
        },
        sys: {
          space: {
            sys: {
              type: "Link",
              linkType: "Space",
              id: "isxmxtc67n72",
            },
          },
          id: "2qiCpsDXEZnFclvttImF57",
          type: "Entry",
          createdAt: "2022-03-24T13:43:40.033Z",
          updatedAt: "2022-03-24T13:43:44.315Z",
          environment: {
            sys: {
              id: "master",
              type: "Link",
              linkType: "Environment",
            },
          },
          revision: 2,
          contentType: {
            sys: {
              type: "Link",
              linkType: "ContentType",
              id: "newsItem",
            },
          },
          locale: "en-US",
        },
        fields: {
          category: "Blog",
          title: "Digital Technology Changed How We Consume & Process News",
          content:
            "Technology has transformed the way news is produced, delivered and consumed around the world.",
          image: {
            metadata: {
              tags: [],
            },
            sys: {
              space: {
                sys: {
                  type: "Link",
                  linkType: "Space",
                  id: "isxmxtc67n72",
                },
              },
              id: "36Pl8iklxvI82Vim8JfX4L",
              type: "Asset",
              createdAt: "2022-03-14T14:20:15.335Z",
              updatedAt: "2022-03-14T14:20:15.335Z",
              environment: {
                sys: {
                  id: "master",
                  type: "Link",
                  linkType: "Environment",
                },
              },
              revision: 1,
              locale: "en-US",
            },
            fields: {
              title: "Mudita Pure Newspaper",
              description: "",
              file: {
                url: "//images.ctfassets.net/isxmxtc67n72/36Pl8iklxvI82Vim8JfX4L/f5eb3f029f440b8a63ffb993cdf727d0/Mudita_Pure_Newspaper.jpg",
                details: {
                  size: 126155,
                  image: {
                    width: 960,
                    height: 640,
                  },
                },
                fileName: "Mudita Pure Newspaper.jpg",
                contentType: "image/jpeg",
              },
            },
          },
          communityLink:
            "https://forum.mudita.com/t/are-we-consuming-too-much-information/3880",
          link: "https://mudita.com/community/blog/digital-technology-changed-how-we-consume-and-process-news/",
          discussionId: "3880",
          commentsCount: 20,
          date: "2022-03-01T14:19+00:00",
        },
      },
    ],
    includes: {
      Asset: [
        {
          metadata: {
            tags: [],
          },
          sys: {
            space: {
              sys: {
                type: "Link",
                linkType: "Space",
                id: "isxmxtc67n72",
              },
            },
            id: "1Gv58PzOQ9B1MgzKMG824R",
            type: "Asset",
            createdAt: "2021-02-08T19:22:56.305Z",
            updatedAt: "2022-04-01T10:27:59.978Z",
            environment: {
              sys: {
                id: "master",
                type: "Link",
                linkType: "Environment",
              },
            },
            revision: 3,
            locale: "en-US",
          },
          fields: {
            title: "Selfless love - Human hands showing the inscription love",
            description:
              "Human hands joining in love, which is a manifestation of selfless love",
            file: {
              url: "//images.ctfassets.net/isxmxtc67n72/1Gv58PzOQ9B1MgzKMG824R/364676639e12aa4b17e281936c81edeb/people-2608145_1920.jpg",
              details: {
                size: 305397,
                image: {
                  width: 1920,
                  height: 1211,
                },
              },
              fileName: "people-2608145_1920.jpg",
              contentType: "image/jpeg",
            },
          },
        },
        {
          metadata: {
            tags: [],
          },
          sys: {
            space: {
              sys: {
                type: "Link",
                linkType: "Space",
                id: "isxmxtc67n72",
              },
            },
            id: "1Ut8qkTPAH14nmsUhYQavD",
            type: "Asset",
            createdAt: "2022-01-26T09:41:45.292Z",
            updatedAt: "2022-04-01T09:51:06.126Z",
            environment: {
              sys: {
                id: "master",
                type: "Link",
                linkType: "Environment",
              },
            },
            revision: 2,
            locale: "en-US",
          },
          fields: {
            title: "Woman while working at home",
            description: "Woman working from home - hybrid work",
            file: {
              url: "//images.ctfassets.net/isxmxtc67n72/1Ut8qkTPAH14nmsUhYQavD/043c28cfbc975c420d03c1e19218d94d/green-chameleon-s9CC2SKySJM-unsplash.jpg",
              details: {
                size: 1480962,
                image: {
                  width: 5184,
                  height: 3456,
                },
              },
              fileName: "green-chameleon-s9CC2SKySJM-unsplash.jpg",
              contentType: "image/jpeg",
            },
          },
        },
        {
          metadata: {
            tags: [],
          },
          sys: {
            space: {
              sys: {
                type: "Link",
                linkType: "Space",
                id: "isxmxtc67n72",
              },
            },
            id: "2HAHmtrrpXwa3xUfc7bu7c",
            type: "Asset",
            createdAt: "2022-02-02T11:07:41.560Z",
            updatedAt: "2022-02-02T11:07:41.560Z",
            environment: {
              sys: {
                id: "master",
                type: "Link",
                linkType: "Environment",
              },
            },
            revision: 1,
            locale: "en-US",
          },
          fields: {
            title: "DSC4870",
            description: "Unplug to Recharge ",
            file: {
              url: "//images.ctfassets.net/isxmxtc67n72/2HAHmtrrpXwa3xUfc7bu7c/5931235a52bfca00a751e1e214c6b58a/_DSC4870.jpg",
              details: {
                size: 661636,
                image: {
                  width: 3000,
                  height: 2000,
                },
              },
              fileName: "_DSC4870.jpg",
              contentType: "image/jpeg",
            },
          },
        },
        {
          metadata: {
            tags: [],
          },
          sys: {
            space: {
              sys: {
                type: "Link",
                linkType: "Space",
                id: "isxmxtc67n72",
              },
            },
            id: "36Pl8iklxvI82Vim8JfX4L",
            type: "Asset",
            createdAt: "2022-03-14T14:20:15.335Z",
            updatedAt: "2022-03-14T14:20:15.335Z",
            environment: {
              sys: {
                id: "master",
                type: "Link",
                linkType: "Environment",
              },
            },
            revision: 1,
            locale: "en-US",
          },
          fields: {
            title: "Mudita Pure Newspaper",
            description: "",
            file: {
              url: "//images.ctfassets.net/isxmxtc67n72/36Pl8iklxvI82Vim8JfX4L/f5eb3f029f440b8a63ffb993cdf727d0/Mudita_Pure_Newspaper.jpg",
              details: {
                size: 126155,
                image: {
                  width: 960,
                  height: 640,
                },
              },
              fileName: "Mudita Pure Newspaper.jpg",
              contentType: "image/jpeg",
            },
          },
        },
        {
          metadata: {
            tags: [],
          },
          sys: {
            space: {
              sys: {
                type: "Link",
                linkType: "Space",
                id: "isxmxtc67n72",
              },
            },
            id: "4IkBZNbwCqceCx4c3rQ2la",
            type: "Asset",
            createdAt: "2020-01-28T10:47:28.509Z",
            updatedAt: "2022-02-22T11:57:49.228Z",
            environment: {
              sys: {
                id: "master",
                type: "Link",
                linkType: "Environment",
              },
            },
            revision: 3,
            locale: "en-US",
          },
          fields: {
            title: "social media mission statement",
            file: {
              url: "//images.ctfassets.net/isxmxtc67n72/4IkBZNbwCqceCx4c3rQ2la/28cec9f8fa49e58ab642389427126a20/nordwood-themes-cNXqmO0Z24U-unsplash.jpg",
              details: {
                size: 487766,
                image: {
                  width: 3892,
                  height: 2595,
                },
              },
              fileName: "nordwood-themes-cNXqmO0Z24U-unsplash.jpg",
              contentType: "image/jpeg",
            },
          },
        },
        {
          metadata: {
            tags: [],
          },
          sys: {
            space: {
              sys: {
                type: "Link",
                linkType: "Space",
                id: "isxmxtc67n72",
              },
            },
            id: "4V0n9I2pR0jRhTnbuaZiHr",
            type: "Asset",
            createdAt: "2022-06-28T16:12:27.412Z",
            updatedAt: "2022-06-29T12:53:55.961Z",
            environment: {
              sys: {
                id: "master",
                type: "Link",
                linkType: "Environment",
              },
            },
            revision: 3,
            locale: "en-US",
          },
          fields: {
            title: "Festiwal Wibracje 2022 ",
            description: "",
            file: {
              url: "//images.ctfassets.net/isxmxtc67n72/4V0n9I2pR0jRhTnbuaZiHr/c0e428afa273e4e79abd40e0390ebd86/festiwal_wibracje_blog__2_.png",
              details: {
                size: 1057531,
                image: {
                  width: 1158,
                  height: 1158,
                },
              },
              fileName: "festiwal_wibracje_blog (2).png",
              contentType: "image/png",
            },
          },
        },
      ],
    },
  }
}
