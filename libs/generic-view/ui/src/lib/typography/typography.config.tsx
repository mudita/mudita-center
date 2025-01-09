/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { TypographyTestIds } from "e2e-test-ids"
import { TypographyKey } from "generic-view/models"
import { Theme } from "generic-view/theme"
import { ThemeProps } from "styled-components"

interface BaseTypographyConfig {
  as: React.ElementType
  ["data-testid"]: string
}

export interface TypographyStyle {
  letterSpacing: string
  defaultColor: string
  fontSize: (theme: ThemeProps<Theme>) => string
  fontHeight: (theme: ThemeProps<Theme>) => string
  fontWeight?: (theme: ThemeProps<Theme>) => string
  strongFontWeight?: (theme: ThemeProps<Theme>) => string
}

interface TypographyConfig extends TypographyStyle, BaseTypographyConfig {}

type TypographyConfigMap = {
  [key in TypographyKey]: TypographyConfig
}

export const typographyConfig: TypographyConfigMap = {
  "typography.h3": {
    as: "h3",
    ["data-testid"]: TypographyTestIds.H3,
    letterSpacing: "0.02em",
    defaultColor: "black",
    fontSize: ({ theme }) => theme.fontSize.headline3,
    fontHeight: ({ theme }) => theme.lineHeight.headline3,
    fontWeight: ({ theme }) => `${theme.fontWeight.bold}`,
  },
  "typography.h4": {
    as: "h4",
    ["data-testid"]: TypographyTestIds.H4,
    letterSpacing: "0.02em",
    defaultColor: "black",
    fontSize: ({ theme }) => theme.fontSize.headline4,
    fontHeight: ({ theme }) => theme.lineHeight.headline4,
  },
  "typography.h5": {
    as: "h5",
    ["data-testid"]: TypographyTestIds.H5,
    letterSpacing: "0.04em",
    defaultColor: "black",
    fontSize: ({ theme }) => theme.fontSize.headline5,
    fontHeight: ({ theme }) => theme.lineHeight.headline5,
    fontWeight: ({ theme }) => `${theme.fontWeight.bold}`,
  },
  "typography.p1": {
    as: "p",
    ["data-testid"]: TypographyTestIds.P1,
    letterSpacing: "0.02em",
    defaultColor: "grey2",
    fontSize: ({ theme }) => theme.fontSize.paragraph1,
    fontHeight: ({ theme }) => theme.lineHeight.paragraph1,
    fontWeight: ({ theme }) => `${theme.fontWeight.regular}`,
    strongFontWeight: ({ theme }) => `${theme.fontWeight.bold}`,
  },
  "typography.p2": {
    as: "p",
    ["data-testid"]: TypographyTestIds.P2,
    letterSpacing: "0.02em",
    defaultColor: "grey2",
    fontSize: ({ theme }) => theme.fontSize.paragraph2,
    fontHeight: ({ theme }) => theme.lineHeight.paragraph2,
    fontWeight: ({ theme }) => `${theme.fontWeight.light}`,
    strongFontWeight: ({ theme }) => `${theme.fontWeight.regular}`,
  },
  "typography.p3": {
    as: "p",
    ["data-testid"]: TypographyTestIds.P3,
    letterSpacing: "0.05em",
    defaultColor: "grey2",
    fontSize: ({ theme }) => theme.fontSize.paragraph3,
    fontHeight: ({ theme }) => theme.lineHeight.paragraph3,
    fontWeight: ({ theme }) => `${theme.fontWeight.regular}`,
    strongFontWeight: ({ theme }) => `${theme.fontWeight.bold}`,
  },
  "typography.p4": {
    as: "p",
    ["data-testid"]: TypographyTestIds.P4,
    letterSpacing: "0.02em",
    defaultColor: "grey2",
    fontSize: ({ theme }) => theme.fontSize.paragraph4,
    fontHeight: ({ theme }) => theme.lineHeight.paragraph4,
    fontWeight: ({ theme }) => `${theme.fontWeight.light}`,
    strongFontWeight: ({ theme }) => `${theme.fontWeight.bold}`,
  },
  "typography.p5": {
    as: "p",
    ["data-testid"]: TypographyTestIds.P5,
    letterSpacing: "0.04em",
    defaultColor: "grey2",
    fontSize: ({ theme }) => theme.fontSize.paragraph5,
    fontHeight: ({ theme }) => theme.lineHeight.paragraph5,
    fontWeight: ({ theme }) => `${theme.fontWeight.regular}`,
    strongFontWeight: ({ theme }) => `${theme.fontWeight.bold}`,
  },
}
