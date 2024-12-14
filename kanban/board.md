
# New

- BUG: Collision doesn't work correctly in some circumstances.
- BUG: Rendering background color setter never seems to work.
- DevOps: Sibilant transpiler should create less noise in pull requests when acting on unchanged files.
- Mirror board to github
- Make old symbiants work
- Make old algage work
- Add a project page to the website
- Side scroller
- add game of life to portfolio
- file explorer
- chat app
- Find unknown content warnings


# Rejected

- a backend implementation of the simulation
  - Duplicate
- Components as data views
  - Redundent by entity panel, provides data view


# Accepted

- Update physics engine to increase accuracy and performance
  - Consolodate position and velocity into physics
  - When performing updates, do not mutate the state of the
    last tick. Use two data structures, and swap them out each tick.
- Move all kit libraries into shared
- Cull duplicate macros
- Remove duplicate code included in headers.
- Design theme for website.
- SPIKE: can we simplify object pools? (2 hrs)
- Implemment tests for existing shared components.
- Electron client
- neural network for signal field hyerparameter adjustments
- Individual ant neural networks
- minimap
- Mineral Resource
- Water resource
- movement commands
- elevation
- flying units
- shadows
- night/day cycle
- Brain storm new projects

# Breakdown (5)

- deletable entites
  - Entities can be deleted from a panel
- Add beautifier and beautifier to pipeline to pipeline
  - Maybe this should be done at the same time as hot reloading? it is at least blocked by that task.
- Rewrite "andy" lib in lisp
- a gpu implementation for signal fields and vector math.
  - Use tensorflow.js
- paralell processing for each system
  - blocked by backend task

# Blocked

- ground tiles
- metabolism system
- multiple signal fields
- predator agents
- resource mechanics
- reverse navigation home
- Building system

# Ready

- vector field visualization
- unit system
  - A unit is an abstraction over an entity.
  - Entities can be anything in the game
  - A unit is a dynamic collection of entities
    - Like say a weapon, a shield
- Hot reload system
  - Create a seperate pipeline for development and production
- selection box
- sprites
- camera system
- placeable entities (rocks, plants, bases)
- Enhance document macros
- Home page
- settings interface
- attack system
- multiple factions
- simulation backend
  - Realizing after adding a toggle for the trail dots that rendering was not what was slowing the sim down
    We have decided to move this out of the todo backlog, as it will not be as much of a value add as we'd 
    have liked. The simulation needs more optimizations, and we don't currently have a place to host such an intensive backend.
- github readme
  - The readme can be generated from this kanban through simple concatonation.


# Todo (2)

# In Progress (2)

- documentation
  - Documenting a little bit at a time, especially when we find outselves having to look at older code to use or change it for use with new features.

# In Review (2)
- config system
  - we just kinda did this one before moving it through the board :shrug:

# Done
- Entity inspector
- Github pages static site [high priority]
- trail entities
- Simulation reset

