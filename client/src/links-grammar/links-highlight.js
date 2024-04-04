import {styleTags, tags} from "@lezer/highlight"

export const highlighting = styleTags({
    // Control flow keywords
    "case default do else for if switch mutual": tags.keyword,
    "var fun": tags.definitionKeyword,
    "Field_Label": tags.definition(tags.propertyName),
    //table keywords have a different color
    "table temporaldatabase tablekeys from database query with yields orderby": tags.special(tags.labelName),
    "server client": tags.blockComment,
    Number: tags.number,
    String: tags.string,
    //Parameters
    "Arg_Spec/Perhaps_Exps/Typed_Expression/Logical_Expression/Unary_Expression/Postfix_Expression/Primary_Expression/Atomic_Expression/IDENTIFIER ": tags.special(tags.variableName),
    "ConsPattern/ConstructorPattern/NegativePattern/PrimaryPattern/IDENTIFIER": tags.special(tags.variableName),
    //Function Names
    "Tlfunbinding/IDENTIFIER CONSTRUCTOR Atomic_Expression/IDENTIFIER": tags.definition(tags.variableName),
    //Variable Names
    "Tl_Var_Binding/Var/VARIABLE ": tags.special(tags.variableName),
    "PrimitiveType": tags.definition(tags.labelName),
    "LineComment": tags.lineComment,
})