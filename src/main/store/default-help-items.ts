import { QuestionAndAnswer } from "Renderer/modules/help/help.component"
import { Document } from "@contentful/rich-text-types"
import { BLOCKS } from "@contentful/rich-text-types"

const answer: Document = {
  nodeType: BLOCKS.DOCUMENT,
  data: {},
  content: [
    {
      nodeType: BLOCKS.HEADING_2,
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
      nodeType: BLOCKS.PARAGRAPH,
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
      nodeType: BLOCKS.PARAGRAPH,
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
      nodeType: BLOCKS.HEADING_3,
      content: [
        {
          nodeType: "text",
          value: "Maecenas ultricies ex mi, quis consequat est cursus ut.",
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
          value:
            "Sed nunc erat, tempor vel risus nec, consectetur lobortis lectus. Maecenas ultricies ex mi, quis consequat est cursus ut. Phasellus ut ante quis metus lacinia lacinia a non ante. Etiam ut libero sit amet sem rutrum mollis quis sed sapien. Donec vitae lacus vitae odio auctor rhoncus et sed ipsum.",
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
          value: "",
          marks: [],
          data: {},
        },
      ],
      data: {},
    },
  ],
}

export const getDefaultHelpItems = (): QuestionAndAnswer => {
  return {
    collection: ["24YEjwJx8jAuedvWDz8rvU", "1NESOKKWZCTjV8rlSE4JbH"],
    items: {
      "24YEjwJx8jAuedvWDz8rvU": {
        id: "24YEjwJx8jAuedvWDz8rvU",
        question: "Saepe non quasi at ipsa autem molestias et consequuntur.",
        answer,
      },
      "1NESOKKWZCTjV8rlSE4JbH": {
        id: "1NESOKKWZCTjV8rlSE4JbH",
        question: "Saepe non quasi at ipsa autem molestias et consequuntur.",
        answer,
      },
    },
  }
}
