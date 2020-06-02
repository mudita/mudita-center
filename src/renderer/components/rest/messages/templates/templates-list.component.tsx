import React, { Ref } from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled, { css, FlattenSimpleInterpolation } from "styled-components"
import Table, { Col, Row } from "Renderer/components/core/table/table.component"
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
import useTableSidebar from "Renderer/utils/hooks/useTableSidebar"
import { TextPlaceholder } from "Renderer/components/rest/phone/contact-list.component"
import { InView } from "react-intersection-observer"

const animatedOpacityStyles = css`
  opacity: 0;
  visibility: hidden;
  transition: opacity ${transitionTime("veryQuick")}
      ${transitionTimingFunction("smooth")},
    visibility ${transitionTime("veryQuick")}
      ${transitionTimingFunction("smooth")};
`

const animatedOpacityActiveStyles = css`
  opacity: 1;
  visibility: visible;
`

const TemplatesListTable = styled(Table)<{
  additionalStyles?: FlattenSimpleInterpolation
}>`
  --columnsGap: 0;
  --columnsTemplate: 4rem 69.5rem 1fr;
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

type Item = {
  id: string
  text: string
}

export interface TemplatesListProps
  extends Pick<
    UseTableSelect<Item>,
    "getRowStatus" | "toggleRow" | "noneRowsSelected"
  > {
  templates: Item[]
}

const TemplatesList: FunctionComponent<TemplatesListProps> = ({
  templates,
  getRowStatus,
  toggleRow,
  noneRowsSelected,
}) => {
  const { openSidebar, closeSidebar, activeRow } = useTableSidebar<Item>()

  return (
    <TemplatesListTable>
      {templates.map(item => {
        const { selected } = getRowStatus(item)
        const handleCheckboxChange = () => {
          closeSidebar()
          toggleRow(item)
        }
        const handlePreviewClick = () => openSidebar(item)

        const interactiveRow = (ref: Ref<HTMLDivElement>) => (
          <ListRow
            key={item.id}
            selected={selected}
            active={activeRow === item}
            ref={ref}
          >
            <Col>
              <Checkbox
                size={Size.Small}
                checked={selected}
                onChange={handleCheckboxChange}
                visible={!noneRowsSelected}
              />
            </Col>
            <TextPreview onClick={handlePreviewClick}>
              <Text displayStyle={TextDisplayStyle.LargeText}>
                {item.text.substr(0, 250)}
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
          <ListRow key={item.id} ref={ref}>
            <Col />
            <Col>
              <TextPlaceholder charsCount={item.text.length} />
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
      })}
    </TemplatesListTable>
  )
}

export default TemplatesList
