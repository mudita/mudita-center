import React, { Ref } from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled, { css } from "styled-components"
import Table, {
  Col,
  EmptyState,
  Row,
  TextPlaceholder,
} from "Renderer/components/core/table/table.component"
import InputCheckbox, {
  Size,
} from "Renderer/components/core/input-checkbox/input-checkbox.component"
import ButtonComponent from "Renderer/components/core/button/button.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import { UseTableSelect } from "Renderer/utils/hooks/useTableSelect"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import {
  transitionTime,
  transitionTimingFunction,
} from "Renderer/styles/theming/theme-getters"
import { UseTableSidebar } from "Renderer/utils/hooks/useTableSidebar"
import { InView } from "react-intersection-observer"
import { TemplatesTestIds } from "Renderer/modules/messages/tabs/templates.interface"
import { Template } from "Renderer/modules/messages/tabs/templates-ui.component"
import { useTemporaryStorage } from "Renderer/utils/hooks/use-temporary-storage/use-temporary-storage.hook"

export const animatedOpacityStyles = css`
  opacity: 0;
  visibility: hidden;
  transition: opacity ${transitionTime("veryQuick")}
      ${transitionTimingFunction("smooth")},
    visibility ${transitionTime("veryQuick")}
      ${transitionTimingFunction("smooth")};
`

export const animatedOpacityActiveStyles = css`
  opacity: 1;
  visibility: visible;
`

const TemplatesListTable = styled(Table)`
  --columnsGap: 0;
  --columnsTemplate: 4rem 69.5rem 1fr;
  --columnsTemplateWithOpenedSidebar: 4rem 27.5rem;
`

const TextPreview = styled(Col)`
  height: 100%;
  overflow: hidden;
  cursor: pointer;

  p {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`

const Checkbox = styled(InputCheckbox)<{ visible?: boolean }>`
  ${animatedOpacityStyles};

  ${({ visible }) => visible && animatedOpacityActiveStyles}
`

const ListRow = styled(Row)`
  ${Col} {
    button {
      ${animatedOpacityStyles};
    }
  }
  :hover {
    ${Col} {
      button {
        ${animatedOpacityActiveStyles};
      }
      ${Checkbox} {
        ${animatedOpacityActiveStyles};
      }
    }
  }
  ${Col} {
    :first-of-type {
      justify-content: center;
    }
    :last-of-type {
      justify-content: flex-end;
      padding-right: 2.4rem;
    }
  }
`

const TemplatesEmptyState = styled(EmptyState)`
  border-top: none;
`

type SelectHook = Pick<
  UseTableSelect<Template>,
  "getRowStatus" | "toggleRow" | "noneRowsSelected"
>

export interface TemplatesListProps
  extends SelectHook,
    UseTableSidebar<Template> {
  templates: Template[]
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
}) => {
  return (
    <TemplatesListTable
      role="list"
      hide
      hideColumns={sidebarOpened}
      hideableColumnsIndexes={[2]}
    >
      {templates.length > 0 ? (
        templates.map(item => {
          const { selected } = getRowStatus(item)

          const { get: getAutosavedTemplate } = useTemporaryStorage(
            item.id,
            item.content
          )

          const toggle = () => {
            if (sidebarOpened) {
              closeSidebar()
            }
            toggleRow(item)
          }

          const handleTextPreviewClick = () => {
            if (noneRowsSelected) {
              openSidebar(item)
            } else {
              toggle()
            }
          }

          const interactiveRow = (ref: Ref<HTMLDivElement>) => (
            <ListRow
              key={item.id}
              selected={selected}
              active={activeRow === item}
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
                  {(getAutosavedTemplate() || "").substr(0, 250)}
                </Text>
              </TextPreview>
              <Col>
                <ButtonComponent
                  displayStyle={DisplayStyle.IconOnly2}
                  Icon={Type.Delete}
                />
              </Col>
            </ListRow>
          )

          const placeholderRow = (ref: Ref<HTMLDivElement>) => (
            <ListRow key={item.id} ref={ref} role="listitem">
              <Col />
              <Col>
                <TextPlaceholder charsCount={item.content.length} />
              </Col>
              <Col />
            </ListRow>
          )

          return (
            <InView key={item.id}>
              {({ inView, ref }) =>
                inView ? interactiveRow(ref) : placeholderRow(ref)
              }
            </InView>
          )
        })
      ) : (
        <TemplatesEmptyState
          title={{ id: "view.name.messages.templates.emptyList.title" }}
          description={{
            id: "view.name.messages.templates.emptyList.description",
          }}
          data-testid={TemplatesTestIds.EmptyState}
        />
      )}
    </TemplatesListTable>
  )
}

export default TemplatesList
