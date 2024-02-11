'use strict';

var lr = require('@lezer/lr');
var highlight = require('@lezer/highlight');

const highlighting = highlight.styleTags({
    // Control flow keywords
    "case default do else for if switch mutual": highlight.tags.keyword,
    "var fun": highlight.tags.definitionKeyword,
    "Field_Label": highlight.tags.definition(highlight.tags.propertyName),
    //"IDENTIFIER VARIABLE" : tags.definition(tags.variableName),
    //table keywords have a different color
    "table temporaldatabase tablekeys from database query with yields orderby": highlight.tags.special(highlight.tags.labelName),
    "server client": highlight.tags.blockComment,
    Number: highlight.tags.number,
    String: highlight.tags.string,
    //These are parameters, match variable name colors.
    "Arg_Spec/Perhaps_Exps/Typed_Expression/Logical_Expression/Unary_Expression/Postfix_Expression/Primary_Expression/Atomic_Expression/IDENTIFIER ": highlight.tags.special(highlight.tags.variableName),
    "ConsPattern/ConstructorPattern/NegativePattern/PrimaryPattern/IDENTIFIER": highlight.tags.special(highlight.tags.variableName),

    //Function Names
    "Tlfunbinding/IDENTIFIER CONSTRUCTOR Atomic_Expression/IDENTIFIER": highlight.tags.definition(highlight.tags.variableName),
    //Variable Names
    "Tl_Var_Binding/Var/VARIABLE ": highlight.tags.special(highlight.tags.variableName),
    "PrimitiveType": highlight.tags.definition(highlight.tags.labelName),
    "LineComment": highlight.tags.lineComment,
});

