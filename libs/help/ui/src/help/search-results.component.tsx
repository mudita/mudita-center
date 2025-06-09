/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ComponentProps, forwardRef, Ref, FunctionComponent } from "react"
import { defineMessages, useIntl } from "react-intl"
import styled from "styled-components"
import { HelpCategory, HelpSearchResult, HelpTestId } from "help/models"
import { NavLink } from "react-router"
import { IconType } from "app-theme/models"
import { HighlightText, Icon, Typography } from "app-theme/ui"
import { cleanSearchPhrase } from "help/utils"

const messages = defineMessages({
  description: {
    id: "page.help.search.dropdown.description",
  },
  noResults: {
    id: "page.help.search.dropdown.noResults",
  },
})

interface SearchResultsProps {
  results?: HelpSearchResult
  phrase: string
  categories: Record<string, HelpCategory>
  activeResultIndex: number
  onMouseEnter: (index: number) => void
  ref?: Ref<HTMLDivElement>
}

export const SearchResults: FunctionComponent<SearchResultsProps> = ({
  results,
  phrase = "",
  ref,
  categories,
  activeResultIndex,
  onMouseEnter,
}) => {
  const intl = useIntl()
  const { highlight: cleanedHighlightPhrase } = cleanSearchPhrase(phrase)

  return (
    <SearchResultsWrapper ref={ref} data-testid={HelpTestId.SearchResults}>
      {(results?.hits.length || 0) > 0 ? (
        <>
          <ListTitle>{intl.formatMessage(messages.description)}</ListTitle>
          <ResultsList>
            {results!.hits.map((result, index) => {
              const category = categories[result.document.categoryId]
              return (
                <li key={result.id}>
                  <ListItemLink
                    to={`/help/${category.id}/${result.id}`}
                    onMouseEnter={() => onMouseEnter(index)}
                    className={activeResultIndex === index ? "active" : ""}
                    data-testid={HelpTestId.SearchResultsItem}
                  >
                    <CategoryName>{category.name}/</CategoryName>
                    <ArticleTitle>
                      <HighlightText
                        scope="all"
                        text={result.document.title}
                        phrase={cleanedHighlightPhrase}
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
          <Icon type={IconType.Search} />
          <Typography.P3>
            {intl.formatMessage(messages.noResults)}
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
  box-shadow: 0 1rem 3rem 0 rgba(0, 0, 0, 0.05);
  background: ${({ theme }) => theme.app.color.white};
  border: 0.1rem solid ${({ theme }) => theme.app.color.grey4};
  border-radius: ${({ theme }) => theme.app.radius.sm};
  overflow-y: scroll;
  max-height: 25.4rem;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    width: 0.2rem;
  }
`

const ListTitle = styled.p`
  font-size: ${({ theme }) => theme.app.fontSize.labelText};
  line-height: ${({ theme }) => theme.app.lineHeight.labelText};
  letter-spacing: 0.04em;
  color: ${({ theme }) => theme.app.color.grey3};
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
  text-decoration: none;

  &.active {
    background: ${({ theme }) => theme.app.color.grey5};
  }
`

const CategoryName = styled(Typography.P3)`
  color: ${({ theme }) => theme.app.color.grey2};
  white-space: nowrap;
`

const ArticleTitle = styled(Typography.P3)`
  color: ${({ theme }) => theme.app.color.black};
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  white-space: nowrap;

  strong {
    font-weight: ${({ theme }) => theme.app.fontWeight.bold};
  }
`

const EmptyResults = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.app.space.xl};

  > div {
    width: 4.8rem;
    height: 4.8rem;
    margin: 1rem;
  }

  svg * {
    fill: ${({ theme }) => theme.app.color.black};
  }

  p {
    color: ${({ theme }) => theme.app.color.black};
  }
`
