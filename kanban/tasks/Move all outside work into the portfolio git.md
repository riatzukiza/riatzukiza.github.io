To put the full depth of my work on this lisp framework into view in this portfolio, I want to move the code I wrote in all of the kit framework into this portfolio. This way it is easier for future employers to see exactly how much work went into making this entire framework function the way it does. The work meant for [Remove duplicate code included in headers.](Remove%20duplicate%20code%20included%20in%20headers..md) and [Cull duplicate macros](Cull%20duplicate%20macros.md) will be tracked in this issue. May as well call it an epic, it could be a lot of work to move *everything* into here. 

# Epic: Move Kit Framework to Portfolio

## Tasks

* [Cull duplicate macros](Cull%20duplicate%20macros.md)
* [Remove duplicate code included in headers.](Remove%20duplicate%20code%20included%20in%20headers..md)
* [Rewrite andy lib in lisp](Rewrite%20andy%20lib%20in%20lisp.md)

## Context:
[Cull duplicate macros](Cull%20duplicate%20macros.md), I have implemented many macros that share the same name, causing issues at runtime. For instance, the `remember` macro was implemented differently, which broke my code in some cases.

This issue is related to [kanban/tasks/Move all outside work into the portfolio git](Move%20all%20outside%20work%20into%20the%20portfolio%20git.md) and [Remove duplicate code included in headers.](Remove%20duplicate%20code%20included%20in%20headers..md), and may be marked as #duplicate or possibly #rejected in favor of another task.

## New Features

* Move the kit macros into the portfolio
* Refactor the kit macros a bit
* Rewrite Andy's gl library in Lisp
* Define interfaces for every class in the library
* Obstacles simulation works as before
* Performance is not impacted by new implementation

## Tasks

* [ ] [[Andy's gl library]]: Move the lib into portfolio
* [ ] [[Lisp interfaces]]: Define interfaces for every class in the library
* [ ] [Simulation reset](../../Simulation%20reset.md): Reset the simulation to its original state
* [ ] [file explorer](file%20explorer.md): Implement a file explorer feature
* [ ] [chat app](chat%20app.md): Implement a chat app feature

## New Features

* Add a [project](../project.md) page to the website
* Side scroller
* Game of life
* File explorer
* Chat app
* Find unknown content warnings

## Tasks

* [ ] [config system](config%20system.md): Implement a [config system](config%20system.md)
* [ ] [[Entity inspector]]: Implement an entity inspector feature
* [ ] [[Github pages static site]]: Create a Github pages static site
* [ ] [[Trail entities]]: Implement trail entities
* [ ] [Simulation reset](../../Simulation%20reset.md): Reset the simulation to its original state

## New Features

* Add a [project](../project.md) page to the website
* Side scroller
* Game of life
* File explorer
* Chat app
* Find unknown content warnings

The dev code that watches, compiles, bundles, and serves the website would have a difficult time accessing the code that is in the #shared and #client modules, as browserify currently does some extra work parsing a namespacing system ie "@shared/data-structures/lists.js" refers to the code in [list.js](../../list.js) and everything in that folder uses that "@shared" prefix.

## Tasks

- [ ] [Cull duplicate macros](Cull%20duplicate%20macros.md)
- [ ] [Remove duplicate code included in headers.](Remove%20duplicate%20code%20included%20in%20headers..md)
- [ ] [Rewrite andy lib in lisp](Rewrite%20andy%20lib%20in%20lisp.md)

#epic