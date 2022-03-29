/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps, ReactNode } from "react"
import Text, {
  getTextStyles,
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import {
  backgroundColor,
  borderColor,
  borderRadius,
  textColor,
  transitionTime,
  transitionTimingFunction,
  width,
  zIndex,
} from "Renderer/styles/theming/theme-getters"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import styled, { css } from "styled-components"
import { Message as MessageInterface } from "Renderer/interfaces/message.interface"
import Loader from "Renderer/components/core/loader/loader.component"
import { LoaderType } from "Renderer/components/core/loader/loader.interface"
import { SortOrder } from "Common/enums/sort-order.enum"
import { TableTestIds } from "Renderer/components/core/table/table.enum"
import { IconButtonWithSecondaryTooltip } from "Renderer/components/core/icon-button-with-tooltip/icon-button-with-secondary-tooltip.component"
import { IconType } from "Renderer/components/core/icon/icon-type"

/* Row */
export enum RowSize {
  Big,
  Medium,
  Small,
  Tiny,
}

const selectedRowStyles = css`
  background-color: ${backgroundColor("minor")};
`

const activeRowStyles = css`
  ${selectedRowStyles};

  &:after {
    content: "";
    position: absolute;
    z-index: 0;
    left: 0;
    top: 0;
    width: 0.3rem;
    height: 100%;
    background-color: ${backgroundColor("activity")};
    border-radius: ${borderRadius("small")};
  }
`

const clickableRowStyles = css`
  cursor: pointer;
`

export interface TableRowProps {
  size?: RowSize
  active?: boolean
  selected?: boolean
}

export const Row = styled.div<TableRowProps>`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: var(--columnsTemplate);
  grid-column-gap: var(--columnsGap);
  align-items: center;
  position: relative;
  box-sizing: border-box;
  border-bottom: solid 0.1rem ${borderColor("list")};
  background-color: var(--rowBackground);
  transition: background-color ${transitionTime("veryQuick")}
    ${transitionTimingFunction("smooth")};

  height: ${({ size }) => {
    switch (size) {
      case RowSize.Big:
        return 8
      case RowSize.Small:
        return 4.8
      case RowSize.Tiny:
        return 4
      case RowSize.Medium:
      default:
        return 6.4
    }
  }}rem;

  &:hover {
    background-color: ${backgroundColor("minor")};
  }

  ${({ active }) => active && activeRowStyles};
  ${({ selected }) => selected && selectedRowStyles};
  ${({ onClick }) => onClick && clickableRowStyles};
`

/* Column */
export const Col = styled.div`
  ${getTextStyles(TextDisplayStyle.Paragraph3)};
  display: flex;
  align-items: center;
  ${({ onClick }) => onClick && clickableRowStyles};
  word-break: break-word;

  :first-of-type {
    padding-left: var(--columnsGap);
  }
  :last-of-type {
    padding-right: var(--columnsGap);
  }
`

/* Labels */
const rowLabelStyles = css`
  padding: 0;
  z-index: 1;
  ${Col} {
    ${getTextStyles(TextDisplayStyle.Headline4)};
    line-height: 1.1;
  }
`

const columnLabelStyles = css`
  z-index: 2;
  ${Col} {
    ${getTextStyles(TextDisplayStyle.Title)};
    color: ${textColor("secondary")};
    text-transform: uppercase;
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    line-height: 1.2;
  }
`

export const Labels = styled(Row)`
  position: sticky;
  top: 0;
  left: 0;
  background-color: var(--labelBackground) !important;
`

/* Group */
export const Group = styled.div`
  position: relative;
  margin-top: -0.1rem;

  ${Labels} {
    ${rowLabelStyles};
  }

  ${Row} {
    :last-of-type {
      border-width: 0.2rem;
    }
  }
`

export const NestedGroup = styled.div<{ level?: number }>`
  position: relative;
  ${Row} > ${Col} {
    :nth-child(1) {
      border-left: solid transparent
        calc(${({ level }) => level || 1} * var(--nestSize));
    }
  }
`

/* Sidebar */
const SidebarClose = styled.div`
  grid-area: Close;
  cursor: pointer;
  justify-self: end;
`

const SidebarHeaderLeft = styled.div`
  grid-area: Left;
`

const SidebarHeaderRight = styled.div`
  grid-area: Right;
  position: relative;
  display: flex;
  flex-direction: row;

  &:after {
    content: "";
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    position: absolute;
    width: 0.1rem;
    height: 1.6rem;
    background-color: ${borderColor("list")};
  }
`

const SidebarHeader = styled.div<{
  withBottomBorder: boolean
}>`
  display: grid;
  height: var(--header-height);
  grid-template-columns: 1fr auto 3.2rem;
  grid-template-areas: "Left Right Close";
  align-items: center;
  background-color: var(--header-background);
  padding: 0 2.3rem 0 3rem;
  border-bottom: solid
    ${({ withBottomBorder }) => (withBottomBorder ? `0.1rem` : 0)}
    ${borderColor("list")};
`

const SidebarContent = styled.div<{ padded: boolean }>`
  padding: ${({ padded }) => (padded ? `0 3rem` : "0")};
  overflow: auto;
  flex: 1;
  display: flex;
  flex-direction: column;
`

const SidebarWrapper = styled.div<{
  show?: boolean
  appColorSidebarHeader: boolean
}>`
  --header-height: 6.2rem;
  --header-background: ${({ appColorSidebarHeader = "transparent" }) =>
    appColorSidebarHeader && backgroundColor("main")};

  width: 60.8rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: ${backgroundColor("row")};
  border-left: solid 0.1rem ${borderColor("list")};
  border-top: solid 0.1rem ${borderColor("list")};
  margin-right: ${({ show }) => (show ? 0 : -62.1)}rem;
`

export const SidebarHeaderButton = styled(IconButtonWithSecondaryTooltip).attrs(
  () => ({})
)`
  margin-right: 0.4rem;
`

/* Empty state */
const EmptyStateWrapper = styled.div`
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${backgroundColor("row")};
  p:first-of-type {
    margin-top: 2.4rem;
  }
`

export const TextPlaceholder = styled.span<{ charsCount: number }>`
  display: block;
  background-color: ${backgroundColor("minor")};
  height: 1em;
  border-radius: ${borderRadius("medium")};
  width: ${({ charsCount }) => charsCount * 0.6}rem;
  min-width: 5rem;
`

export interface EmptyStateProps {
  title: MessageInterface
  description?: MessageInterface
}

export const EmptyState: FunctionComponent<EmptyStateProps> = ({
  title,
  description,
  ...rest
}) => (
  <EmptyStateWrapper {...rest}>
    <Text displayStyle={TextDisplayStyle.Headline3} message={title} />
    {description && (
      <Text
        displayStyle={TextDisplayStyle.Paragraph3}
        message={description}
        color="secondary"
      />
    )}
  </EmptyStateWrapper>
)

/* Loading state */
export const LoadingState: FunctionComponent = ({ className, ...props }) => (
  <EmptyStateWrapper className={className} {...props}>
    <Loader type={LoaderType.Logo} width="100" />
  </EmptyStateWrapper>
)

/* Sidebar */
export interface SidebarProps {
  show?: boolean
  onClose?: () => void
  headerLeft?: ReactNode
  headerRight?: ReactNode
  appColorSidebarHeader?: boolean
  padded?: boolean
  withBottomBorder?: boolean
}

export const Sidebar: FunctionComponent<SidebarProps> = ({
  show,
  className,
  onClose,
  children,
  headerLeft,
  headerRight,
  appColorSidebarHeader = false,
  padded = true,
  withBottomBorder = false,
  ...rest
}) => (
  <SidebarWrapper
    className={className}
    show={show}
    appColorSidebarHeader={appColorSidebarHeader}
    data-testid={TableTestIds.Sidebar}
    {...rest}
  >
    <SidebarHeader withBottomBorder={withBottomBorder}>
      {headerLeft && <SidebarHeaderLeft>{headerLeft}</SidebarHeaderLeft>}
      {headerRight && <SidebarHeaderRight>{headerRight}</SidebarHeaderRight>}
      <SidebarClose onClick={onClose} data-testid={TableTestIds.SidebarClose}>
        <SidebarHeaderButton
          iconType={IconType.Close}
          description={{ id: "Close" }}
        />
      </SidebarClose>
    </SidebarHeader>
    <SidebarContent padded={padded}>{children}</SidebarContent>
  </SidebarWrapper>
)

/* Table */
export interface TableProps {
  hideColumns?: boolean
  hideableColumnsIndexes?: number[]
  sidebar?: ReactNode
  scrollable?: boolean
}

const TableComponent = styled.div<TableProps>`
  --nestSize: 4rem;
  --columnsTemplate: repeat(auto-fit, minmax(0, 1fr));
  --columnsGap: 2rem;
  --labelBackground: ${backgroundColor("main")};
  --rowBackground: ${backgroundColor("row")};
  display: flex;
  flex-direction: column;
  flex: 1;
  z-index: ${zIndex("content")};
  position: relative;
  ${({ scrollable = true }) =>
    scrollable
      ? css`
          overflow: scroll !important;
        `
      : css`
          overflow: hidden !important;
          padding-right: ${width("scrollbar")};
        `};

  > ${Labels} {
    ${columnLabelStyles};

    + ${EmptyStateWrapper} {
      border-top: none;
      margin-top: 0;
    }
  }

  ${Group} {
    :last-of-type {
      ${Row} {
        :last-of-type {
          border-width: 0.1rem;
        }
      }
    }
  }

  ${({ hideColumns, hideableColumnsIndexes = [] }) =>
    hideColumns &&
    css`
      --columnsTemplate: var(--columnsTemplateWithOpenedSidebar) !important;

      ${Col} {
        ${hideableColumnsIndexes.map(
          (column) =>
            css`
              &:nth-of-type(${column + 1}) {
                display: none;
              }
            `
        )};
      }
    `};
`

export const TableWithSidebarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  overflow: hidden;
  flex: 1;
  background: ${backgroundColor("main")};
`

const Table = React.forwardRef<
  HTMLDivElement,
  ComponentProps<typeof TableComponent>
>((props, ref) => <TableComponent {...props} ref={ref} />)

/* Sort */
/**
 * Extra rotation added to avoid jagged edges on older displays.
 * @see http://apps.eky.hk/css-triangle-generator/
 */
export const TableSortButton = styled.button<{ sortOrder?: SortOrder }>`
  background: none;
  color: currentColor;
  cursor: pointer;
  width: 0;
  height: 0;
  padding: 0;
  margin: 0 1rem;
  border-style: solid;
  border-width: 0.5rem 0.3rem 0 0.3rem;
  border-color: currentColor transparent transparent transparent;
  transform: ${({ sortOrder }) =>
    sortOrder === SortOrder.Descending ? "rotate(0deg)" : "rotate(180deg)"};

  &:active,
  &:focus {
    outline: 0;
  }
`

export default Table
export const ActionsButton = styled.span`
  cursor: pointer;
`
export const Actions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  flex: 1;
  padding-right: 3rem;
  box-sizing: border-box;
`
