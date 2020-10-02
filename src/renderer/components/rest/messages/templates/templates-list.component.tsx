import React, { Ref } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import {
  Col,
  Labels,
  RowSize,
  TableSortButton,
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
import { TemplatesTestIds } from "Renderer/modules/messages/tabs/templates.enum"
import { Template } from "Renderer/modules/messages/tabs/templates.component"
import { useTemporaryStorage } from "Renderer/utils/hooks/use-temporary-storage/use-temporary-storage.hook"
import { defineMessages } from "react-intl"
import {
  Checkbox,
  DeleteCol,
  Row,
  Table,
  TemplatesEmptyState,
  TextPreview,
} from "Renderer/components/rest/messages/templates/templates-list.styled"
import { intl } from "Renderer/utils/intl"
import { isToday } from "Renderer/utils/is-today"
import moment from "moment"
import { SortOrder } from "Common/enums/sort-order.enum"

const messages = defineMessages({
  emptyStateTitle: { id: "view.name.messages.templates.emptyList.title" },
  temporaryText: { id: "view.name.messages.templates.temporary" },
  emptyStateDescription: {
    id: "view.name.messages.templates.emptyList.description",
  },
  note: {
    id: "view.name.messages.templates.template",
  },
  edited: {
    id: "view.name.messages.templates.edited",
  },
  today: {
    id: "view.generic.today",
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
  changeSortOrder: (sortOrder: SortOrder) => void
  sortOrder: SortOrder
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
  changeSortOrder,
  sortOrder,
}) => {
  const templatesAvailable = templates.length > 0
  const toggleSortOrder = () => {
    if (sortOrder === SortOrder.Descending) {
      changeSortOrder(SortOrder.Ascending)
    } else {
      changeSortOrder(SortOrder.Descending)
    }
  }
  return (
    <Table
      role="list"
      hide
      hideColumns={sidebarOpened}
      hideableColumnsIndexes={[2]}
    >
      <Labels size={RowSize.Small}>
        <Col />
        <Col>
          <Text message={messages.note} />
        </Col>
        <Col
          onClick={toggleSortOrder}
          data-testid={TemplatesTestIds.SortColumn}
        >
          <Text message={messages.edited} />
          <TableSortButton sortOrder={sortOrder} />
        </Col>
      </Labels>
      {templatesAvailable ? (
        templates.map((template) => {
          const { id, content, date } = template
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
            <Row
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
                <Text displayStyle={TextDisplayStyle.LargeText}>
                  {isToday(date)
                    ? intl.formatMessage(messages.today)
                    : moment(date).format("ll")}
                </Text>
              </Col>
              <DeleteCol>
                <ButtonComponent
                  onClick={deleteItem}
                  displayStyle={DisplayStyle.IconOnly2}
                  Icon={Type.Delete}
                />
              </DeleteCol>
            </Row>
          )

          const placeholderRow = (ref: Ref<HTMLDivElement>) => (
            <Row key={id} ref={ref} role="listitem">
              <Col />
              <Col>
                <TextPlaceholder charsCount={content?.length} />
              </Col>
              <Col />
            </Row>
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
    </Table>
  )
}

export default TemplatesList
