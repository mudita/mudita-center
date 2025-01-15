/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import styled from "styled-components"
import {
  documentToReactComponents,
  Options,
} from "@contentful/rich-text-react-renderer"
import { BLOCKS, Document, INLINES, MARKS } from "@contentful/rich-text-types"
import { NavLink } from "react-router-dom"
import { URL_MAIN } from "Core/__deprecated__/renderer/constants/urls"
import { ModalStateKey, showModal } from "Core/modals-manager"
import { useDispatch, useSelector } from "react-redux"
import { ButtonTextConfig } from "generic-view/models"
import { ButtonText, Typography } from "generic-view/ui"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { selectCurrentArticle } from "help/store"
import { useParams } from "react-router"
import { HelpTestId } from "../test-ids"

export const ArticleContent: FunctionComponent = () => {
  const { articleId } = useParams<{ articleId: string }>()
  const article = useSelector((state: ReduxRootState) =>
    selectCurrentArticle(state, articleId)
  )

  const dispatch = useDispatch()
  const blocks = splitContentToBlocks(article!.content as Document)

  const openContactSupportFlow = () => {
    return dispatch(showModal(ModalStateKey.ContactSupportFlow))
  }

  const options: Options = {
    renderNode: {
      [BLOCKS.HEADING_1]: (node, children) => (
        <Heading data-testid={HelpTestId.ArticleContentBlockTitle}>
          {children}
        </Heading>
      ),
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <Paragraph data-testid={HelpTestId.ArticleContentBlockText}>
          {children}
        </Paragraph>
      ),
      [INLINES.HYPERLINK]: (node, children) => (
        <a
          href={node.data.uri as string}
          target={"_blank"}
          rel="noreferrer"
          data-testid={HelpTestId.ArticleContentBlockExternalLink}
        >
          {children}
        </a>
      ),
      [INLINES.ENTRY_HYPERLINK]: (node, children) => {
        if (node.data.target.sys.contentType.sys.id === "helpArticle") {
          const articleId = node.data.target.sys.id
          const categoryId = article!.categoryId
          return (
            <NavLink
              to={`${URL_MAIN.help}/${categoryId}/${articleId}`}
              data-testid={HelpTestId.ArticleContentBlockInternalLink}
            >
              {children}
            </NavLink>
          )
        }
        return (
          <ButtonText
            config={
              {
                actions: [
                  {
                    type: "custom",
                    callback: openContactSupportFlow,
                  },
                ],
                modifiers: ["link", "hover-underline"],
              } as ButtonTextConfig
            }
            data-testid={HelpTestId.ArticleContentBlockContactSupportLink}
          >
            {children}
          </ButtonText>
        )
      },
    },
    renderMark: {
      [MARKS.BOLD]: (text) => <strong>{text}</strong>,
    },
  }

  return (
    <Wrapper data-testid={HelpTestId.ArticleContent}>
      {blocks.map((block, index) => (
        <Article key={index} data-testid={HelpTestId.ArticleContentBlock}>
          {documentToReactComponents(block, options)}
        </Article>
      ))}
    </Wrapper>
  )
}

const splitContentToBlocks = (content: Document) => {
  const mainNode = {
    nodeType: content.nodeType,
    data: content.data,
  }

  const blocks: Document[] = []
  let blockIndex = 0

  content.content.forEach((node) => {
    if (node.nodeType === "hr") {
      blockIndex++
      return
    }
    if (!blocks[blockIndex]) {
      blocks[blockIndex] = { ...mainNode, content: [node] }
    } else {
      blocks[blockIndex].content.push(node)
    }
  })

  return blocks
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`

const Article = styled.article`
  background-color: ${({ theme }) => theme.color.white};
  padding: 3.2rem;
  width: 52.8rem;

  strong {
    font-weight: ${({ theme }) => theme.fontWeight.bold};
  }

  p {
    & + p {
      margin-top: 1em;
    }
  }

  a,
  button {
    color: ${({ theme }) => theme.color.blue1};
    text-decoration: none;

    &:hover {
      color: ${({ theme }) => theme.color.blue1};
      text-decoration: underline;
    }
  }

  ol {
    list-style-type: decimal;

    ol {
      list-style-type: lower-alpha;

      ol {
        list-style-type: lower-roman;
      }
    }
  }

  ol,
  ul {
    margin: 0 0 1em;
    padding-left: 1.8rem;
    ol,
    ul {
      padding-left: 2.5rem;
    }
  }

  li {
    ::marker {
      color: ${({ theme }) => theme.color.black};
      font-size: ${({ theme }) => theme.fontSize.paragraph3};
    }

    p {
      display: -webkit-inline-box;
      margin-left: 0.4rem;
    }
  }
`

const Heading = styled.h2`
  font-size: 1.8rem;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  line-height: 2.4rem;
  letter-spacing: 0.02em;
  margin: 0 0 1.4rem;
`

const Paragraph = styled(Typography.P3)`
  color: ${({ theme }) => theme.color.black};
`
