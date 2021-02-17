/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import React from "react"
import { storiesOf } from "@storybook/react"
import TemplateModal from "App/templates/components/template-modal.component"
import {
  ModalBackdrop,
  ModalWrapper,
} from "Renderer/components/core/modal/modal.styled.elements"
import { Template } from "App/templates/store/templates.interface"

const mockedTemplates: Template[] = [
  {
    id: "123",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, neque? Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, neque? Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, neque? Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, neque?",
    date: new Date("2019-09-30T14:55:29.226Z"),
  },
  {
    id: "321",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, neque?",
    date: new Date("2019-09-30T14:55:29.226Z"),
  },
  {
    id: "1233",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, neque?",
    date: new Date("2019-09-30T14:55:29.226Z"),
  },
  {
    id: "12333",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, neque?",
    date: new Date("2019-09-30T14:55:29.226Z"),
  },
  {
    id: "123331",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, neque?",
    date: new Date("2019-09-30T14:55:29.226Z"),
  },
]

const extendedTemplateData: Template[] = [
  ...mockedTemplates,
  {
    id: "12333133",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, neque?",
    date: new Date("2019-09-30T14:55:29.226Z"),
  },
  {
    id: "12333122",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, neque?",
    date: new Date("2019-09-30T14:55:29.226Z"),
  },
  {
    id: "12312233",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, neque?",
    date: new Date("2019-09-30T14:55:29.226Z"),
  },
  {
    id: "123122334",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, neque?",
    date: new Date("2019-09-30T14:55:29.226Z"),
  },
]

storiesOf("Views|Templates/Modals", module)
  .add("Template modal", () => (
    <div style={{ maxWidth: "97.5rem" }}>
      <ModalWrapper>
        <TemplateModal templates={mockedTemplates} />
      </ModalWrapper>
      <ModalBackdrop />
    </div>
  ))
  .add("Template modal - extended", () => (
    <div style={{ maxWidth: "97.5rem" }}>
      <ModalWrapper>
        <TemplateModal templates={extendedTemplateData} />
      </ModalWrapper>
      <ModalBackdrop />
    </div>
  ))
