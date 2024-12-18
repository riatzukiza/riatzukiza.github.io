To put the full depth of my work on this lisp framework into view in this portfolio, I want to move the code I wrote in all of the kit framework into this portfolio. This way it is easier for future employers to see exactly how much work went into making this entire framework function the way it does. The work meant for [[Remove duplicate code included in headers.]] and [[Cull duplicate macros]] will be tracked in this issue. May as well call it an epic, it could be a lot of work to move *everything* into here. 

The dev code that watches, compiles, bundles, and serves the website would have a difficult time accessing the code that is in the #shared and #client modules, as browserify currently does some extra work parsing a namespacing system ie "@shared/data-structures/lists.js" refers to the code in [[shared/data-structures/list.js|list]] and everything in that folder uses that "@shared" prefix.

## Tasks

- [ ] [[Cull duplicate macros]]
- [ ] [[Remove duplicate code included in headers.]]
- [ ] [[Rewrite andy lib in lisp]]

#epic
