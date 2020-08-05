import { QuestionAndAnswer } from "Renderer/modules/help/help.component"
import { BLOCKS, Document } from "@contentful/rich-text-types"

export const mockedHeadingText = "lala 123"

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
      question:
        "Fuga tenetur necessitatibus perferendis aliquid officia recusandae et.",
      answer,
    },
    "73f44c12-5c00-433f-a9cf-e7e503fa2594": {
      question: "Delectus ea distinctio dolore ea.",
      answer,
    },
    "a042a5a8-6478-4e2b-8040-36b97497740f": {
      question: "Odio id eligendi aliquid.",
      answer,
    },
    "832b39ed-140b-476c-b1d8-6de8e441e3c2": {
      question: "Odio id eligendi aliquid.",
      answer,
    },
    "6d959bb2-489e-4419-a107-60abaa745d5c1": {
      question: "Autem porro consectetur voluptatem.",
      answer,
    },
    "6d959bb2-489e-4419-a107-60abaa745d5c2": {
      question: "Autem porro consectetur voluptatem.",
      answer,
    },
    "3c0c7f13-5b84-4da8-a7ea-e66a654b7c7f": {
      question: "Laboriosam suscipit ut aperiam molestiae veritatis.",
      answer,
    },
    "4c0c7f13-5b84-4da8-a7ea-e66a654b7c7f": {
      question: "Laboriosam suscipit ut aperiam molestiae veritatis.",
      answer,
    },
    "116d959bb2-489e-4419-a107-60abaa745d5c2": {
      question: "Saepe non quasi at ipsa autem molestias et consequuntur.",
      answer,
    },
  },
}

export const helpSeed = {
  list: data,
}
