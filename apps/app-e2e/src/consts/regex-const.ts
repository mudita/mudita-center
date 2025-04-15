/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export const linkRegex =
  /^(https?:\/\/)(mudita.com\/community|forum.mudita.com\/t).*$/
export const newsImageRegex = /(^data:image;base64)/
export const kompaktImageRegex = /(^data:image\/png;base64)/
export const newsDateRegex =
  /^(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)(\s{1})([1-9]|[12][0-9]|3[01])(,{1})(\s{1})([2-9][0-9][0-9][0-9])$/
export const commentsRegex = /^(\d+)(\s{1})(COMMENTS|COMMENT)$/
export const kompaktImeiRegex = /^[0-9]{1,15}$/
export const nonEmptyTextRegex = /^.+/
