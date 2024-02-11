import {LRLanguage} from "@codemirror/language"
import { parser } from "../dist/index"
export const linksLanguage = LRLanguage.define({
  parser: parser,
  languageData: {
    commentTokens: {line: ";"}
  }
})
