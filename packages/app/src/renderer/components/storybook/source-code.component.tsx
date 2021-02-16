/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import React, { useEffect, useRef, useState } from "react"
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter"
import jsx from "react-syntax-highlighter/dist/cjs/languages/prism/jsx"
import prism from "react-syntax-highlighter/dist/cjs/styles/prism/prism"
import styled, { css } from "styled-components"
import { FunctionComponent } from "Renderer/types/function-component.interface"

SyntaxHighlighter.registerLanguage("jsx", jsx)

const highlightLines = (from: number, count: number) => {
  let style = ""
  for (let i = from; i < from + count; i++) {
    style += `
      > span:nth-child(${i}) {
        background-color: #e6ffed;
        &:before {
          background-color: #cdffd8;
          border-right: solid 0.5rem #e6ffed;
        }
      }
    `
  }
  return css`
    ${style}
  `
}

const Code = styled.code<{ currentLine?: number; linesCount?: number }>`
  max-width: 65rem;
  position: sticky;
  top: 0;
  scroll-behavior: smooth;
  flex: 1;
  height: calc(100vh - 2rem);
  background-color: #fefefe;
  border-radius: 0.3rem;
  box-shadow: 0 0.2rem 2rem 0 #00000014;
  box-sizing: border-box;
  overflow: auto;

  pre {
    min-width: 60rem;
    background-color: transparent !important;
  }

  code {
    white-space: break-spaces !important;
    word-break: break-all !important;
    counter-reset: line-number;

    > span {
      position: relative;
      margin-left: 4rem;
      display: block;

      &:before {
        padding-left: 0.5rem;
        width: 3.5rem;
        position: absolute;
        display: inline-block;
        margin-left: -4rem;
        counter-increment: line-number;
        content: counter(line-number);
        color: #1b1f234d;
      }
    }

    ${({ currentLine, linesCount }) =>
      currentLine &&
      linesCount &&
      css`
        ${highlightLines(currentLine, linesCount)}
      `}
  }
`

export interface SourceCodeProps {
  currentLine?: number
  code: string
}

const SourceCode: FunctionComponent<SourceCodeProps> = ({
  currentLine = 0,
  code,
}) => {
  const codeRef = useRef<HTMLDivElement>(null)
  const [linesCount, setLinesCount] = useState(1)

  useEffect(() => {
    if (codeRef.current && code) {
      const lines = codeRef.current.querySelectorAll(`code > span`)
      const firstSelectedLine = lines[Math.max(currentLine - 1, 0)]
      let tempLinesCount = 1

      // Get indent size for the first line
      const indent = (firstSelectedLine.children[0] as HTMLSpanElement)
        .offsetWidth

      // Find first indent with smaller size than the initial one
      for (const line of Array.from(lines).slice(currentLine)) {
        const lineIndent = line.children.length
          ? (line.children[0] as HTMLSpanElement).offsetWidth
          : Infinity
        if (lineIndent >= indent) {
          tempLinesCount++
        } else {
          break
        }
      }

      setLinesCount(tempLinesCount)
      codeRef.current.scrollTop =
        (firstSelectedLine as HTMLSpanElement).offsetTop - 30
    }
  }, [code, currentLine])

  return (
    <Code currentLine={currentLine} linesCount={linesCount} ref={codeRef}>
      <SyntaxHighlighter language="jsx" style={prism} wrapLines>
        {code}
      </SyntaxHighlighter>
    </Code>
  )
}

export default SourceCode
