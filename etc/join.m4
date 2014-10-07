m4_divert(-1)
m4_define(`m4_join',`m4_ifelse(m4_len($1),0,,`"m4_patsubst($1,`\s+',`",
"')"')')
m4_divert(0)m4_dnl
