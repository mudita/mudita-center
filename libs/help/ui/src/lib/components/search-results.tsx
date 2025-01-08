/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps, forwardRef, Ref } from "react"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { defineMessages } from "react-intl"
import styled from "styled-components"
import { HelpSearchResult } from "help/models"
import { useSelector } from "react-redux"
import { selectHelpCategories } from "help/store"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { NavLink } from "react-router-dom"
import { useFormContext } from "react-hook-form"
import { IconType } from "generic-view/utils"
import { HighlightText, Icon, Typography } from "generic-view/ui"
import { HelpTestId } from "../test-ids"
import { cleanSearchPhrase } from "help/feature"

const messages = defineMessages({
  description: {
    id: "module.help.search.dropdown.description",
  },
  noResults: {
    id: "module.help.search.dropdown.noResults",
  },
})

interface Props {
  results?: HelpSearchResult
  phrase: string
}

const SearchResultsFC: FunctionComponent<
  Props & { innerRef?: Ref<HTMLDivElement> }
> = ({ results, phrase = "", innerRef }) => {
  const { watch, setValue } = useFormContext()
  const categories = useSelector(selectHelpCategories)
  const { highlight: cleanedHighlightPhrase } = cleanSearchPhrase(phrase)
  const activeIndex = watch("activeResultIndex")

  const handleMouseEnter = (index: number) => {
    setValue("activeResultIndex", index)
  }

  return (
    <SearchResultsWrapper ref={innerRef} data-testid={HelpTestId.SearchResults}>
      {(results?.hits.length || 0) > 0 ? (
        <>
          <ListTitle>{intl.formatMessage(messages.description)}</ListTitle>
          <ResultsList>
            {results!.hits.map((result, index) => {
              const category = categories[result.document.categoryId]
              const onMouseEnter = () => handleMouseEnter(index)
              return (
                <li key={result.id}>
                  <ListItemLink
                    to={`/help/${category.id}/${result.id}`}
                    onMouseEnter={onMouseEnter}
                    className={activeIndex === index ? "active" : ""}
                    data-testid={HelpTestId.SearchResultsItem}
                  >
                    <CategoryName>{category.name}/</CategoryName>
                    {/*@ts-ignore*/}
                    <ArticleTitle>
                      <HighlightText
                        config={{
                          scope: "all",
                        }}
                        data={{
                          text: result.document.title,
                          phrase: cleanedHighlightPhrase,
                        }}
                      />
                    </ArticleTitle>
                  </ListItemLink>
                </li>
              )
            })}
          </ResultsList>
        </>
      ) : (
        <EmptyResults>
          <Icon config={{ type: IconType.Search }} />
          <Typography.P3>
            {intl.formatMessage(messages.noResults)}
          </Typography.P3>
        </EmptyResults>
      )}
    </SearchResultsWrapper>
  )
}

export const SearchResults = forwardRef<
  HTMLDivElement,
  ComponentProps<typeof SearchResultsFC>
>((props, ref) => <SearchResultsFC {...props} innerRef={ref} />)

export const SearchResultsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: absolute;
  box-shadow: 0 1rem 3rem 0 rgba(0, 0, 0, 0.05);
  background: ${({ theme }) => theme.color.white};
  border: 0.1rem solid ${({ theme }) => theme.color.grey4};
  border-radius: ${({ theme }) => theme.radius.sm};
  overflow-y: scroll;
  max-height: 25.4rem;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    width: 0.2rem;
  }
`

const ListTitle = styled.p`
  font-size: ${({ theme }) => theme.fontSize.labelText};
  line-height: ${({ theme }) => theme.lineHeight.labelText};
  letter-spacing: 0.04em;
  color: ${({ theme }) => theme.color.grey3};
  margin: 0;
  padding: 1.4rem 1.6rem 0.8rem;
`

const ResultsList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`

const ListItemLink = styled(NavLink)`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  padding: 1rem 1.6rem;
  transition: background 0.2s ease-in-out;

  &.active {
    background: ${({ theme }) => theme.color.grey5};
  }
`

const CategoryName = styled(Typography.P3)`
  color: ${({ theme }) => theme.color.grey2};
  white-space: nowrap;
`

const ArticleTitle = styled(Typography.P3)`
  color: ${({ theme }) => theme.color.black};
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  white-space: nowrap;

  strong {
    font-weight: ${({ theme }) => theme.fontWeight.bold};
  }
`

const EmptyResults = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.space.xl};

  > div {
    width: 4.8rem;
    height: 4.8rem;
    margin: 1rem;
  }

  svg * {
    fill: ${({ theme }) => theme.color.black};
  }

  p {
    color: ${({ theme }) => theme.color.black};
  }
`
