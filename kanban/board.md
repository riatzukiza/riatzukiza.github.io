---

kanban-plugin: board

---

## New

- [ ] [BUG Collision doesn't work correctly in some circumstances.](tasks/BUG%20Collision%20doesn't%20work%20correctly%20in%20some%20circumstances..md)
- [ ] BUG: Rendering background color setter never seems to work.
- [ ] DevOps: Sibilant transpiler should create less noise in pull requests when acting on unchanged files.
- [ ] Add a [project](project.md) page to the website
- [ ] Side scroller


## Rejected

- [ ] a backend implementation of the simulation
	  - Duplicate
- [ ] Components as data views
	  - Redundent by entity panel, provides data view


## Accepted

- [ ] Electron client
- [ ] Update physics engine to increase accuracy and performance
	  - Consolodate position and velocity into physics
	  - When performing updates, do not mutate the state of the
	last tick. Use two data structures, and swap them out [each](../docs/Pools/Dynamic/each.md) tick.
- [ ] Design theme for website.
- [ ] SPIKE: can we simplify object pools? (2 hrs)
- [ ] Implemment tests for existing shared components.
- [ ] Make old symbiants work
- [ ] [Mirror board to github](tasks/Mirror%20board%20to%20github.md)
- [ ] Find unknown content warnings
- [ ] Make old algage work
- [ ] add game of life to portfolio
- [ ] file explorer
- [ ] move kit core
- [ ] move kit shell
- [ ] move kit http
- [ ] move kit repl
- [ ] chat app
- [ ] move kit html
- [ ] move kit fs
- [ ] neural network for signal field hyerparameter adjustments
- [ ] Individual ant neural networks
- [ ] minimap
- [ ] Mineral Resource
- [ ] Water resource
- [ ] movement commands
- [ ] elevation
- [ ] flying units
- [ ] shadows
- [ ] night/day cycle


## Blocked

- [ ] [paralell processing for each system](tasks/paralell%20processing%20for%20each%20system.md)
	  - [blocked](blocked.md) by backend task
- [ ] ground tiles
- [ ] metabolism system
- [ ] multiple signal fields
- [ ] predator agents
- [ ] resource mechanics
- [ ] reverse navigation home
- [ ] Building system


## Breakdown (5)

- [ ] [Add beautifier and beautifier to pipeline to pipeline](tasks/Add%20beautifier%20and%20beautifier%20to%20pipeline%20to%20pipeline.md)
	  - Maybe this should be [done](done.md) at the same time as hot reloading? it is at least [blocked](blocked.md) by that task.
- [ ] [Rewrite andy lib in lisp](tasks/Rewrite%20andy%20lib%20in%20lisp.md)
- [ ] [a gpu implementation for signal fields and vector math.](tasks/a%20gpu%20implementation%20for%20signal%20fields%20and%20vector%20math..md)
	  - Use tensorflow.js
- [ ] [Cull duplicate macros](tasks/Cull%20duplicate%20macros.md)
- [ ] [Remove duplicate code included in headers.](tasks/Remove%20duplicate%20code%20included%20in%20headers..md)


## Epics

- [ ] [Move all outside work into the portfolio git](tasks/Move%20all%20outside%20work%20into%20the%20portfolio%20git.md)


## Ready

- [ ] [deletable entites](tasks/deletable%20entites.md)
	  - Entities can be deleted from a panel
- [ ] [Brain storm new projects](tasks/Brain%20storm%20new%20projects.md)
- [ ] [vector field visualization](tasks/vector%20field%20visualization.md)
- [ ] [unit system](tasks/unit%20system.md)
	  - A unit is an abstraction over an entity.
	  - Entities can be anything in the game
	  - A unit is a dynamic collection of entities
	- Like say a weapon, a shield
- [ ] [Hot reload system](tasks/Hot%20reload%20system.md)
	  - Create a seperate pipeline for development and production
- [ ] [selection box](tasks/selection%20box.md)
- [ ] [sprites](tasks/sprites.md)
- [ ] [camera system](tasks/camera%20system.md)
- [ ] [placeable entities (rocks, plants, bases)](tasks/placeable%20entities%20(rocks,%20plants,%20bases).md)
- [ ] [Enhance document macros](tasks/Enhance%20document%20macros.md)
- [ ] [Home page](tasks/Home%20page.md)
- [ ] [settings interface](tasks/settings%20interface.md)
- [ ] [attack system](tasks/attack%20system.md)
- [ ] [multiple factions](tasks/multiple%20factions.md)
- [ ] [simulation backend](tasks/simulation%20backend.md)
	  - Realizing after adding a toggle for the trail dots that rendering was not what was slowing the sim down
	We have decided to move this out of the todo backlog, as it will not be as much of a value add as we'd 
	have liked. The simulation needs more optimizations, and we don't currently have a place to host such an intensive backend.
- [ ] [github readme](tasks/github%20readme.md)
	  - The [readme](../readme.md) can be generated from this kanban through simple concatonation.


## Todo (2)



## In Progress (2)

- [ ] [documentation](tasks/documentation.md)
	  - Documenting a little bit at a time, especially when we find outselves having to look at older code to use or change it for use with new features.


## In Review (2)



## Done

**Complete**
- [ ] [config system](tasks/config%20system.md)
	  - we just kinda did this one before moving it through the board :shrug:
- [ ] Entity inspector
- [ ] Github pages static site [high priority]
- [ ] trail entities
- [ ] [Simulation reset](../Simulation%20reset.md)




%% kanban:settings
```
{"kanban-plugin":"board","new-note-folder":"kanban/tasks","list-collapse":[false,true,false,true,false,null],"tag-sort":[{"tag":"#highPriority"},{"tag":"#mediumPriority"},{"tag":"#lowPriority"},{"tag":"#wontdo"}]}
```
%%