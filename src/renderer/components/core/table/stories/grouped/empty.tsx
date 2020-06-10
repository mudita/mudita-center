import React from "react"
import { Contacts } from "Renderer/components/core/table/stories/styles"
import { EmptyState } from "Renderer/components/core/table/table.component"

export default () => (
  <Contacts>
    <EmptyState
      title={{ id: "view.name.phone.contacts.emptyList.title" }}
      description={{
        id: "view.name.phone.contacts.emptyList.emptyPhonebook.description",
      }}
    />
  </Contacts>
)
