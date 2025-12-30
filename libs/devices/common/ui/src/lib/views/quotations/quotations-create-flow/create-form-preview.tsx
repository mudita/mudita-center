/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, useMemo } from "react"
import styled from "styled-components"
import harmonyImg from "./harmony-preview.png"
import { glyphs } from "./glyphs"

interface Props {
  quotation?: string
  author?: string
}

const CHAR_WIDTH_FACTOR = 0.34

export const CreateFormPreview: FunctionComponent<Props> = ({
  quotation = "",
  author = "",
}) => {
  const quoteLetters = useMemo(() => {
    const lines = quotation.split("\n")

    return lines.map((line, index) => {
      return (
        <QuoteLine key={index}>
          {line
            .trim()
            .split("")
            .map((char, index) => {
              const charCode = char.charCodeAt(0)
              const width = CHAR_WIDTH_FACTOR * glyphs[charCode].light
              return (
                <Letter key={index} style={{ width }}>
                  {char}
                </Letter>
              )
            })}
        </QuoteLine>
      )
    })
  }, [quotation])

  const authorLetters = useMemo(() => {
    if (!author.trim()) {
      return null
    }
    return `-${author}`
      .trim()
      .split("")
      .map((char, index) => {
        const charCode = char.charCodeAt(0)
        const width = CHAR_WIDTH_FACTOR * glyphs[charCode].bold
        return (
          <Letter key={index} style={{ width }}>
            {char}
          </Letter>
        )
      })
  }, [author])

  return (
    <Wrapper>
      <HarmonyPreview src={harmonyImg} alt={"Harmony quotation preview"} />
      <TextPreview>
        <svg
          width="21"
          height="8"
          viewBox="0 0 21 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.19813 6.94717C6.0616 6.69148 6.77193 6.25125 7.06439 5.14352C5.89447 5.08674 4.86387 4.2062 4.68282 2.9707C4.47389 1.56464 5.42097 0.258079 6.79975 0.0308944C8.17853 -0.16794 9.66873 0.584759 10.017 2.53039C10.393 5.34235 8.37348 7.65723 5.39308 7.99812C5.28166 8.01233 5.26775 7.94127 5.26775 7.94127L5.12851 7.0608C5.12851 7.0608 5.11452 6.97559 5.19813 6.94717ZM11.4184 7.06078C11.4184 7.06078 11.4045 6.97558 11.4881 6.94715C12.3376 6.69146 13.0758 6.25123 13.3544 5.1435C12.1706 5.10094 11.154 4.22039 10.9728 2.97068C10.75 1.56462 11.6971 0.258061 13.0759 0.0308764C14.4408 -0.167958 15.9449 0.584741 16.307 2.54459C16.6552 5.35655 14.6497 7.67142 11.6693 7.9981C11.5578 8.01239 11.5439 7.94125 11.5439 7.94125L11.4184 7.06078Z"
            fill="black"
          />
        </svg>

        <Quote>{quoteLetters}</Quote>
        <Author>{authorLetters}</Author>
      </TextPreview>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
`

const HarmonyPreview = styled.img`
  display: block;
  margin: 0;
  width: 100%;
  height: auto;
`

const TextPreview = styled.div`
  position: absolute;
  top: 60%;
  left: 25%;
  width: 50%;

  display: flex;
  flex-direction: column;
  align-items: center;
  user-select: none;
`

const Quote = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 2rem;
  margin-top: 0.4rem;
`

const QuoteLine = styled.p`
  font-size: 0.95rem;
  line-height: 1rem;
  font-weight: 300;
  margin: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
`

const Author = styled.div`
  font-size: 0.95rem;
  line-height: 1rem;
  font-weight: 700;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 0.3rem;
`

const Letter = styled.span`
  display: block;
`
