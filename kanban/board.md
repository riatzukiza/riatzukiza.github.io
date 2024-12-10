# Board flow

```

New-> Accepted -> Breakdown -----> Ready -> Todo -> In Progress -> In Review -> Done
|                 |  |  ^          ^                |    ^            |
|                 |  |  |          |                |    |            |
----> Rejected<----  -> Blocked ---|    |<-----------    |-------------
                           ^            |<----------------
                           |-------------
```

# New

Feature ideas we may or may not do. A place for brainstorming.


## Acceptance Criteria

New ideas can move to either an accepted or rejected state.

```
New-> Accepted
|
----> Rejected
```
- We've started writing about it
- it seems feasable.
- It is not a duplicate.

## Tasks

- Make old symbiants work
- Make old algage work
- Add a project page to the website
- Side scroller
- add game of life to portfolio
- file explorer
- chat
- Find unknown content warnings
- Update physics engine to increase accuracy and performance
- Consolodate position and velocity into physics
- When performing updates, do not mutate the state of the last tick. Use two data structures, and swap them out each tick.


## Rejected

Tasks we opened up that we later realized were not useful, or a duplicate of an existing task.

Rejected tasks do not have state transitions at the moment.

```
New  Breakdown
|    |
--------> Rejected
```
## Tasks

- a backend implementation of the simulation
  - Duplicate
- Components as data views
  - Redundent by entity panel, provides data view


# Accepted

Features we have decided to look into.
If we think they will add value we will move on to break down.
The task must be described to continue

Accepted tasks cannot be rejected with out first going through breakdown


```
Accepted -> Breakdown
```

## Acceptance Criteria

- A brief description of the task is created. 
- We have decided the feature has value
- The task must not be a duplicate or redundent.

## Tasks

- Move all kit libraries into shared
- Cull duplicate macros
- Remove duplicate code included in headers.
- Design theme for website.
- Rewrite "andy" lib in lisp
- SPIKE: can we simplify object pools? (2 hrs)
- Implemment tests for existing shared components.
- Electron client
- vector field visualization
- neural network for signal field hyerparameter adjustments
- Individual ant neural networks
- paralell processing for each system
- a gpu implementation for signal fields and vector math.
- Add beautifier to pipeline
- Add minifier to pipeline
- Create a seperate pipeline for development and production
- minimap
- Mineral Resource
- Water resource
- movement commands
- simulation backend
- deletable entites
- elevation
- flying units
- shadows
- night/day cycle

# Breakdown (5)

Features we are actively thinking about and preparing for work.
The result of a breakdown is either a task that is ready for work, or a task that is rejected
upon further examination.

Tasks may become blocked if once the work was started it became clear 
the task was not defined clearly enough.


```

Breakdown->Ready
|
->Blocked

```

## Definition of done

- requirements
- explaination of value
- a general approach to the problem


## Tasks

- Hot reload server
- hot reload client
- Brain storm new projects
- unit system
- ground tiles


# Blocked

Features that have been refined and are ready to work on after a feature they rely on has been implemented

## tasks

- metabolism system
- multiple signal fields
- predator agents
- resource mechanics
- reverse navigation home
- Building system

# Ready

Tasks that are ready to be worked that we have not decided to start.
Tasks that are ready for work have not been prioritized and there is no estimate on complexity.

- selection box
- sprites
- camera system
- placeable entities (rocks, plants, bases)
- github readme
- Enhance document macros
- Home page
- config system
- settings interface
- attack system
- multiple factions

# Todo (2)

Tasks that have been prioritized and estimated. These are what are to be done after 
in progress tasks have been completed.

## Tasks


# In Progress (2)

Tasks that are currently being worked on.

## Tasks
- trail entities
- documentation

# In Review (2)

Work that has been completed but needs to be reviewed to be sure.

## Tasks

- Simulation reset

# Done

The work has been reviewed and we are sure that it is done.
:confetti:

## Tasks

- Entity inspector
- Github pages static site [high priority]

