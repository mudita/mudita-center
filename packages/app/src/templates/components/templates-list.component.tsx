/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

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
import { Type } from "Renderer/components/core/icon/icon.config"
import { UseTableSelect } from "Renderer/utils/hooks/useTableSelect"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { UseTableSidebar } from "Renderer/utils/hooks/use-table-sidebar"
import { InView } from "react-intersection-observer"
import { TemplatesTestIds } from "App/templates/components/templates/templates.enum"
import { Template } from "App/templates/store/templates.interface"
import { useTemporaryStorage } from "Renderer/utils/hooks/use-temporary-storage/use-temporary-storage.hook"
import { defineMessages } from "react-intl"
import {
  Row,
  TemplatesEmptyState,
  Table,
  TextPreview,
  DeleteCol,
} from "App/templates/components/templates-list.styled"
import { intl } from "Renderer/utils/intl"
import { isToday } from "Renderer/utils/is-today"
import moment from "moment"
import { Checkbox } from "Renderer/components/rest/calls/calls-table.styled"
import Icon, { IconSize } from "Renderer/components/core/icon/icon.component"
import { TextInfo } from "Renderer/modules/tools/tabs/notes.styled"
import { normalizeText } from "Renderer/components/core/text-editor/text-editor.hook"
import { SortOrder } from "Common/enums/sort-order.enum"

const messages = defineMessages({
  emptyStateTitle: { id: "module.templates.emptyList.title" },
  temporaryText: { id: "module.templates.temporary" },
  emptyStateDescription: {
    id: "module.templates.emptyList.description",
  },
  note: {
    id: "module.templates.template",
  },
  edited: {
    id: "module.templates.edited",
  },
  today: {
    id: "component.textToday",
  },
  newTemplate: {
    id: "module.templates.newTemplate",
  },
  emptyTemplate: {
    id: "module.templates.emptyTemplate",
  },
  unsavedTemplate: {
    id: "module.templates.unsavedTemplate",
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
  newTemplateId?: string
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
  newTemplateId,
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
      hideableColumnsIndexes={[2, 3, 4]}
    >
      <Labels size={RowSize.Small}>
        <Col />
        <Col>
          <Text message={messages.note} />
        </Col>
        <Col />
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

          const editedTemplate =
            normalizeText(getTemporaryValue()) !== normalizeText(content)
          const newTemplate = id === newTemplateId
          const emptyTemplate = getTemporaryValue().length === 0

          const text = emptyTemplate
            ? intl.formatMessage(messages.emptyTemplate)
            : (editedTemplate
                ? getTemporaryValue()
                : normalizeText(content)
              ).substr(0, 250)

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
                <Text displayStyle={TextDisplayStyle.LargeText}>
                  {emptyTemplate ? <em>{text}</em> : text}
                </Text>
              </TextPreview>
              <Col>
                {(editedTemplate || newTemplate) && (
                  <TextInfo>
                    {newTemplate && (
                      <>
                        <em>{intl.formatMessage(messages.newTemplate)}</em>
                        <br />
                      </>
                    )}
                    <em>{intl.formatMessage(messages.unsavedTemplate)}</em>
                  </TextInfo>
                )}
              </Col>
              <Col>
                <Text displayStyle={TextDisplayStyle.LargeText}>
                  {isToday(date)
                    ? intl.formatMessage(messages.today)
                    : moment(date).format("ll")}
                </Text>
              </Col>
              <DeleteCol onClick={deleteItem}>
                <Icon type={Type.Delete} width={IconSize.Medium} />
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
