/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AccordionConfig } from "Libs/generic-view/models/src"
import { APIFC } from "generic-view/utils"
import React, { useRef, useState } from "react"
import styled from "styled-components"
import { ButtonPrimary } from "../../buttons/button-primary"

const accordionAnimationDuration = 300

export const Accordion: APIFC<undefined, AccordionConfig> = ({
  config,
  children,
  ...props
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [contentHeight, setContentHeight] = useState<number | null>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  // const [accordionButtonText, setAccordionButtonText] = useState(
  //   config.collapsedButtonText
  // )

  const collapseOrExpand = () => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight)
    }
    return setIsExpanded((prev) => !prev)
  }

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setAccordionButtonText(
  //       isExpanded ? config.expandedButtonText : config.collapsedButtonText
  //     )
  //   }, 300)

  //   return () => clearTimeout(timeout)
  // }, [isExpanded, config.expandedButtonText, config.collapsedButtonText])

  const accordionButtonText = isExpanded
    ? config.expandedButtonText
    : config.collapsedButtonText

  return (
    <AccordionWrapper>
      <AccordionContent
        ref={contentRef}
        $isExpanded={isExpanded}
        $contentHeight={contentHeight}
      >
        {children}
      </AccordionContent>
      <Button
        config={{
          text: accordionButtonText,
          actions: [
            {
              type: "custom",
              callback: collapseOrExpand,
            },
          ],
        }}
      />
    </AccordionWrapper>
  )
}

const AccordionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
`

const AccordionContent = styled.div<{
  $isExpanded: boolean
  $contentHeight: number | null
}>`
  max-height: ${({ $isExpanded, $contentHeight }) =>
    $isExpanded ? `${$contentHeight}px` : "0"};
  overflow: hidden;
  transition: max-height ${accordionAnimationDuration}ms ease-in-out;
`

const Button = styled(ButtonPrimary)`
  background-color: ${({ theme }) => theme.color.white};
  color: ${({ theme }) => theme.color.grey2};
  padding: 1rem;
  line-height: 2.2rem;
  text-transform: none;
  font-size: 1.4rem;
  font-weight: 400;
  height: 3.2rem !important;
  cursor: pointer;
  border-radius: unset;
  transition: 0.2s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.color.grey5};
    color: ${({ theme }) => theme.color.black};
  }
`
