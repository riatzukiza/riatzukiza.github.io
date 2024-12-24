I have implemented many macros that in some cases have been copied, or implemented differently, that share the same name. Some times this causes issues at run time. For instance, the `remember` macro was implemented in a way that did not maintain the same `this` as the surrounding closure and broke my code in a few cases where I depended on that behavior at random when that version got read in after or instead of the version that does maintain the "this" binding of the surrounding closure.

This issue is related to [kanban/tasks/Move all outside work into the portfolio git](Move%20all%20outside%20work%20into%20the%20portfolio%20git.md) and [Remove duplicate code included in headers.](Remove%20duplicate%20code%20included%20in%20headers..md)

#subtask #consolidation #kitframework 

## Blocked by

- [[move kit core]]
- [[move kit fs]]
- [[move kit repl]]
- [[move kit html]]
- [[move kit shell]]
- [[move kit http]]



Here are the tags for the selected text in the format #hashtag:

#duplicate
#rejected
#[[Epic]]
#kanban
#tasks
#portfolio
#git
#rewrite
#andylib
#lisp
#macros
#codeduplication
#refactoring
#refactor
#move
#outsidework
#workinprogress
