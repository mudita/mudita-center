/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, {
  Children,
  cloneElement,
  isValidElement,
  ReactElement,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react"
import { defineMessages } from "react-intl"
import styled from "styled-components"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { APIFC, IconType } from "generic-view/utils"
import { Icon } from "../../../icon/icon"
import { Typography } from "../../../typography"
import {
  FormSearchInputResultsConfig,
  FormSearchInputResultsData,
} from "generic-view/models"

const messages = defineMessages({
  noResults: {
    id: "component.searchResults.noResults",
  },
})

export interface SearchResults {
  scrollToPreviousItem: VoidFunction
  scrollToNextItem: VoidFunction
  activateCurrentItem: VoidFunction
}

export const SearchResults: APIFC<
  FormSearchInputResultsData,
  FormSearchInputResultsConfig
> = ({ data, config, children, componentRef }) => {
  const [activeItemId, setActiveItemId] = useState<string>()
  const listRef = useRef<HTMLUListElement>(null)
  const keyboardNavigationRef = useRef(false)

  const handleMouseEnter = useCallback((itemId: string) => {
    if (!keyboardNavigationRef.current) {
      setActiveItemId(itemId)
    }
    keyboardNavigationRef.current = false
  }, [])

  const scrollToActiveItem = useCallback(() => {
    if (!keyboardNavigationRef.current) {
      return
    }
    const activeElement = listRef.current?.querySelector(`li.active`)
    if (activeElement) {
      activeElement.scrollIntoView({
        block: "nearest",
      })
    }
  }, [])

  const scrollToNextItem = useCallback(() => {
    if (!data) return
    keyboardNavigationRef.current = true
    const index = Math.max(activeItemId ? data.indexOf(activeItemId) : 0, 0)
    const nextIndex = !activeItemId ? 0 : index + 1
    if (nextIndex < data.length) {
      setActiveItemId(data?.[nextIndex])
    }
  }, [activeItemId, data])

  const scrollToPreviousItem = useCallback(() => {
    if (!data) return
    keyboardNavigationRef.current = true
    const index = Math.max(activeItemId ? data.indexOf(activeItemId) : 0, 0)
    const previousIndex = !activeItemId ? 0 : index - 1
    if (previousIndex >= 0) {
      setActiveItemId(data?.[previousIndex])
    }
  }, [activeItemId, data])

  const activateCurrentItem = useCallback(() => {
    const activeElement = listRef.current?.querySelector(`li.active`)
    const buttonElement = activeElement?.querySelector("[role=button]")

    if (buttonElement && buttonElement instanceof HTMLElement) {
      buttonElement.click()
    }
  }, [])

  useEffect(() => {
    scrollToActiveItem()
  }, [activeItemId, scrollToActiveItem])

  useEffect(() => {
    setActiveItemId(undefined)
  }, [data])

  useImperativeHandle(
    componentRef,
    () => {
      return {
        scrollToPreviousItem,
        scrollToNextItem,
        activateCurrentItem,
      }
    },
    [activateCurrentItem, scrollToNextItem, scrollToPreviousItem]
  )

  if (!data) return null

  return (
    <SearchResultsWrapper style={{ maxHeight: config?.maxHeight }}>
      {(data.length || 0) > 0 ? (
        <ResultsList ref={listRef}>
          {data.map((itemId) => {
            const onMouseEnter = () => handleMouseEnter(itemId)
            const isActive = itemId === activeItemId
            return (
              <ListItem
                key={itemId}
                onMouseEnter={onMouseEnter}
                className={isActive ? "active" : ""}
              >
                {Children.map(children, (child) => {
                  if (isValidElement(child)) {
                    return cloneElement(child as ReactElement, {
                      dataItemId: itemId,
                    })
                  }
                  return null
                })}
              </ListItem>
            )
          })}
        </ResultsList>
      ) : (
        <EmptyResults>
          <Icon config={{ type: IconType.Search }} />
          <Typography.P3 config={undefined}>
            {config?.noResultsMessage || intl.formatMessage(messages.noResults)}
          </Typography.P3>
        </EmptyResults>
      )}
    </SearchResultsWrapper>
  )
}

export const SearchResultsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: absolute;
  z-index: 1;
  top: 100%;
  box-shadow: 0 1rem 5rem 0 rgba(0, 0, 0, 0.08);
  background: ${({ theme }) => theme.color.white};
  border: 0.1rem solid ${({ theme }) => theme.color.grey4};
  border-radius: ${({ theme }) => theme.radius.sm};
  overflow-y: scroll;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    width: 0.2rem;
  }
`

const ResultsList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  scroll-behavior: smooth;
`

const ListItem = styled.li`
  cursor: pointer;
  transition: background 0.2s ease-in-out;

  &.active {
    background: ${({ theme }) => theme.color.grey5};
  }
`

const EmptyResults = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.space.lg};
  padding-bottom: ${({ theme }) => theme.space.xl};

  > div {
    width: 4.4rem;
    height: 4.4rem;
  }
  svg * {
    fill: ${({ theme }) => theme.color.black};
  }

  p {
    color: ${({ theme }) => theme.color.black};
  }
`
