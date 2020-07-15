import React, { Ref } from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import {
  Col,
  TextPlaceholder,
} from "Renderer/components/core/table/table.component"
import { Size } from "Renderer/components/core/input-checkbox/input-checkbox.component"
import ButtonComponent from "Renderer/components/core/button/button.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import { UseTableSelect } from "Renderer/utils/hooks/useTableSelect"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { UseTableSidebar } from "Renderer/utils/hooks/useTableSidebar"
import { InView } from "react-intersection-observer"
import { TemplatesTestIds } from "Renderer/modules/messages/tabs/templates.interface"
import { Template } from "Renderer/modules/messages/tabs/templates-ui.component"
import { useTemporaryStorage } from "Renderer/utils/hooks/use-temporary-storage/use-temporary-storage.hook"
import { defineMessages } from "react-intl"
import {
  Checkbox,
  ListRow,
  TemplatesEmptyState,
  TemplatesListTable,
  TextPreview,
} from "Renderer/components/rest/messages/templates/templates-list.styled"
import { intl } from "Renderer/utils/intl"

const messages = defineMessages({
  emptyStateTitle: { id: "view.name.messages.templates.emptyList.title" },
  temporaryText: { id: "view.name.messages.templates.temporary" },
  emptyStateDescription: {
    id: "view.name.messages.templates.emptyList.decription",
  },
})

type SelectHook = Pick<
  UseTableSelect<Template>,
  "getRowStatus" | "toggleRow" | "noneRowsSelected"
>

export interface TemplatesListProps
  extends SelectHook,
    UseTableSidebar<Template> {
  templates: Template[]
  deleteTemplate: (id: string) => void | Promise<void>
}

const TemplatesList: FunctionComponent<TemplatesListProps> = ({
  templates,
  getRowStatus,
  toggleRow,
  noneRowsSelected,
  openSidebar,
  closeSidebar,
  activeRow,
  sidebarOpened,
  deleteTemplate,
}) => {
  return (
    <TemplatesListTable
      role="list"
      hide
      hideColumns={sidebarOpened}
      hideableColumnsIndexes={[2]}
    >
      {templates.length > 0 ? (
        templates.map((template) => {
          const { id, content } = template
          const { selected } = getRowStatus(template)
          const deleteItem = () => deleteTemplate(id)

          const { getTemporaryValue } = useTemporaryStorage<string>(id, content)

          const text =
            getTemporaryValue().length === 0
              ? intl.formatMessage(messages.temporaryText)
              : getTemporaryValue().substr(0, 250)

          const toggle = () => {
            if (sidebarOpened) {
              closeSidebar()
            }
            toggleRow(template)
          }

          const handleTextPreviewClick = () => {
            noneRowsSelected ? openSidebar(template) : toggle()
          }

          const interactiveRow = (ref: Ref<HTMLDivElement>) => (
            <ListRow
              key={id}
              selected={selected}
              active={activeRow?.id === id}
              ref={ref}
              role="listitem"
            >
              <Col>
                <Checkbox
                  size={Size.Small}
                  checked={selected}
                  onChange={toggle}
                  visible={!noneRowsSelected}
                />
              </Col>
              <TextPreview onClick={handleTextPreviewClick}>
                <Text displayStyle={TextDisplayStyle.LargeText}>{text}</Text>
              </TextPreview>
              <Col>
                <ButtonComponent
                  onClick={deleteItem}
                  displayStyle={DisplayStyle.IconOnly2}
                  Icon={Type.Delete}
                />
              </Col>
            </ListRow>
          )

          const placeholderRow = (ref: Ref<HTMLDivElement>) => (
            <ListRow key={id} ref={ref} role="listitem">
              <Col />
              <Col>
                <TextPlaceholder charsCount={content.length} />
              </Col>
              <Col />
            </ListRow>
          )

          return (
            <InView key={id}>
              {({ inView, ref }) =>
                inView ? interactiveRow(ref) : placeholderRow(ref)
              }
            </InView>
          )
        })
      ) : (
        <TemplatesEmptyState
          title={messages.emptyStateTitle}
          description={messages.emptyStateDescription}
          data-testid={TemplatesTestIds.EmptyState}
        />
      )}
    </TemplatesListTable>
  )
}

export default TemplatesList
