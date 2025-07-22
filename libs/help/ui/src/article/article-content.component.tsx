/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import styled from "styled-components"
import {
  documentToReactComponents,
  Options,
} from "@contentful/rich-text-react-renderer"
import { BLOCKS, Document, INLINES, MARKS } from "@contentful/rich-text-types"
import { NavLink } from "react-router"
import { HelpArticle, HelpTestId, helpPaths } from "help/models"
import { Button, Typography } from "app-theme/ui"
import { ButtonSize, ButtonTextModifier, ButtonType } from "app-theme/models"

interface ArticleContentProps {
  article: HelpArticle | undefined
}

export const ArticleContent: FunctionComponent<ArticleContentProps> = ({
  article,
}) => {
  const blocks = splitContentToBlocks(article!.content as Document)

  // TODO: will be added later
  const openContactSupportFlow = () => {
    console.log("Open Contact Support")
    // return dispatch(showModal(ModalStateKey.ContactSupportFlow))
  }

  const options: Options = {
    renderNode: {
      [BLOCKS.HEADING_1]: (_, children) => (
        <Heading data-testid={HelpTestId.ArticleContentBlockTitle}>
          {children}
        </Heading>
      ),
      [BLOCKS.PARAGRAPH]: (_, children) => (
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
              to={`${helpPaths.index}/${categoryId}/${articleId}`}
              data-testid={HelpTestId.ArticleContentBlockInternalLink}
            >
              {children}
            </NavLink>
          )
        }
        return (
          <Button
            onClick={openContactSupportFlow}
            type={ButtonType.Text}
            size={ButtonSize.AutoMin}
            modifiers={[ButtonTextModifier.Link, ButtonTextModifier.Inline]}
          >
            {children}
          </Button>
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
  background-color: ${({ theme }) => theme.app.color.white};
  padding: 3.2rem;
  width: 52.8rem;

  strong {
    font-weight: ${({ theme }) => theme.app.fontWeight.bold};
  }

  p {
    & + p {
      margin-top: 1em;
    }
  }

  a,
  button {
    color: ${({ theme }) => theme.app.color.blue1};
    text-decoration: none;

    &:hover {
      color: ${({ theme }) => theme.app.color.blue1};
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
    &::marker {
      color: ${({ theme }) => theme.app.color.black};
      font-size: ${({ theme }) => theme.app.fontSize.paragraph3};
    }

    p {
      display: -webkit-inline-box;
      margin-left: 0.4rem;
    }
  }
`

const Heading = styled.h2`
  font-size: 1.8rem;
  font-weight: ${({ theme }) => theme.app.fontWeight.bold};
  line-height: 2.4rem;
  letter-spacing: 0.02em;
  margin: 0 0 1.4rem;
`

const Paragraph = styled(Typography.P3)`
  color: ${({ theme }) => theme.app.color.black};
`
