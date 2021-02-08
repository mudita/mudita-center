/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { QuestionAndAnswer } from "Renderer/modules/help/help.component"
import { BLOCKS, Document } from "@contentful/rich-text-types"
import { URL_MAIN } from "Renderer/constants/urls"

export const mockedHeadingText = "lala 123"
export const mockedParagraphText =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus diam neque, varius ac fermentum sit amet, interdum in metus. Vivamus eleifend turpis nec accumsan mollis."
export const mockedMinorHeadingText =
  "Maecenas ultricies ex mi, quis consequat est cursus ut."

const answer: Document = {
  nodeType: BLOCKS.DOCUMENT,
  data: {},
  content: [
    {
      nodeType: BLOCKS.HEADING_1,
      content: [
        {
          nodeType: "text",
          value: mockedHeadingText,
          marks: [],
          data: {},
        },
      ],
      data: {},
    },
    {
      nodeType: BLOCKS.PARAGRAPH,
      content: [
        {
          nodeType: "text",
          value: mockedParagraphText,
          marks: [],
          data: {},
        },
      ],
      data: {},
    },
    {
      nodeType: BLOCKS.HEADING_3,
      content: [
        {
          nodeType: "text",
          value: mockedMinorHeadingText,
          marks: [],
          data: {},
        },
      ],
      data: {},
    },
  ],
}

export const data: QuestionAndAnswer = {
  collection: [
    "e66895c6-3d65-4f96-8c81-e58c43ec6aee",
    "73f44c12-5c00-433f-a9cf-e7e503fa2594",
    "a042a5a8-6478-4e2b-8040-36b97497740f",
    "832b39ed-140b-476c-b1d8-6de8e441e3c2",
    "6d959bb2-489e-4419-a107-60abaa745d5c1",
    "6d959bb2-489e-4419-a107-60abaa745d5c2",
    "3c0c7f13-5b84-4da8-a7ea-e66a654b7c7f",
    "4c0c7f13-5b84-4da8-a7ea-e66a654b7c7f",
    "116d959bb2-489e-4419-a107-60abaa745d5c2",
  ],
  items: {
    "e66895c6-3d65-4f96-8c81-e58c43ec6aee": {
      id: "e66895c6-3d65-4f96-8c81-e58c43ec6aee",
      question:
        "Fuga tenetur necessitatibus perferendis aliquid officia recusandae et.",
      answer,
    },
    "73f44c12-5c00-433f-a9cf-e7e503fa2594": {
      id: "73f44c12-5c00-433f-a9cf-e7e503fa2594",
      question: "Delectus ea distinctio dolore ea.",
      answer,
    },
    "a042a5a8-6478-4e2b-8040-36b97497740f": {
      id: "a042a5a8-6478-4e2b-8040-36b97497740f",
      question: "Odio id eligendi aliquid.",
      answer,
    },
    "832b39ed-140b-476c-b1d8-6de8e441e3c2": {
      id: "832b39ed-140b-476c-b1d8-6de8e441e3c2",
      question: "Odio id eligendi aliquid.",
      answer,
    },
    "6d959bb2-489e-4419-a107-60abaa745d5c1": {
      id: "6d959bb2-489e-4419-a107-60abaa745d5c1",
      question: "Autem porro consectetur voluptatem.",
      answer,
    },
    "6d959bb2-489e-4419-a107-60abaa745d5c2": {
      id: "6d959bb2-489e-4419-a107-60abaa745d5c2",
      question: "Autem porro consectetur voluptatem.",
      answer,
    },
    "3c0c7f13-5b84-4da8-a7ea-e66a654b7c7f": {
      id: "3c0c7f13-5b84-4da8-a7ea-e66a654b7c7f",
      question: "Laboriosam suscipit ut aperiam molestiae veritatis.",
      answer,
    },
    "4c0c7f13-5b84-4da8-a7ea-e66a654b7c7f": {
      id: "4c0c7f13-5b84-4da8-a7ea-e66a654b7c7f",
      question: "Laboriosam suscipit ut aperiam molestiae veritatis.",
      answer,
    },
    "116d959bb2-489e-4419-a107-60abaa745d5c2": {
      id: "116d959bb2-489e-4419-a107-60abaa745d5c2",
      question: "Saepe non quasi at ipsa autem molestias et consequuntur.",
      answer,
    },
  },
}

