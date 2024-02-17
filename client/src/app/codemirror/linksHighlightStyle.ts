// This file works with the Links Parser. After the links
// parser has parsed the links code, and attached the corresponding
// tags to the words/tokens. This highlighter defines a custom way
// to color these tags, and it one of the extensions passed into 
// EditorState from @codemirror/state.

import { HighlightStyle } from "@codemirror/language";
import { tags } from "@lezer/highlight";

export const linksHighlightStyle = /*@__PURE__*/HighlightStyle.define([
  { tag: tags.meta, color: "#404740" },
  { tag: tags.link, textDecoration: "underline" },
  { tag: tags.heading, textDecoration: "underline", fontWeight: "bold" },
  { tag: tags.emphasis, fontStyle: "italic" },
  { tag: tags.strong, fontWeight: "bold" },
  { tag: tags.strikethrough, textDecoration: "line-through" },
  { tag: tags.keyword, color: "#7AA6DA" },
  { tag: [tags.atom, tags.bool, tags.url, tags.contentSeparator, tags.labelName], color: "#219" },
  { tag: [tags.literal, tags.inserted], color: "#164" },
  { tag: [tags.string, tags.deleted], color: "#98C379" },
  { tag: [tags.regexp, tags.escape, /*@__PURE__*/tags.special(tags.string)], color: "#e40" },
  { tag: /*@__PURE__*/tags.definition(tags.variableName), color: "#ede87e" },
  { tag: /*@__PURE__*/tags.definition(tags.labelName), color: "#4EC9B0" },
  { tag: /*@__PURE__*/tags.local(tags.variableName), color: "#30a" },
  { tag: [tags.typeName, tags.namespace], color: "#085" },
  { tag: tags.className, color: "#167" },
  { tag: [/*@__PURE__*/tags.special(tags.variableName), tags.macroName], color: "#96faff" },
  { tag: /*@__PURE__*/tags.definition(tags.propertyName), color: "#00c" },
  { tag: tags.comment, color: "#940" },
  { tag: tags.invalid, color: "#f00" },
  { tag: [/*@__PURE__*/tags.special(tags.labelName)], color: "#C678DD" }
]);