// This file was generated by lezer-generator. You probably shouldn't edit it.
const spec_IDENTIFIER = {__proto__:null,mutual:12, fun:22, true:44, false:46, mu:76, forall:80, server:130, client:132, var:138, switch:142, case:144, receive:146, if:150, else:152, insert:156, values:158, returning:166, with:210, query:218, database:228, delete:238, where:242, formlet:246, yields:248, page:250, for:254, orderby:264, table:268, readonly:270, default:272, tablekeys:274, from:276, sig:282, typename:286};
const spec_TypeName = {__proto__:null,Bool:128, Char:128, Int:128, Float:128, XmlItem:128, String:128, DateTime:128};
const parser = lr.LRParser.deserialize({
  version: 14,
  states: "!=YQYQPOOOOQO'#F|'#F|O$|QPO'#EZOOQO'#EY'#EYO%TQPO'#E^O%YQQO'#E^OOQO'#EX'#EXO%kQPO'#EXO%rQPO'#EXOOQO'#EW'#EWO%wQSO'#EUO'RQSO'#EqO(SQPO'#EUOOQO'#EU'#EUO)uQSO'#GgOOQO'#ET'#ETO*qQSO'#ESOOQO'#Eu'#EuOOQO'#Ge'#GeO*{QPO'#F]O-TQPO'#DqOOQO'#Ce'#CeO-[QPO'#CeO-aQPO'#FcOOQO'#Cd'#CdQYQPOOOOQO'#C_'#C_QOQPOOO-fQPO'#DtO-kQPO'#DtO-pQPO'#DxO-uQPO'#EWO-}QPO'#D{O/qQPO'#D{O0VQPO'#EvO#QQPO'#EzO#QQPO'#EzO0[QPO'#FOO-}QPO'#FVO0aQSO'#F^O0fQPO'#F`O0aQSO'#FdO0kQPO'#C`O0pQPO'#E]O0xQPO'#GiOOQO,5:u,5:uO1TQPO,5:uOOQO'#E]'#E]O1YQSO,5:xO1hQPO'#DqO#YQPO'#EjO3ZQQO,5:xOOQO'#Ef'#EfO3bQPO,5:xOOQO'#E['#E[O3gQPO,5:sO4^QPO'#CiOOQO'#Fe'#FeO4eQPO'#ChO4sQPO,5:sO5OQPO'#EoO5VQPO'#EpOOQO,5:r,5:rO5wQPO,5:rOOQO,5;],5;]OOQO,5:p,5:pO(SQPO,5=RO(SQPO,5:oO6SQPO,5;}OOQO'#F]'#F]O6XQPO'#GaO6dQPO'#GdOOQO'#Gc'#GcOOQO'#Gb'#GbO+TQPO'#GaOOQO'#Dr'#DrO6iQPO,5:]O6nQPO'#GdO7`QPO'#HTO7eQPO'#E]O7mQPO'#GdOOQO,59P,59PO7rQPO'#CfOOQO,5;},5;}OOQO,58y,58yO#YQPO,5:`O7wQPO,5:`O#YQPO,5:dO8PQPO,5:rO#YQPO,5:rO8UQWO'#EUO8lQWO'#EqO9SQWO'#GgO9yQWO'#ESO:gQPO,5:gO/qQPO,5:gO3lQPO,5;bO:lQPO,5;fOOQO,5;f,5;fO3lQPO,5;jO:qQPO,5;qOOQO'#Eb'#EbO:vQSO,5;xO:{QSO,5;zO;TQWO,5<OO;`QPO,58zO%rQPO,59QO#YQPO'#FoO;nQPO,5=TOOQO1G0a1G0aOOQO'#Ea'#EaO;yQSO'#E`OOQO'#Fp'#FpO<OQSO'#E_O<^QSO1G0dO<iQ`O,5;RO<}Q`O'#EUO>OQ`O'#EqO>vQ`O'#GgO?kQPO,5;UO?pQPO1G0dOOQO1G0d1G0dOOQO1G0_1G0_O@aQWO'#CuOOQO'#Co'#CoO@qQPO'#CoOOQO'#Cn'#CnO@xQPO'#CnOOQO'#Cm'#CmOAfQ`O'#CmOBPQ`O'#ClOBwQ`O'#CkOClQSO'#CjOOQO,59T,59TODQQPO,59TOOQO-E9c-E9cO8PQPO1G0_OOQO'#G`'#G`ODYQPO,5;ZOOQO'#DR'#DROEPQPO'#DOOOQO'#DQ'#DQOE{QpO'#DPOF`QWO'#DlOOQO'#Dj'#DjOOQO'#Dl'#DlOFqQPO'#DkOFvQpO'#DOOGRQPO'#DOOOQO'#DO'#DOOG]QPO'#DOOGgQPO,5;[OGlQPO'#DTOGqQPO'#DROOQO'#D`'#D`OOQO'#D_'#D_OOQO1G0^1G0^OOQO1G2m1G2mOOQO1G0Z1G0ZOOQO1G1i1G1iOOQO,5=O,5=OOGvQPO,5<{OOQO,5<|,5<|OOQO1G/w1G/wOHRQ!bO'#CmOH]Q!bO'#ClOHtQ!bO'#CkOIYQSO,5=OOI_QPO,5=oO%rQPO,5=OOJzQPO,5=OOKPQPO1G/zOOQO'#Fl'#FlOKUQPO1G/zO3lQPO'#GfOOQO1G/z1G/zOK^QPO1G0OOKcQPO1G0^OKkQPO1G0ROKsQPO'#EsOOQO1G0R1G0ROLmQSO1G0|O#YQPO1G1QOLuQSO'#FSOOQO'#FR'#FROMTQPO'#FQOM]QPO1G1UOGRQPO1G1]OGRQPO1G1dOGlQPO'#HSOMbQSO1G1fOMgQSO1G1jOOQO'#Cc'#CcOMlQPO1G.fO4sQPO1G.lOOQO,5<Z,5<ZOOQO-E9m-E9mOM}QPO,5:zOOQO-E9n-E9nOOQO7+&O7+&OONSQSO7+&OON[Q#tO7+&OO3lQPO1G0mONcQPO1G0nOOQO1G0p1G0pO! VQ!bO'#CzO! ^Q!bO'#CzOOQO'#Cy'#CyO! rQPO'#CwO! wQSO'#CwO! |QpO'#CvOOQO,59a,59aO!!XQPO,59aO!!aQpO,59aO!!iQPO'#CtOOQO,59Z,59ZO!!tQPO,59ZOOQO,59Y,59YO!!yQPO,59YOOQO,59X,59XO3lQPO,59WO!#OQPO,59VO!#TQPO,59UO3lQPO'#FfO!#lQPO1G.oOOQO1G.o1G.oOOQO7+%y7+%yOOQO1G0u1G0uO!#tQSO'#DYO!#|QPO'#DYO!$UQPO,59sOGRQPO,59sO!$ZQPO,59vOGRQPO,59vO!$`QPO'#DYO!$`QPO'#GYOOQO,59k,59kO!$hQSO'#D`O!$yQSO'#D`O!%XQSO'#D^O!%dQpO'#D]O!%oQPO'#D]O!%zQPO,59jO!&PQPO,59kOGRQPO,59|O!&UQPO,59|OOQO,5:W,5:WO5VQPO'#FkO!&ZQPO,5:VO!&fQpO'#DhO!&zQpO'#DgO!'VQPO'#DgOOQO'#Df'#DfO!'bQPO,59jO!'gQPO,59jO5VQPO,59jOOQO1G0v1G0vOOQO'#DW'#DWO!'lQPO'#DVO!'qQPO,59oO!'vQPO,59mO#YQPO1G2jOOQO'#Fb'#FbO!'{QPO1G3ZO4sQPO1G2jO%rQPO1G2jO!)kQPO7+%fOOQO-E9j-E9jOOQO7+%f7+%fO!)pQPO,5=QO-}QPO7+%jOOQO@!SOO#YQPO7+%xO5wQPO7+%mO!)uQPO7+%mOOQO'#Et'#EtOOQO,5;_,5;_OOQO'#Gy'#GyO#YQPO7+&hOOQO7+&l7+&lO#YQPO,5;nO#YQPO,5=iO3lQPO'#FsO!)zQPO,5;lO!*SQPO7+&pO!+|QPO7+&wOOQO7+'O7+'OO!,XQPO,5=nOGRQPO7+'QO#YQPO7+'UOOQO,58},58}OOQO7+$Q7+$QO8PQPO7+$WO!,^QPO1G0fOOQO<<Ij<<IjON[Q#tO<<IjOOQO'#Fr'#FrON[Q#tO<<IjO!,iQPO'#ElO!,nQPO7+&XO!,sQWO7+&YOOQO,59c,59cO6nQPO,59cO!-RQWO'#FgO!-^QpO,59bOOQO1G.{1G.{O3lQPO1G.{O3lQPO1G.{O!-iQPO,59`OOQO1G.u1G.uO!-tQPO'#C|O!-|QPO1G.tOOQO1G.r1G.rOOQO1G.q1G.qOOQO1G.p1G.pOOQO,5<Q,5<QOOQO-E9d-E9dOOQO7+$Z7+$ZO!.RQPO,5<rO!.pQPO,59tOGRQPO1G/_OOQO1G/_1G/_OGRQPO1G/bOOQO1G/b1G/bOOQO'#G]'#G]OOQO,59t,59tOOQO,5<t,5<tO!.xQWO'#DbOOQO'#Da'#DaO!.RQPO'#DaOOQO,59x,59xO!%oQPO,59wO!/WQpO,59wOOQO'#Dc'#DcOOQO,59w,59wO!/fQPO'#DcOOQO1G/U1G/UOGRQPO'#FjO!/kQPO1G/VO!/sQPO1G/hOOQO1G/h1G/hOOQO,5<V,5<VOOQO-E9i-E9iOOQO,5:S,5:SO!/xQpO,5:ROOQO'#Di'#DiOOQO,5:R,5:RO!0ZQPO'#DiO!0`QPO1G/UOGlQPO'#FiO!0eQPO,59qOGRQPO1G/ZO!0pQPO1G/XO!0xQSO'#DOO!1^QPO7+(UOOQO,5;|,5;|OOQO7+(u7+(uO8PQPO7+(UO4sQPO7+(UO!1cQPO<<IQO!1kQPO1G2lO!3ZQPO<<IUO8PQPO<<IdO!3`QPO<<IdO!3eQPO'#EOO!3mQPO<<IXO!3rQWO<<IXO!4TQPO<<JSOOQO1G1Y1G1YOOQO1G3T1G3TOOQO,5<_,5<_OOQO-E9q-E9qO!4YQPO'#ExO!4_QPO<<J[O!6UQPO<<JcO5wQPO'#HPOOQO1G3Y1G3YOOQO<<Jl<<JlOOQO<<Jp<<JpOOQO<<Gr<<GrOOQO'#Ee'#EeOOQO'#Fq'#FqO!6^QPO'#EdO!6iQPO7+&QOOQO7+&Q7+&QON[Q#tOAN?UOOQOAN?UAN?UOOQO-E9p-E9pO!6nQQO,5;WOOQO<<Is<<IsOOQO<<It<<ItO(SQPO<<ItOOQO1G.}1G.}O!6sQpO'#CjOOQO'#Cz'#CzOOQO,5<R,5<ROOQO-E9e-E9eO!7RQPO7+$gO!7WQPO'#FhO!7]QPO,59hOOQO7+$`7+$`O!7eQpO1G2^O!8OQpO'#DOO!8cQpO'#DOOOQO7+$y7+$yOOQO7+$|7+$|OOQO,59{,59{OOQO1G/c1G/cO!8jQPO,59}OOQO,5<U,5<UOOQO-E9h-E9hOOQO7+$q7+$qOOQO7+%S7+%SOOQO1G/m1G/mO!8oQPO,5:TOOQO7+$p7+$pOOQO,5<T,5<TOOQO-E9g-E9gOOQO7+$u7+$uOOQO7+$s7+$sOOQO<<Kp<<KpO8PQPO<<KpO!8tQPOAN>lOOQOAN>lAN>lOOQO7+(W7+(WO#YQPOAN>pOOQOAN?OAN?OO5wQPO'#FmO!8|QPO,5:jO!9UQPOAN>sO!:hQPO'#EQO!:mQSO'#EQO!:rQPO'#EPO!:wQPOAN>sO!:|QPOAN>sO!;RQPOAN?nO#YQPO,5;dO!;|QPO'#FTO#YQPOAN?vO#YQPOAN?}O-}QPOAN?}O!<RQPO,5=kOOQO-E9o-E9oOOQO<<Il<<IlOOQOG24pG24pOOQO1G0r1G0rO!<ZQSOAN?`OOQO<<HR<<HROOQO,5<S,5<SOOQO-E9f-E9fOOQO7+'x7+'xO!$`QPO7+'xO!<fQPO1G/iO!<kQPO1G/oOOQOANA[ANA[OOQOG24WG24WOOQOG24[G24[P8PQPOG24jOOQO,5<X,5<XOOQO-E9k-E9kO!<pQPOG24_OOQOG24_G24_OOQO,5:l,5:lO#YQPO,5:lO!=kQWO'#FnO!=yQPO,5:kO!>RQPOG24_O!>|QPOG24_OOQOG25YG25YO!?RQPO1G1OO#YQPO,5;oOOQOG25bG25bOOQOG25iG25iO!?WQPOG25iOOQO'#Ft'#FtO!?]QPO1G3VOOQO'#HQ'#HQOOQOG24zG24zO!?hQPO<<KdO!?mQPO7+%TO!?{QpO7+%ZPOQOLD*ULD*UO!@TQPOLD)yOOQO1G0W1G0WOOQO,5<Y,5<YOOQO-E9l-E9lO!@YQPOLD)yOOQO7+&j7+&jO!ATQPO1G1ZO#YQPOLD+TOOQO-E9r-E9rO!AYQPO7+(qO5wQPO'#FuOOQOANAOANAOO!AeQSO'#D`O!AvQSO'#DeO!BRQPO'#DdO!%oQPO'#DdO!BZQPO<<HoO!B`QPO<<HuOOQO!$'Me!$'MeO!BeQPO!$'MeOOQO7+&u7+&uOOQO!$'No!$'NoOOQO-E9s-E9sO!<RQPO,5<aOOQO,5:P,5:PO!BjQPO,5:OOOQO,5:O,5:OOOQOAN>ZAN>ZOOQOAN>aAN>aOOQO!)9CP!)9CPO!COQPO1G1{O!CaQSO'#D`OOQO1G/j1G/jONcQPO'#EUO!CoQPO'#EUONcQPO,5=RO!CoQPO,5=RONcQPO,5:oO!CoQPO,5:oO!1kQPO'#GaO-}QPO1G1QO6nQPO,59WO!DwQPO,59UO!EOQPO,59UO!.RQPO,59sO!.RQPO,59vO!.RQPO1G/_O!.RQPO1G/bOGRQPO'#DaO!.RQPO1G/ZO-}QPOAN>pO-}QPOAN?vO-}QPOAN?}O-}QPOLD+TO!EVQPO,5;fO!E[QSO'#CjO!EpQPO,59sO!EuQPO,59vO!EzQPO,59oO!FPQPO<<IUO!4_QPO<<J[O!FUQPO<<JcO!F^QPOG25iO#QQPO'#EzOGlQPO'#DTO-}QPO7+%jO!*SQPO7+&pO!+|QPO7+&wO!FcQPO1G/XO-}QPOAN>sO-}QPOAN?}O!FkQPO1G0OO!FpQPO1G1UOGRQPO1G1]O!FuQPO,59mO!FzQPO<<IXO#YQPO,5:dO3lQPO,5;jO!GPQPO,5;qO!GUQPO'#DRO5wQPO7+%mO!GZQPO'#DxO!G`QPO'#FOO-}QPO'#FVO!GeQPO1G0RO!GmQPO,5:gO-}QPO'#D{",
  stateData: "!Gy~O$lOSPOS~OTROUzOZ{OdPOePOfPOgPOoZO!gyO!ilO!kmO!mnO!ppO!y[O#aoO#fqO#krO#osO#qtO#suO#zvO$RwO$TxO$mdO$nQO$qVO$v[O%[[O%^SO%fTO~OTROZ!POdPOePOfPOgPOoZO!ilO!kmO!mnO!ppO!y[O#aoO#fqO#krO#osO#qtO#suO#zvO$mdO$nQO$qVO$v[O%[[O%^SO%fTO~O$t}O~P#YOT!QO~O#_!UO$m!RO%^SO%c!SO%fTO~O$r#OP~P#YO$n!YO~O$n!^O$q!_O$y!aO%h!`Oq!xX$j!xX$v!xX%[!xX%i!xX%j!xX%k!xX%l!xX$s!xX$t!xX$r!xX${!xX%u!xX%d!xX~O$nQOq#eX$j#eX$v#eX%[#eX%i#eX%j#eX%k#eX%l#eX$s#eX$t#eX$r#eX${#eX%u#eX%d#eX~OTROZ!POdPOePOfPOgPOoZO!y[O#aoO$mdO$nQO$qVO$v[O%[[O%^SO%fTO~O$j%ZX%k%ZX%l%ZX$s%ZX$t%ZX$r%ZX${%ZX%u%ZX%d%ZX~Oq!dO$v!dO%[!dO%i!dO%j!dO~P)WO$j!vX$s!vX$t!vX$r!vX${!vX%u!vX%d!vX~O%k!eO%l!eO~P*YO!gyOZ$PX~OTROU!pOZ!qOdPOePOfPOgPOoZO!g!oO!ilO!kmO!mnO!ppO!y[O#aoO#fqO#krO#osO#qtO#suO#zvO$RwO$TxO$mdO$nQO$qVO$v[O%[[O%^SO%fTO~O${!fP~P+TOZ!tO~O%u!uO~O$n!wO~O$m!xO~O$n!yO~O$q!{O$m#bP~OTROZ!POdPOePOfPOgPOo!}O!ilO!kmO!m-ZO!p-`O!y,XO#aoO#fqO#krO#o,wO#qtO#s-[O#z-]O$mdO$nQO$qVO$v,XO%[,XO%^SO%fTO~OTROdPOePOfPOgPO$nQO~O$n#SO~O$n#VO~O#V#XO~Oo#ZO~O$m#]O~OT#^O$n#PX~O$s#_O$t%]X$r%]X~O$t#aO~O#V#XO$m#RP%`#RP%a#RP~OU!pOZ!qOo#iO!g!oO!ilO!kmO!mnO!ppO!y,YO#aoO#fqO#krO#osO#qtO#suO#zvO$RwO$TxO$mdO$qVO$v,YO%[,YO%^SO%fTO${!fP~P/qO%g#YX~P%YO%g#mO~O$r#nO~OT#pOdPOePOfPOgPOo#uO$n#oO$o#pO$q#qO$v#sO~O$t#yO~P3lO$n!YO!c[X!d[X$m[X~O!c#}O!d#}O$m%SP~O$t#OP~P#YOT$UOo$[Ov$_Ox$^O!b$ZO$m$TO$n$SO$o$UO$q$YO%Q$XO~OT$`Oe$`Oo$`O~O%u$eO~O%u$fO${%TX!j%TX~O%u$fO~O${$iO~OT#pOdPOePOfPOgPOo$jO$n#oO$o#pO$q#qO$v#sO~O$m$nO~OT$oO$n#PX~OZ$pO~OT#^O~O!j$tO${$uO~O$mdO~O!q!xX#]!xX!n!xX!j!xX!u!xX$O!xX~P%wO!q#eX#]#eX!n#eX!j#eX!u#eX$O#eX~P'ROq,ZO$v,ZO%[,ZO%i,ZO%j,ZO!q%ZX#]%ZX!n%ZX!j%ZX!u%ZX$O%ZX~P)WO%k,]O%l,]O!q!vX#]!vX!n!vX!j!vX!u!vX$O!vX~P*YO!q$xO~O#p$|O~O#]%RO~O$x%SO~O$n%TOl%vP~O!c#}O!d#}Ol%SP~OZ!tO!gyO$RwO$TxO~O$s#_O$t%]a$r%]a~Ol%]O~O#V#XO$m#RX%`#RX%a#RX~O$mdO%`%_O%a%aO~O}%bO%b%cO%k,^O%l,^O${!vX%u!vX~O$n!^O$q!_O$y!aO%h!`Oq!xX}!xX$v!xX${!xX%[!xX%b!xX%i!xX%j!xX%k!xX%l!xX%u!xX~O$nQOq#eX}#eX$v#eX${#eX%[#eX%b#eX%i#eX%j#eX%k#eX%l#eX%u#eX~Oq,[O$v,[O%[,[O%i,[O%j,[O}%ZX${%ZX%b%ZX%k%ZX%l%ZX%u%ZX~O%d%dO~O%g%_O~OdPOePOfPOgPO$n#oO$o#pO$q#qO$v#sO~OT%fOl%hOo%eO$t%kO~P?uO$r%oO~P3lOo%qO$n%rO~O$n#oOqaX$saX$taX$waX$xaX~O%naX%oaX%paX%raX$raX}aX${aX~PAQOq%tO$s`X$t`X$w`X$x`X%n`X%o`X%p`X%r`X$r`X}`X${`X~O$w%uO$s_X$t_X$x_X%n_X%o_X%p_X%r_X$r_X}_X${_X~O$x%vO$s^X$t^X$r^X}^X${^X~O$s%wO$t%yO~O$t%{O~O$srX$rrX#mrX#}rX$OrXZrX!grX${rX%urX$trX~O}&PO$m%|O$v&SO$}&TO%O&RO~PD_Ov$_Ox$^O!b$ZO$n$SO$o$UO$q$YO%Q$XO~OT&WOe$`Oo&VO$t&UO$u&ZO~PEdOT&_O$o&_O$v&_O$x&^O${&`O~O$s&aO~Oo&cO$u&eO%R!YP~OT$UOo$[O~PEdO$n&iO}rX~PD_O$r&jO~OT&kO~OT&nO~O%u$fO${%Ta!j%Ta~OlaX$uaX~PAQOq,aOl`X$w`X$x`X$s`X$t`X$u`X~O$w%uOl_X$x_X$s_X$t_X$u_X~Ol&oO~OZ!qOoZO!g!oO!ilO!kmO!mnO!ppO!y[O#aoO#fqO#krO#osO#qtO#suO#zvO$RwO$TxO$mdO$qVO$v[O%[[O%^SO%fTO~P/qOT&sO~O$t&tO~O!j$tO${&vO~O$t&xO~O$r&yO$s&zO~O$n&{O$q&|O~O$j#hP$s#hP$t#hP$r#hP${#hP%u#hP!q#hP#]#hP%d#hP!n#hP!j#hP$O#hP~P/qO%n'PO%o'PO~O%n'TO%o'TO%p'SO%r'TO~O$s'UO$t#tX~O$t'WO~Ol'[O~Ol']O~OZ!tO!gyO$RwO$TxO${'_O~O%_'aO~O%`'bO%a'cO~O%e'fO~P%YOZ!POo!}O!y,XO#aoO$mdO$qVO$v,XO%[,XO%^SO%fTO~P/qOlnX~PAQOlnXqcX$scX$tcX$wcX$xcX~OT'iO~Ol'jO~O$s'kO$tjX$ujX~O$s'nO$t'mO~O$t'mO$u'oO~O$s%wO$rhX$thX~O$r'qO~Oo'rO~OT'uO~OT$UOo$[O!b$ZO$n$SO$o$UO$q$YO%Q$XO~O$s%wO$t'yO~O$x'zO${'{O~O}|X%O$|X~O}'|O~O%O(OO~OT(QO$o(QO~O$n&iO$m!SX$srX$v!SX$x!SX~O$m!SX$s!^X$v!SX$x!SX~O$m(TO$v(UO$x(VO~O$s(YO$u(XO$t!PX~OT(QO$n(]O$o(QO~O$t(^O~O$s(_O~O${(bO~O$s&aO$r!_a$t!_a~O$m(TO$v(UO$x(VO$u![X%R![X$t![X~O$u(fO%R!ZX$t!ZX~OT(QO$n(iO$o(QO~O%R(^O~O$r(^O~O$s(kO~O$y(mO~O$y(nO~OZ!qOoZO!g!oO!ilO!kmO!mnO!ppO!y[O#aoO#fqO#krO#osO#qtO#suO#zvO$RwO$TxO$mdO$qVO$v[O${(rO%[[O%^SO%fTO~P/qO$m(uO~O}(vO~O$n(|O~O$s'UO$t#ta~O#m)SOT#lPZ#lPd#lPe#lPf#lPg#lPo#lP!i#lP!k#lP!m#lP!p#lP!y#lP#a#lP#f#lP#k#lP#o#lP#q#lP#s#lP#x#lP#z#lP$m#lP$n#lP$q#lP$v#lP%[#lP%^#lP%f#lP~O#m)VO#}%sP$O%sP~O$t)WO~Oe)[O$mdO%_)`O~OT)dO~O${)eO~O#])gO${)fO%k,]O%l,]O~OT)jOl%hOo)jO~O$s'kO$tja$uja~O$s%wO$rha$tha~O$s)nO$tpX~O$t)pO~OT$UOo)sOv-XOx,xO!b$ZO$n$SO$o$UO$q$YO%Q$XO~O}|a%O$|a~OT&_O$o&_O$v&_O$x&^O~OT$`Oe$`Oo$`O$u&ZO~Ov)xO~O$s(_O$t){O~O${)|O~OT(QOo&cO$n(iO$o(QO$u&eO~Ov*OO~O$t*PO~O$s(kO$yya$tya~Ov$_Ox$^O~O$n&iOlrX%nrX%orX%prX%rrX~O%u*UO~O!j$tO${*XO~OU!pOZ!qOo!}O!g!oO!ilO!kmO!m-ZO!p-`O!y,XO#aoO#fqO#krO#o,wO#qtO#s-[O#z-]O$RwO$TxO$mdO$qVO$v,XO%[,XO%^SO%fTO~P/qO!n*ZO~O$r&yO~O$s*]O$t!rX~O$t*_O~OT$`Oe$`Ol*`Oo$`O$t*cO~O$t*eO~O$n*fO~O#x*gOT#wPZ#wPd#wPe#wPf#wPg#wPo#wP!i#wP!k#wP!m#wP!p#wP!y#wP#a#wP#f#wP#k#wP#o#wP#q#wP#s#wP#z#wP$m#wP$n#wP$q#wP$v#wP%[#wP%^#wP%f#wP~O#}*jO$O*iO~Oe)[O$mdO%_#WX~O%_*mO~O%a*oO~O$x,cO$s^X$t^X$u^X~O$t*qO~Oo*rO~O$s)nO$tpa~O$u*uO${*tO~O$urX${rX$srX$trX%RrX~O},dO$m%|O$v&SO$}&TO%O,eO~P!7mO$n&iO~P!7mOT*vO~OT*wO~O!j$tO${*yO~O$s*]O$t!ra~OZ!POo!}O!ilO!kmO!mnO!ppO!y,XO#aoO#fqO#krO#osO#qtO#suO#zvO$mdO$qVO$v,XO%[,XO%^SO%fTO~P/qOT+QO~Ol+RO~O$s+SO~O$r+UO~O$t+VO~O#m)SO$j#lP$s#lP$t#lP$r#lP${#lP%u#lP!q#lP#]#lP%d#lP!n#lP!j#lP$O#lP~O$n+YO~O#{+`O#|+`O~O${+aO%k!eO%l!eO~O$y+cO~O$y+dO~O!u+fO$j%XX$s%XX$t%XX$r%XX${%XX%u%XX!q%XX#]%XX%d%XX!n%XX!j%XX$O%XX~OT$`Oe$`Ol*`Oo$`O~O$s+SO$t!sa~O!u+fO$j!o!Z$s!o!Z$t!o!Z$r!o!Z${!o!Z%u!o!Z!q!o!Z#]!o!Z%d!o!Z!n!o!Z!j!o!Z$O!o!Z~O$r+jO~O$t+kO~O$O+mO~O#{+`O#|+`O$s+pO~O${+qO~OT$`Oe$`Oo+rO$s+uO~Oo&cO$u&eO~OT+xO~O!u+yO$j!o!c$s!o!c$t!o!c$r!o!c${!o!c%u!o!c!q!o!c#]!o!c%d!o!c!n!o!c!j!o!c$O!o!c~O$t+zO~O$s+pO#}%sq$O%sq~O$m!SX$s!XX$t!XX$v!SX$x!SX~O$m(TO$v(UO$x,hO~O$s,PO$t!WX~O$t,RO~O$t,SO~OT,TO~OT,VOe$`Oo+rO$n(]O$o(QO$s+uO~O#{+`O#|+`O#}$ii$O$ii$s$ii~O$m!SX$t%PX$v!SX$x!SX~OZ!POo#iO!y,YO#aoO$mdO$qVO$v,YO%[,YO%^SO%fTO~P/qOT$UO!b$ZO$n$SO$o$UO$q$YO%Q$XO~Oo(oO~P!DcOo)sO~P!DcO#p,`O~O$x,bOl^X%n^X%o^X%p^X%r^X~O},fO~O%O,gO~O$y,iO~O!n,jO~O#}-OO$O,lO~O$O,mO~Ov-XOx,xO~O$t,yO~O$t,zO~O$y,|O~O$t,}O~O#]-RO~OT-SO~O$n-UO~O$n-VO~O$n-YO$q&|O~O!q-^O~O!ao#_$lP#_~",
  goto: "!&d%xPPP%y%|PP&S&V&c&iP&r'O'V'{(a(w)])oPPPP*R*X*p*sP*y*}P+RP+U+u,h-rP.bP/O/X/a/{P/a0R0X0]0u1V1`1j1v1|2Q2T2^2c2i3W3^PPPP3e5kP5oPPP5oPP5oPP6r6x6{P7R8W9eP:y<]=k?S@j@pBOCoCrCvCzPDUDXD]DiDiPDiPDqPD{EREREWPFfFi5oFlPGoP5oPPP5oPGxHOHVH[P5oPPPPPHbHqPIQPIa&cIdImIvJQJWJ^JdJjJpJzKQKWK^KdKjKtKzLUPPPPPPL[PPPPPPPPPNPPNTPPNZPPNnN}! U! ]! f! s!$Y!$`P!%oPPPPPPPPPPPPPPP!%yPPPHVP!%|!&SP!&Y!&]RiOQjOR!viR%X#]QjOQ!viQ%W#]R'^%XXhOi#]%XWeOi#]%XR!sfQ!]WQ%Y#^Q&r$oR(t&sZ!ZW![#^$o&sQ#z!YQ$m!oQ${#SU$}#V'U-VQ%l#oS%n#q'nQ&w$tQ'g%bQ'w%wQ)h'jR)m'o`#x!Y#o#q$t%b%w'n'oQ)i'jZ,o!o#S#V'U-Vh#w!Y#S#V#o#q$t%b%w'U'n'o-VS$l!o'jT't%t,aj#v!Y#S#V#o#q$t%b%t%w'U'n'o-VV$k!o'j,aq#t!Y!o#S#V#o#q$t%b%t%w'U'j'n'o,a-Vq#r!Y!o#S#V#o#q$t%b%t%w'U'j'n'o,a-VQ%p#qR)m'np#p!Y!o#S#V#o#q$t%b%t%w'U'j'n'o,a-VV%s#u$j%eR%m#oQ%j#oR)k'kT%i#o'kT%g#o'kR's%r!Q$R!_$S$Y%R%S&P&R&^&a&i'['z'|(O(V(_(m,d,e,f,g,h,i-RV'v%v,b,cr$Q!_$S$Y%R%S&P&R&^&a&i'['|(O(_(m,h-RU$Z%v,b,c_)r'z(V,d,e,f,g,iU$V!_&a&iQ&]$SQ&h$YQ'X%RQ'Y%SS'}&P,dS(P&R,eQ(a&^Q)X'[Q)q'zS)t'|,fS)u(O,gS)v(V,hQ)y(_S*S(m,iR,{-R!Q$R!_$S$Y%R%S&P&R&^&a&i'['z'|(O(V(_(m,d,e,f,g,h,i-RT*T(n,|!V$P!_$S$Y%R%S&P&R&^&a&i'['z'|(O(V(_(m(n,d,e,f,g,h,i,|-RQ&m$^Q'Z%TR,r,xU&l$^%T,xR*Q(k!R$R!_$S$Y%R%S&P&R&^&a&i'['z'|(O(V(_(m,d,e,f,g,h,i-RQ&O$QR,p)rQ&[$SR)w(YT&Y$S(YQ$b!aS&X$S(YS(z&{-YS*a(|+SQ*k)VQ*|*]R+}+pd$a!a$S&{(Y(|)V*]+S+p-YT+s+c,PQ(W&XQ(e&cR,O+sU$V!_&a&iV(U&X&c+sQ([&ZQ)w(XQ,Q+uR,W,PQ+v+cR,W,PT+t+c,PR&g$XQ&f$XQ)}(fR+w+dV&d$X(f+dQ(h&eR)}(f!X$Z!_$S$Y%R%S%v&P&R&^&a&i'['z'|(O(V(_(m,b,c,d,e,f,g,h,i-RQ$]!_R(j&iS$W!_&iR(c&a#hXOQV[dipv!R!S!^!d!e!l!w!y!{#_$n$|%c&o&q&x&z'Q'S'T'](v)g*Z*_*f*h*i*j+R+Y+m,X,Y,Z,[,],^,_,`,j,k,l,m,y,}-O-U-]-`Q!TTY!U!T%a'c'e)aQ$b!zQ%`#fQ%z#|Q)Z'`S)['a)^Q*U(sQ*[(xQ*x*VR+e*{T!nd!R#RbOQVdipv!R!S!^!l!w!y!{#_$n$|&o&q&x&z'Q'S'T'](v*Z*_*f*h*i*j+R+Y+m,_,`,j,k,l,m,y,}-O-U-]-`Q({&{R-T-YR*d(|Q*b(|R+h+S!|bOQVdipv!R!S!^!l!w!y!{#_$n$|&o&q&x&z'Q'S'T'](v*Z*f*h*i*j+R+Y+m,_,`,j,k,l,m,y-O-U-]-`T+O*_,}![`OQVdi!S!^!l!w!y!{#_$n$|&o&q&z'Q'S'T']*Z*f*h*i+R+Y+m-Ur#Ppv&x(v*_*j,_,`,j,k,l,m,y,}-O-]-`Q#g!RQ'h%cR*p)g!b^OQVdi!S!^!d!e!l!w!y!{#_$n$|&o&q&z'Q'S'T'])g*Z*f*h*i+R+Y+m-UU!c[,X,Yx#Opv%c&x(v*_*j,Z,],_,`,j,k,l,m,y,}-O-]-`V#j!R,[,^!dYOQV[di!S!^!d!e!l!w!y!{#_$n$|&o&q&z'Q'S'T'])g*Z*f*h*i+R+Y+m-Uz!|pv%c&x(v*_*j,X,Z,],_,`,j,k,l,m,y,}-O-]-`X#h!R,Y,[,^#iXOQV[dipv!R!S!^!d!e!l!w!y!{#_$n$|%c&o&q&x&z'Q'S'T'](v)g*Z*_*f*h*i*j+R+Y+m,X,Y,Z,[,],^,_,`,j,k,l,m,y,}-O-U-]-`#hUOQV[dipv!R!S!^!d!e!l!w!y!{#_$n$|%c&o&q&x&z'Q'S'T'](v)g*Z*_*f*h*i*j+R+Y+m,X,Y,Z,[,],^,_,`,j,k,l,m,y,}-O-U-]-`Q#RqQ$y#RR&}$y#nROQV[dipqv!R!S!^!d!e!l!w!y!{#R#_$n$y$|%c&o&q&x&z'Q'S'T'](v)g*Z*_*f*h*i*j+R+Y+m,X,Y,Z,[,],^,_,`,j,k,l,m,y,}-O-U-]-`V!bZ!}#iQ!XVR$O!^#iWOQV[dipv!R!S!^!d!e!l!w!y!{#_$n$|%c&o&q&x&z'Q'S'T'](v)g*Z*_*f*h*i*j+R+Y+m,X,Y,Z,[,],^,_,`,j,k,l,m,y,}-O-U-]-`#hUOQV[dipv!R!S!^!d!e!l!w!y!{#_$n$|%c&o&q&x&z'Q'S'T'](v)g*Z*_*f*h*i*j+R+Y+m,X,Y,Z,[,],^,_,`,j,k,l,m,y,}-O-U-]-`[!UT!T%a'c'e)aQ#TsQ#UtR,n,wR#f!QT#d!Q#eT#c!Q#eQ#YwQ#[yT#b!Q#eR)_'aT)]'a)^Q!VTQ#l!TX'd%a'c'e)a]!UT!T%a'c'e)aQ'b%aS)b'c'eR*n)aQ!zoR(x&yV!`Y!|#h#i]OQV[dipv!R!S!^!d!e!l!w!y!{#_$n$|%c&o&q&x&z'Q'S'T'](v)g*Z*_*f*h*i*j+R+Y+m,X,Y,Z,[,],^,_,`,j,k,l,m,y,}-O-U-]-`R$z#RR'O$y#RaOQVdipv!R!S!^!l!w!y!{#_$n$|&o&q&x&z'Q'S'T'](v*Z*_*f*h*i*j+R+Y+m,_,`,j,k,l,m,y,}-O-U-]-`Q)T'WQ+W*eR,t,zQ%Q#VR-Q-VS%P#V-VR)Q'UV%O#V'U-VQ*h)TR,k,tWfOi#]%X_!rd!R!l$n&q(v,_WcOi#]%X_!gd!R!l$n&q(v,_WgOi#]%X_!id!R!l$n&q(v,_R&q$nWgOi#]%XR!fcW![W#^$o&sR#{![Q%x#zQ'p%nT'x%x'pQ'l%jR)l'lQ)o'rR*s)oQ(l&lR*R(lQ(`&]R)z(`Q&b$WR(d&bQ$s!xS&u$s*WR*W(uQ*^(zR*}*^Q+T*bR+i+TQ#`|R%[#`Q#e!QR%^#eQ)^'aR*l)^Q'e%aQ)a'cT)c'e)aQ'V%PR)R'VQ+_*kS+n+_,UR,U+}Q+o+_R+|+o#nROQV[dipqv!R!S!^!d!e!l!w!y!{#R#_$n$y$|%c&o&q&x&z'Q'S'T'](v)g*Z*_*f*h*i*j+R+Y+m,X,Y,Z,[,],^,_,`,j,k,l,m,y,}-O-U-]-`q#p!Y!o#S#V#o#q$t%b%t%w'U'j'n'o,a-VT%}$Q)rQ&Q$QR,q)rQ(R&SQ(S&TW(Z&Z(X+u,PS(g&e(fR+b*uQ#|!]Q%V#[Q'`%YQ(s&rR*V(tS!md!RR*Y(vS!ld!RR,_(vU!kd!R(vT$h!l,_Y!jd!R!l(v,_Q&p$nR(q&qSkOiW|QV!^+YU!hd!R(vS!i$n&qQ#QpQ#WvQ#k!SS$g!l,_Q$q!wQ$v!yQ$w!{Q%Z#_S'R$|,`Q(p&oQ(w&xQ(y&zQ(}'QQ)O'SQ)P'TQ)Y']S*z*Z,jS+P*_,}Q+X*fS+Z*h,kS+[*i,lQ+]*jQ+g+RS+{+m,mQ,s,yQ,v-OQ-P-UQ-W-]R-_-`X$r!x$s(u*W#U_OQVdipv!R!S!^!l!w!y!{#_$n$|%c&o&q&x&z'Q'S'T'](v)g*Z*_*f*h*i*j+R+Y+m,_,`,j,k,l,m,y,}-O-U-]-`U$c!d,Z,[V$d!e,],^Q!OQS!WV!^R+l+YR'Q${Q)U'XR,u,{X+^*k+_+},UR%U#ZZ!jd!R!l(v,_",
  nodeNames: "⚠ LineComment File Declarations MutualDeclBlock IDENTIFIER mutual MutualDecls Declaration FunctionDeclaration Tlfunbinding fun ArgLists MultiArgs Pattern TypedPattern ConsPattern ConstructorPattern NegativePattern PrimaryPattern Number String true false Patterns ParethesizedPattern LabelledPatterns LabelledPattern Equals RecordLabel FieldLabel CONSTRUCTOR Constructors DBLCOLON PrimaryDatatype ParenthesizedDatatypes Datatype MuDatatype mu ForallDatatype forall Varlist Typearg StraightArrow StraightArrow_prefix RARROW SquigglyArrow RFields RField Record_Label Field_Label FieldSpec Braced_Fieldspec RowVar Fields Field Vrow VFields VField VRowVar TypeVar TypeArgList TypeArg TypeName PrimitiveType server client Block Block_Contents var Case_Expression switch case receive Conditional_Expression if else Database_Expression insert values Record_Labels LabeledExps LabeledExp returning Typed_Expression Logical_Expression Unary_Expression OP Postfix_Expression Primary_Expression Atomic_Expression Parenthesized_Thing Perhaps_Exps Linearity Xml AttrList Attr Xmllid Var VARIABLE AttrVal AttrValEntry XmlContents FormletBinding FormletPlacement with PagePlacement CDATA ENDTAG query Query_Policy Arg_Spec Targ_Spec Constructor_Expression database Perhaps_DB_Driver Perhaps_DB_Args DBExpression DeleteExpression delete PerhapsWhere where FormletExpession formlet yields page IterationExpression for PerhapsGenerator Generator ListGenerator PerhapsOrderBy orderby TableExpression table readonly default tablekeys from Signatures Signature sig Typedecl typename MutualBindings NoFunDeclaration Tl_Var_Binding",
  maxTerm: 223,
  propSources: [highlighting],
  skippedNodes: [0,1,63],
  repeatNodeCount: 17,
  tokenData: "!>P~R!iOX%pX^&e^p%ppq&eqr(drs)Vst,utu.juv%pvw/]wx%pxy/jyz0Zz{0z{|2h|}3e}!O4U!O!P5t!P!Q6e!Q![7d![!]8Z!]!^9s!^!_:d!_!`<h!`!a=d!a!b%p!b!c=q!c!d>b!d!e?b!e!fCv!f!gGV!g!h>b!h!i! O!i!k>b!k!l!%e!l!u>b!u!v!&k!v!z>b!z!{!,Z!{!}>b!}#O!3P#O#P%p#P#Q!4a#Q#R!5Q#R#S!5w#S#T%p#T#U!6h#U#o!7y#o#p!:c#p#q!:p#q#r!=R#r#s!=W#s#y%p#y#z&e#z$f%p$f$g&e$g#BY%p#BY#BZ&e#BZ$IS%p$IS$I_&e$I_$I|%p$I|$JO&e$JO$JT%p$JT$JU&e$JU$KV%p$KV$KW&e$KW&FU%p&FU&FV&e&FV;'S%p;'S;=`&_<%lO%p#v%uW#_#vOv%pw!^%p!_!`%p!a#o%p#p#q%p#r;'S%p;'S;=`&_<%lO%p#v&bP;=`<%l%p~&ll#_#v$l~OX%pX^&e^p%ppq&eqv%pw!^%p!_!`%p!a#o%p#p#q%p#r#y%p#y#z&e#z$f%p$f$g&e$g#BY%p#BY#BZ&e#BZ$IS%p$IS$I_&e$I_$I|%p$I|$JO&e$JO$JT%p$JT$JU&e$JU$KV%p$KV$KW&e$KW&FU%p&FU&FV&e&FV;'S%p;'S;=`&_<%lO%p$e(mW%jl!yP#_#vOv%pw!^%p!_!`%p!a#o%p#p#q%p#r;'S%p;'S;=`&_<%lO%p$q)^_%_P#_#vOr*]rs+asv*]vw,Qw!^*]!^!_,Q!_!`*]!`!a,Q!a#o*]#o#p,Q#p#q*]#q#r,Q#r;'S*];'S;=`,o<%lO*]$q*b_#_#vOr*]rs+asv*]vw,Qw!^*]!^!_,Q!_!`*]!`!a,Q!a#o*]#o#p,Q#p#q*]#q#r,Q#r;'S*];'S;=`,o<%lO*]$q+hWey#_#vOv%pw!^%p!_!`%p!a#o%p#p#q%p#r;'S%p;'S;=`&_<%lO%py,TTOr,Qrs,ds;'S,Q;'S;=`,i<%lO,Qy,iOeyy,lP;=`<%l,Q$q,rP;=`<%l*]~,|_#_#vP~OY,uYZ%pZv,uvw-{w!^,u!^!_-{!_!`,u!`!a-{!a#o,u#o#p-{#p#q,u#q#r-{#r;'S,u;'S;=`.d<%lO,u~.QSP~OY-{Z;'S-{;'S;=`.^<%lO-{~.aP;=`<%l-{~.gP;=`<%l,u$e.sW%il!yP#_#vOv%pw!^%p!_!`%p!a#o%p#p#q%p#r;'S%p;'S;=`&_<%lO%pm/`Pvw/cm/jO%ll!yP&i/qW$n#q#_#vOv%pw!^%p!_!`%p!a#o%p#p#q%p#r;'S%p;'S;=`&_<%lO%p&i0bW$t#q#_#vOv%pw!^%p!_!`%p!a#o%p#p#q%p#r;'S%p;'S;=`&_<%lO%p#w1R[!yP#_#vOv%pwz%pz{1w{!O%p!O!P1w!P!^%p!_!`%p!a#o%p#p#q%p#r;'S%p;'S;=`&_<%lO%p#w2OW!yP#_#vOv%pw!^%p!_!`%p!a#o%p#p#q%p#r;'S%p;'S;=`&_<%lO%p#w2o[!yP#_#vOv%pw{%p{|1w|!O%p!O!P1w!P!^%p!_!`%p!a#o%p#p#q%p#r;'S%p;'S;=`&_<%lO%p&i3lW$s#q#_#vOv%pw!^%p!_!`%p!a#o%p#p#q%p#r;'S%p;'S;=`&_<%lO%p%V4]Z$v!_#_#vOv%pw!O%p!O!P5O!P!^%p!_!`%p!`!a5o!a#o%p#p#q%p#r;'S%p;'S;=`&_<%lO%p$e5VW%[m#_#vOv%pw!^%p!_!`%p!a#o%p#p#q%p#r;'S%p;'S;=`&_<%lO%p!V5tO}!V$e5{W$ym#_#vOv%pw!^%p!_!`%p!a#o%p#p#q%p#r;'S%p;'S;=`&_<%lO%p#{6lZ!yP#_#vOv%pw!O%p!O!P1w!P!^%p!_!`%p!`!a7_!a#o%p#p#q%p#r;'S%p;'S;=`&_<%lO%pS7dO%`S$P7kYdX#_#vOv%pw!Q%p!Q![7d![!^%p!_!`%p!a#o%p#p#q%p#r;'S%p;'S;=`&_<%lO%p&i8bY$x#p#_#vOv%pw![%p![!]9Q!]!^%p!_!`%p!a#o%p#p#q%p#r;'S%p;'S;=`&_<%lO%p%w9ZWq#O!yP#_#vOv%pw!^%p!_!`%p!a#o%p#p#q%p#r;'S%p;'S;=`&_<%lO%p$e9zW%um#_#vOv%pw!^%p!_!`%p!a#o%p#p#q%p#r;'S%p;'S;=`&_<%lO%p~:iT%^#wst:x}!O;T!P!Q<O!_!`<c!`!a<c~:{P!`!a;O~;TO%f~d;YR%pd}!O;c#h#i;h#j#k;sd;hO%ndd;kP}!O;nd;sO%odd;vP}!O;yd<OO%rd#w<TP%e#tst<WR<ZP!`!a<^R<cO%gRP<hO!yP%w<oYl!n#_#vOv%pw!^%p!_!`1w!`!a=_!a#o%p#p#q%p#r#s1w#s;'S%p;'S;=`&_<%lO%p`=dO%b`V=kQ%aU!yP!_!`<c!`!a<c$d=xW%hl#_#vOv%pw!^%p!_!`%p!a#o%p#p#q%p#r;'S%p;'S;=`&_<%lO%p$q>i]oy#_#vOv%pw!^%p!_!`%p!a!c%p!c!}>b!}#R%p#R#S>b#S#T%p#T#o>b#p#q%p#r;'S%p;'S;=`&_<%lO%p$q?i_oy#_#vOv%pw!^%p!_!`%p!a!c%p!c!}>b!}#R%p#R#S>b#S#T%p#T#c>b#c#d@h#d#o>b#p#q%p#r;'S%p;'S;=`&_<%lO%p$q@o_oy#_#vOv%pw!^%p!_!`%p!a!c%p!c!}>b!}#R%p#R#S>b#S#T%p#T#c>b#c#dAn#d#o>b#p#q%p#r;'S%p;'S;=`&_<%lO%p$qAu_oy#_#vOv%pw!^%p!_!`%p!a!c%p!c!}>b!}#R%p#R#S>b#S#T%p#T#`>b#`#aBt#a#o>b#p#q%p#r;'S%p;'S;=`&_<%lO%p$qB}]!aqoy#_#vOv%pw!^%p!_!`%p!a!c%p!c!}>b!}#R%p#R#S>b#S#T%p#T#o>b#p#q%p#r;'S%p;'S;=`&_<%lO%p$qC}_oy#_#vOv%pw!^%p!_!`%p!a!c%p!c!}>b!}#R%p#R#S>b#S#T%p#T#[>b#[#]D|#]#o>b#p#q%p#r;'S%p;'S;=`&_<%lO%p$qET^oy#_#vOv%pw!^%p!_!`%p!a!c%p!c!}>b!}#R%p#R#S>b#S#T%p#T#UFP#U#o>b#p#q%p#r;'S%p;'S;=`&_<%lO%p$qFW_oy#_#vOv%pw!^%p!_!`%p!a!c%p!c!}>b!}#R%p#R#S>b#S#T%p#T#f>b#f#gBt#g#o>b#p#q%p#r;'S%p;'S;=`&_<%lO%p$qG^^oy#_#vOv%pw!^%p!_!`%p!a!c%p!c!}>b!}#R%p#R#S>b#S#T%p#T#UHY#U#o>b#p#q%p#r;'S%p;'S;=`&_<%lO%p$qHa_oy#_#vOv%pw!^%p!_!`%p!a!c%p!c!}>b!}#R%p#R#S>b#S#T%p#T#h>b#h#iI`#i#o>b#p#q%p#r;'S%p;'S;=`&_<%lO%p$qIg_oy#_#vOv%pw!^%p!_!`%p!a!c%p!c!}>b!}#R%p#R#S>b#S#T%p#T#X>b#X#YJf#Y#o>b#p#q%p#r;'S%p;'S;=`&_<%lO%p$qJm_oy#_#vOv%pw!^%p!_!`%p!a!c%p!c!v>b!v!wKl!w!}>b!}#R%p#R#S>b#S#T%p#T#o>b#p#q%p#r;'S%p;'S;=`&_<%lO%p$qKs_oy#_#vOv%pw!^%p!_!`%p!a!c%p!c!}>b!}#R%p#R#S>b#S#T%p#T#]>b#]#^Lr#^#o>b#p#q%p#r;'S%p;'S;=`&_<%lO%p$qLy_oy#_#vOv%pw!^%p!_!`%p!a!c%p!c!}>b!}#R%p#R#S>b#S#T%p#T#a>b#a#bMx#b#o>b#p#q%p#r;'S%p;'S;=`&_<%lO%p$qNP_oy#_#vOv%pw!^%p!_!`%p!a!c%p!c!}>b!}#R%p#R#S>b#S#T%p#T#X>b#X#YBt#Y#o>b#p#q%p#r;'S%p;'S;=`&_<%lO%p$q! V_oy#_#vOv%pw!^%p!_!`%p!a!c%p!c!}>b!}#R%p#R#S>b#S#T%p#T#`>b#`#a!!U#a#o>b#p#q%p#r;'S%p;'S;=`&_<%lO%p$q!!]_oy#_#vOv%pw!^%p!_!`%p!a!c%p!c!}>b!}#R%p#R#S>b#S#T%p#T#c>b#c#d!#[#d#o>b#p#q%p#r;'S%p;'S;=`&_<%lO%p$q!#c^oy#_#vOv%pw!^%p!_!`%p!a!c%p!c!}>b!}#R%p#R#S>b#S#T%p#T#U!$_#U#o>b#p#q%p#r;'S%p;'S;=`&_<%lO%p$q!$f_oy#_#vOv%pw!^%p!_!`%p!a!c%p!c!}>b!}#R%p#R#S>b#S#T%p#T#h>b#h#iBt#i#o>b#p#q%p#r;'S%p;'S;=`&_<%lO%p$q!%l_oy#_#vOv%pw!^%p!_!`%p!a!c%p!c!}>b!}#R%p#R#S>b#S#T%p#T#b>b#b#c!$_#c#o>b#p#q%p#r;'S%p;'S;=`&_<%lO%p$q!&r_oy#_#vOv%pw!^%p!_!`%p!a!c%p!c!}>b!}#R%p#R#S>b#S#T%p#T#h>b#h#i!'q#i#o>b#p#q%p#r;'S%p;'S;=`&_<%lO%p$q!'x_oy#_#vOv%pw!^%p!_!`%p!a!c%p!c!}>b!}#R%p#R#S>b#S#T%p#T#f>b#f#g!(w#g#o>b#p#q%p#r;'S%p;'S;=`&_<%lO%p$q!)O_oy#_#vOv%pw!^%p!_!`%p!a!c%p!c!}>b!}#R%p#R#S>b#S#T%p#T#]>b#]#^!)}#^#o>b#p#q%p#r;'S%p;'S;=`&_<%lO%p$q!*U_oy#_#vOv%pw!^%p!_!`%p!a!c%p!c!}>b!}#R%p#R#S>b#S#T%p#T#b>b#b#c!+T#c#o>b#p#q%p#r;'S%p;'S;=`&_<%lO%p$q!+[_oy#_#vOv%pw!^%p!_!`%p!a!c%p!c!}>b!}#R%p#R#S>b#S#T%p#T#Z>b#Z#[Bt#[#o>b#p#q%p#r;'S%p;'S;=`&_<%lO%p$q!,b_oy#_#vOv%pw!^%p!_!`%p!a!c%p!c!}>b!}#R%p#R#S>b#S#T%p#T#a>b#a#b!-a#b#o>b#p#q%p#r;'S%p;'S;=`&_<%lO%p$q!-h_oy#_#vOv%pw!^%p!_!`%p!a!c%p!c!}>b!}#R%p#R#S>b#S#T%p#T#`>b#`#a!.g#a#o>b#p#q%p#r;'S%p;'S;=`&_<%lO%p$q!.n_oy#_#vOv%pw!^%p!_!`%p!a!c%p!c!k>b!k!l!/m!l!}>b!}#R%p#R#S>b#S#T%p#T#o>b#p#q%p#r;'S%p;'S;=`&_<%lO%p$q!/t_oy#_#vOv%pw!^%p!_!`%p!a!c%p!c!}>b!}#R%p#R#S>b#S#T%p#T#h>b#h#i!0s#i#o>b#p#q%p#r;'S%p;'S;=`&_<%lO%p$q!0z_oy#_#vOv%pw!^%p!_!`%p!a!c%p!c!}>b!}#R%p#R#S>b#S#T%p#T#X>b#X#Y!1y#Y#o>b#p#q%p#r;'S%p;'S;=`&_<%lO%p$q!2Q_oy#_#vOv%pw!^%p!_!`%p!a!c%p!c!}>b!}#R%p#R#S>b#S#T%p#T#a>b#a#bBt#b#o>b#p#q%p#r;'S%p;'S;=`&_<%lO%p%V!3WW$q!_#_#vOv%pw!^%p!_!`%p!a#o%p#p#q!3p#r;'S%p;'S;=`&_<%lO%p$i!3wW%Qq#_#vOv%pw!^%p!_!`%p!a#o%p#p#q%p#r;'S%p;'S;=`&_<%lO%p$e!4hW$rm#_#vOv%pw!^%p!_!`%p!a#o%p#p#q%p#r;'S%p;'S;=`&_<%lO%p#w!5XY!yP#_#vOv%pw!^%p!_!`%p!a#Q%p#Q#R1w#R#o%p#p#q%p#r;'S%p;'S;=`&_<%lO%p$q!6OW$oy#_#vOv%pw!^%p!_!`%p!a#o%p#p#q%p#r;'S%p;'S;=`&_<%lO%p&i!6qbTy#VS#_#vOv%pwx!7yx!Q%p!Q![!7y![!^%p!_!`%p!a!c%p!c!}!7y!}#R%p#R#S!7y#S#T%p#T#g!7y#g#h!9U#h#o!7y#p#q%p#r;'S%p;'S;=`&_<%lO%p$u!8S`Ty#VS#_#vOv%pwx!7yx!Q%p!Q![!7y![!^%p!_!`%p!a!c%p!c!}!7y!}#R%p#R#S!7y#S#T%p#T#o!7y#p#q%p#r;'S%p;'S;=`&_<%lO%p&i!9a`$w!rTy#VS#_#vOv%pwx!7yx!Q%p!Q![!7y![!^%p!_!`%p!a!c%p!c!}!7y!}#R%p#R#S!7y#S#T%p#T#o!7y#p#q%p#r;'S%p;'S;=`&_<%lO%p~!:hP$m~#p#q!:k~!:pO%c~&i!:wZ$u#S#_#vOv%pw!^%p!_!`%p!a#P%p#P#Q!;j#Q#o%p#p#q!<Z#q#r!<|#r;'S%p;'S;=`&_<%lO%p$i!;qW%Rq#_#vOv%pw!^%p!_!`%p!a#o%p#p#q%p#r;'S%p;'S;=`&_<%lO%p$e!<dW%kl!yP#_#vOv%pw!^%p!_!`%p!a#o%p#p#q%p#r;'S%p;'S;=`&_<%lO%p]!=RO%d]~!=WO${~$i!=_X$}q#_#vOv%pw!^%p!_!`%p!`!a!=z!a#o%p#p#q%p#r;'S%p;'S;=`&_<%lO%pq!>PO%Oq",
  tokenizers: [0, 1, 2, 3, 4, 5, 6, 7],
  topRules: {"File":[0,2]},
  specialized: [{term: 5, get: (value) => spec_IDENTIFIER[value] || -1},{term: 63, get: (value) => spec_TypeName[value] || -1}],
  tokenPrec: 3898
});

exports.parser = parser;