export const testQuestion =
  "Fuga tenetur necessitatibus perferendis aliquid officia recusandae et."

export const testSeedCollectionIds = [
  "24YEjwJx8jAuedvWDz8rvU",
  "1NESOKKWZCTjV8rlSE4JbH",
]

export const testSeed = {
  data: {
    collection: testSeedCollectionIds,
    items: {
      "24YEjwJx8jAuedvWDz8rvU": {
        id: "24YEjwJx8jAuedvWDz8rvU",
        question: testQuestion,
        answer: {
          data: {},
          content: [
            {
              data: {},
              content: [
                {
                  data: {},
                  marks: [],
                  value: "lala",
                  nodeType: "text",
                },
              ],
              nodeType: "heading-1",
            },
            {
              data: {},
              content: [
                {
                  data: {},
                  marks: [],
                  value: "",
                  nodeType: "text",
                },
              ],
              nodeType: "paragraph",
            },
          ],
          nodeType: "document",
        },
      },
      "1NESOKKWZCTjV8rlSE4JbH": {
        id: "1NESOKKWZCTjV8rlSE4JbH",
        question: "Example question lala",
        answer: {
          nodeType: "document",
          data: {},
          content: [
            {
              nodeType: "heading-2",
              content: [
                {
                  nodeType: "text",
                  value:
                    "Consectetur adipiscing elit. Fusce imperdiet nisi odio, et iaculis justo sagittis non.",
                  marks: [],
                  data: {},
                },
              ],
              data: {},
            },
            {
              nodeType: "paragraph",
              content: [
                {
                  nodeType: "text",
                  value:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus diam neque, varius ac fermentum sit amet, interdum in metus. Vivamus eleifend turpis nec accumsan mollis.",
                  marks: [],
                  data: {},
                },
              ],
              data: {},
            },
            {
              nodeType: "paragraph",
              content: [
                {
                  nodeType: "text",
                  value:
                    "Sed nunc erat, tempor vel risus nec, consectetur lobortis lectus. Maecenas ultricies ex mi, quis consequat est cursus ut. Phasellus ut ante quis metus lacinia lacinia a non ante. Etiam ut libero sit amet sem rutrum mollis quis sed sapien. Donec vitae lacus vitae odio auctor rhoncus et sed ipsum. Pellentesque ac viverra turpis. Aliquam posuere lorem non orci placerat venenatis. Mauris posuere consectetur orci sed sodales.",
                  marks: [],
                  data: {},
                },
              ],
              data: {},
            },
            {
              nodeType: "heading-3",
              content: [
                {
                  nodeType: "text",
                  value:
                    "Maecenas ultricies ex mi, quis consequat est cursus ut.",
                  marks: [],
                  data: {},
                },
              ],
              data: {},
            },
            {
              nodeType: "paragraph",
              content: [
                {
                  nodeType: "text",
                  value:
                    "Sed nunc erat, tempor vel risus nec, consectetur lobortis lectus. Maecenas ultricies ex mi, quis consequat est cursus ut. Phasellus ut ante quis metus lacinia lacinia a non ante. Etiam ut libero sit amet sem rutrum mollis quis sed sapien. Donec vitae lacus vitae odio auctor rhoncus et sed ipsum.",
                  marks: [],
                  data: {},
                },
              ],
              data: {},
            },
            {
              nodeType: "paragraph",
              content: [
                {
                  nodeType: "text",
                  value: "",
                  marks: [],
                  data: {},
                },
              ],
              data: {},
            },
          ],
        },
      },
    },
    nextSyncToken:
      "w7Ese3kdwpMbMhhgw7QAUsKiw6bCiw_ClnfDrRLCuFDDkMO5YcKMJQ_CvcKUecOnMHjCjsOGw5HDu1Fdwrs7E8KjYGgHf8OTw7ZWwrTCiTMDSmkkDHUuC8OvGsOOw4d4IUTCghbDu8KRwp4XZcKZZEklwqkHVjU6Z8OAccKqwoklwoPDlVTCv8OLW8O2RcKRSMOpFsKZbnUKw4_CnsKPwpA",
  },
}

export const mockedRouteAndPath = {
  route: `${URL_MAIN.help}/${data.collection[0]}`,
  path: `${URL_MAIN.help}/:questionId`,
}

export const helpSeed = {
  list: data,
}
