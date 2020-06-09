import React from "react"
import { Contacts } from "Renderer/components/core/table/stories/styles"
import {
  Col,
  EmptyState,
  Labels,
} from "Renderer/components/core/table/table.component"

export default () => (
  <Contacts>
    <Labels>
      <Col>Name</Col>
      <Col>Phone</Col>
    </Labels>
    <EmptyState
      title={{ id: "view.name.phone.contacts.emptyList.title" }}
      description={{
        id: "view.name.phone.contacts.emptyList.emptyPhonebook.description",
      }}
    />
  </Contacts>
)
