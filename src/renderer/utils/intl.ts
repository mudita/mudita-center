import { createIntl } from "react-intl"
import { LANGUAGE } from "Renderer/constants/languages"
import localeEn from "Renderer/locales/main/en-US.json"

export const intl = createIntl({
  locale: LANGUAGE.default,
  messages: localeEn,
})
