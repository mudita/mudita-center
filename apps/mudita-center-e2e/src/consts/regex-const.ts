/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export const LinkRegex: RegExp =
  /^(https?:\/\/)(mudita.com\/community|forum.mudita.com\/t).*$/
export const newsImageRegex: RegExp = /(^data:image;base64)/
export const newsDateRegex: RegExp =
  /^(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)(\s{1})([1-9]|[12][0-9]|3[01])(,{1})(\s{1})([2-9][0-9][0-9][0-9])$/
export const commentsRegex: RegExp = /^(\d+)(\s{1})(COMMENTS|COMMENT)$/
