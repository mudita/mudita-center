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
import FunctionComponent from "Renderer/types/function-component.interface"
import { SortDirection } from "Renderer/utils/hooks/use-sort/use-sort.types"
import styled, { css } from "styled-components"
import { Type } from "Renderer/components/core/icon/icon.config"
import ButtonComponent from "Renderer/components/core/button/button.component"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import { Message as MessageInterface } from "Renderer/interfaces/message.interface"
import Loader from "Renderer/components/core/loader/loader.component"
import { LoaderType } from "Renderer/components/core/loader/loader.interface"

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
    right: 0;
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

interface TableRowProps {
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
        return 9
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
  ${getTextStyles(TextDisplayStyle.MediumText)};
  display: flex;
  align-items: center;
  ${({ onClick }) => onClick && clickableRowStyles};

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
    ${getTextStyles(TextDisplayStyle.LargeBoldText)};
    line-height: 1.1;
  }
`

const columnLabelStyles = css`
  z-index: 2;
  ${Col} {
    ${getTextStyles(TextDisplayStyle.SmallFadedText)};
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
      border-left: solid transparent calc(${({ level }) =>
        level || 1} * var(--nestSize));
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
  padding-right: 1.6rem;
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

const SidebarHeader = styled.div`
  display: grid;
  height: var(--header-height);
  grid-template-columns: 1fr auto 3.8rem;
  grid-template-areas: "Left Right Close";
  align-items: center;
  background-color: var(--header-background);
  padding: 0 2.3rem 0 3rem;
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
  --header-height: 10.4rem;
  --header-background: ${({ appColorSidebarHeader = "transparent" }) =>
    appColorSidebarHeader && backgroundColor("main")};

  width: 62rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: ${backgroundColor("row")};
  border-left: solid 0.1rem ${borderColor("list")};
  border-top: solid 0.1rem ${borderColor("list")};
  margin-right: ${({ show }) => (show ? 0 : -62.1)}rem;
`

export const SidebarHeaderIcon = styled(ButtonComponent).attrs(() => ({
  displayStyle: DisplayStyle.IconOnly2,
}))`
  width: 3.2rem;
  height: 3.2rem;
  margin-left: 0.6rem;
  opacity: 0.6;
  transition: opacity ${transitionTime("quick")}
    ${transitionTimingFunction("smooth")};

  &:hover {
    opacity: 1;
  }

  > div {
    width: 1.6rem;
    height: 1.6rem;
  }
`

/* Empty state */
const EmptyStateWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${backgroundColor("row")};
  border-top: solid 0.1rem ${borderColor("list")};
  margin-top: 2.2rem;

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

interface EmptyState {
  title: MessageInterface
  description?: MessageInterface
}

export const EmptyState: FunctionComponent<EmptyState> = ({
  title,
  description,
  ...rest
}) => (
  <EmptyStateWrapper {...rest}>
    <Text displayStyle={TextDisplayStyle.TertiaryHeading} message={title} />
    {description && (
      <Text
        displayStyle={TextDisplayStyle.MediumFadedLightText}
        message={description}
      />
    )}
  </EmptyStateWrapper>
)

/* Loading state */
export const LoadingState: FunctionComponent = ({ className }) => (
  <EmptyStateWrapper className={className}>
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
  ...rest
}) => (
  <SidebarWrapper
    className={className}
    show={show}
    appColorSidebarHeader={appColorSidebarHeader}
    data-testid="sidebar"
    {...rest}
  >
    <SidebarHeader>
      {headerLeft && <SidebarHeaderLeft>{headerLeft}</SidebarHeaderLeft>}
      {headerRight && <SidebarHeaderRight>{headerRight}</SidebarHeaderRight>}
      <SidebarClose onClick={onClose} data-testid="sidebar-close">
        <SidebarHeaderIcon Icon={Type.Close} />
      </SidebarClose>
    </SidebarHeader>
    <SidebarContent padded={padded}>{children}</SidebarContent>
  </SidebarWrapper>
)

/* Table */
interface TableProps {
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
export const TableSortButton = styled.button<{ sortDirection?: SortDirection }>`
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

  transform: ${({ sortDirection }) =>
    sortDirection === SortDirection.Ascending
      ? "rotate(540deg)"
      : "rotate(360deg)"};

  &:active,
  &:focus {
    outline: 0;
  }
`

export default Table
