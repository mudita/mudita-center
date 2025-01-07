/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { BaseGenericComponent } from "generic-view/utils"
import { TypographyExamples } from "./typography.example"

type Example = {
  render: () => JSX.Element
}

type ExampleRendererProps = {
  examples?: Example[]
  componentName?: string
}

export const ExampleRenderer: BaseGenericComponent<
  undefined,
  undefined,
  ExampleRendererProps
> = ({ examples = TypographyExamples, componentName = "Typografia" }) => {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>{componentName} - Dokumentacja</h1>
      {examples.map((example, index) => (
        <div
          key={index}
          style={{
            marginBottom: "40px",
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <div
            style={{
              marginTop: "10px",
              padding: "10px",
              background: "#f9f9f9",
              borderRadius: "4px",
            }}
          >
            {example.render()}
          </div>
        </div>
      ))}
    </div>
  )
}
