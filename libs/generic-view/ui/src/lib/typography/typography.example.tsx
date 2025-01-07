/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import Typography from "./typography"

const TypographyP3ModifiersExamples = [
  {
    render: () => (
      <Typography
        componentName="typography.p3"
        config={{ text: "P3 Single Line Example", singleLine: true }}
      />
    ),
  },
  {
    render: () => (
      <Typography
        componentName="typography.p3"
        config={{
          text: "P3 Capitalize Example",
          textTransform: "capitalize",
        }}
      />
    ),
  },
  {
    render: () => (
      <Typography
        componentName="typography.p3"
        config={{
          text: "P3 Uppercase Example",
          textTransform: "uppercase",
        }}
      />
    ),
  },
  {
    render: () => (
      <Typography
        componentName="typography.p3"
        config={{
          text: "P3 Lowercase Example",
          textTransform: "lowercase",
        }}
      />
    ),
  },
  {
    render: () => (
      <Typography
        componentName="typography.p3"
        config={{
          text: "P3 First Letter Capitalized Example",
          textTransform: "capitalize-first-letter",
        }}
      />
    ),
  },
  {
    render: () => (
      <Typography
        componentName="typography.p3"
        config={{
          text: "100",
          textTransform: "format-bytes",
          textTransformOptions: { minUnit: "KB" },
        }}
      />
    ),
  },
  {
    render: () => (
      <Typography
        componentName="typography.p3"
        config={{
          text: "P3 Right Align Example",
          textAlign: "right",
        }}
      />
    ),
  },
  {
    render: () => (
      <Typography
        componentName="typography.p3"
        config={{
          text: "P3 Center Align Example",
          textAlign: "center",
        }}
      />
    ),
  },
  {
    render: () => (
      <Typography
        componentName="typography.p3"
        config={{
          text: "P3 Unbold Example",
          unbold: true,
        }}
      />
    ),
  },
  {
    render: () => (
      <Typography
        componentName="typography.p3"
        config={{
          text: "P3 Custom Color Example",
          color: "red1",
        }}
      />
    ),
  },
]

export const TypographyExamples = [
  {
    render: () => (
      <Typography
        componentName="typography.h3"
        config={{ text: "Base Header 3 Example" }}
      />
    ),
  },
  {
    render: () => (
      <Typography
        componentName="typography.h4"
        config={{ text: "Base Header 4 Example" }}
      />
    ),
  },
  {
    render: () => (
      <Typography
        componentName="typography.h5"
        config={{ text: "Base Header 5 Example" }}
      />
    ),
  },
  {
    render: () => (
      <Typography
        componentName="typography.p1"
        config={{ text: "Base Paragraph 1 Example" }}
      />
    ),
  },
  {
    render: () => (
      <Typography
        componentName="typography.p2"
        config={{ text: "Base Paragraph 2 Example" }}
      />
    ),
  },
  {
    render: () => (
      <Typography
        componentName="typography.p3"
        config={{ text: "Base Paragraph 3 Example" }}
      />
    ),
  },
  {
    render: () => (
      <Typography
        componentName="typography.p4"
        config={{ text: "Base Paragraph 4 Example" }}
      />
    ),
  },
  {
    render: () => (
      <Typography
        componentName="typography.p5"
        config={{ text: "Base Paragraph 5 Example" }}
      />
    ),
  },
  ...TypographyP3ModifiersExamples,
]
