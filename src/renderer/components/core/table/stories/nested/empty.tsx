import React from "react"
import { Files } from "Renderer/components/core/table/stories/styles"
import {
  Col,
  EmptyState,
  Labels,
} from "Renderer/components/core/table/table.component"

export default () => (
  <Files>
    <Labels>
      <Col>File type</Col>
      <Col>Last backup</Col>
      <Col>Size</Col>
    </Labels>
    <EmptyState
      title={{ id: "view.name.phone.contacts.emptyList.title" }}
      description={{
        id: "view.name.phone.contacts.emptyList.emptyPhonebook.description",
      }}
    />
  </Files>
)
