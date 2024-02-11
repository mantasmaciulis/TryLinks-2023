import {LanguageSupport} from "@codemirror/language"
import { linksLanguage } from "./linksLRLanguage"

export function linksLanguageSupport() {
  return new LanguageSupport(linksLanguage, [])
}