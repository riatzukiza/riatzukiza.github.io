---

kanban-plugin: board

---

## New

- [ ] Add a [project](project.md) page to the website
- [ ] Side scroller
- [ ] Toggle coordinate wrap around
- [ ] 3d gravity using babylon
- [ ] blog


## Accepted

- [ ] [[Dynamic pools for renderables.]]
- [ ] [move kit fs](tasks/move%20kit%20fs.md)
- [ ] [file explorer](tasks/file%20explorer.md)
- [ ] [chat app](tasks/chat%20app.md)
- [ ] [Find unknown content warnings](tasks/Find%20unknown%20content%20warnings.md)
- [ ] [move kit html](tasks/move%20kit%20html.md)
- [ ] [Electron client](tasks/Electron%20client.md)
- [ ] [Make old symbiants work](tasks/Make%20old%20symbiants%20work.md)
- [ ] [Make old algage work](tasks/Make%20old%20algage%20work.md)
- [ ] [add game of life to portfolio](tasks/add%20game%20of%20life%20to%20portfolio.md)
- [ ] [move kit core](tasks/move%20kit%20core.md)
- [ ] [move kit shell](tasks/move%20kit%20shell.md)
- [ ] [move kit http](tasks/move%20kit%20http.md)
- [ ] [BUG Rendering background color setter never seems to work.](tasks/BUG%20Rendering%20background%20color%20setter%20never%20seems%20to%20work..md)
- [ ] [move kit repl](tasks/move%20kit%20repl.md)
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
- [ ] [BUG Collision doesn't work correctly in some circumstances.](tasks/BUG%20Collision%20doesn't%20work%20correctly%20in%20some%20circumstances..md)


## Epics

- [ ] [Move all outside work into the portfolio git](tasks/Move%20all%20outside%20work%20into%20the%20portfolio%20git.md)
- [ ] [devops pipeline](tasks/devops%20pipeline.md)
- [ ] [Import other projects](tasks/Import%20other%20projects.md)
- [ ] [[Optimizations]]


## Blocked

- [ ] [paralell processing for each system](tasks/paralell%20processing%20for%20each%20system.md)
	  - [blocked](blocked.md) by backend task
- [ ] [ground tiles](tasks/ground%20tiles.md)
- [ ] [metabolism system](tasks/metabolism%20system.md)
- [ ] [multiple signal fields](tasks/multiple%20signal%20fields.md)
- [ ] [predator agents](tasks/predator%20agents.md)
- [ ] [resource mechanics](tasks/resource%20mechanics.md)
- [ ] [reverse navigation home](tasks/reverse%20navigation%20home.md)
- [ ] [Building system](tasks/Building%20system.md)
- [ ] [DevOps Sibilant transpiler should create less noise in pull requests when acting on unchanged files.](tasks/DevOps%20Sibilant%20transpiler%20should%20create%20less%20noise%20in%20pull%20requests%20when%20acting%20on%20unchanged%20files..md)


## Breakdown (5)

- [ ] Update physics engine to increase accuracy and performance
	  - Consolodate position and velocity into physics
	  - When performing updates, do not mutate the state of the
	last tick. Use two data structures, and swap them out [each](../docs/Pools/Dynamic/each.md) tick.
- [ ] [Implemment tests for existing shared components.](tasks/Implemment%20tests%20for%20existing%20shared%20components..md)


## Ready

- [ ] [Mirror board to github](tasks/Mirror%20board%20to%20github.md)
- [ ] [Cull duplicate macros](tasks/Cull%20duplicate%20macros.md)
- [ ] [Remove duplicate code included in headers.](tasks/Remove%20duplicate%20code%20included%20in%20headers..md)
- [ ] [camera system](tasks/camera%20system.md)
- [ ] [Rewrite andy lib in lisp](tasks/Rewrite%20andy%20lib%20in%20lisp.md)
- [ ] [placeable entities (rocks, plants, bases)](tasks/placeable%20entities%20(rocks,%20plants,%20bases).md)
- [ ] [Add beautifier and beautifier to pipeline to pipeline](tasks/Add%20beautifier%20and%20beautifier%20to%20pipeline%20to%20pipeline.md)
	  - Maybe this should be [done](done.md) at the same time as hot reloading? it is at least [blocked](blocked.md) by that task.
- [ ] [github readme](tasks/github%20readme.md)
	  - The [readme](../readme.md) can be generated from this kanban through simple concatonation.
- [ ] [Hot reload system](tasks/Hot%20reload%20system.md)
	  - Create a seperate pipeline for development and production
- [ ] [a gpu implementation for signal fields and vector math.](tasks/a%20gpu%20implementation%20for%20signal%20fields%20and%20vector%20math..md)
	  - Use tensorflow.js
- [ ] [deletable entites](tasks/deletable%20entites.md)
	  - Entities can be deleted from a panel
- [ ] [Enhance document macros](tasks/Enhance%20document%20macros.md)
- [ ] [Brain storm new projects](tasks/Brain%20storm%20new%20projects.md)
- [ ] [vector field visualization](tasks/vector%20field%20visualization.md)
- [ ] [multiple factions](tasks/multiple%20factions.md)
- [ ] [unit system](tasks/unit%20system.md)
	  - A unit is an abstraction over an entity.
	  - Entities can be anything in the game
	  - A unit is a dynamic collection of entities
	- Like say a weapon, a shield
- [ ] [selection box](tasks/selection%20box.md)
- [ ] [attack system](tasks/attack%20system.md)
- [ ] [simulation backend](tasks/simulation%20backend.md)
	  - Realizing after adding a toggle for the trail dots that rendering was not what was slowing the sim down
	We have decided to move this out of the todo backlog, as it will not be as much of a value add as we'd 
	have liked. The simulation needs more optimizations, and we don't currently have a place to host such an intensive backend.


## Todo (5)

- [ ] [SPIKE can we simplify object pools (2 hrs)](tasks/SPIKE%20can%20we%20simplify%20object%20pools%20(2%20hrs).md)
- [ ] [Home page](tasks/Home%20page.md)
- [ ] [Design theme for website.](tasks/Design%20theme%20for%20website..md)


## In Progress (2)

- [ ] [documentation](tasks/documentation.md)
	  - Documenting a little bit at a time, especially when we find outselves having to look at older code to use or change it for use with new features.


## In Review (2)

- [ ] [sprites](tasks/sprites.md)


## Rejected

- [ ] a backend implementation of the simulation
	  - Duplicate
- [ ] Components as data views
	  - Redundent by entity panel, provides data view


## Done

**Complete**
- [x] [settings interface](tasks/settings%20interface.md) ✅ 2024-12-22
- [ ] [config system](tasks/config%20system.md)
	  - we just kinda did this one before moving it through the board :shrug:
- [ ] Entity inspector
- [ ] Github pages static site [high priority]
- [ ] trail entities
- [ ] [Simulation reset](../Simulation%20reset.md)




%% kanban:settings
```
{"kanban-plugin":"board","new-note-folder":"kanban/tasks","list-collapse":[false,false,false,true,false,false,false],"tag-sort":[{"tag":"#highPriority"},{"tag":"#mediumPriority"},{"tag":"#lowPriority"},{"tag":"#wontdo"}],"new-note-template":"kanban/templates/New Task.md"}
```
%%