
# Predator agents

Like in the original symbiants using a scalar signal field, I want to introduce predation. I'd like it to be a little more nuanced then the way I did it before, just spawnings new factions and weighted randomly selecting a food source based on total number of agents belonging to each type of food. This may require a little more thought. I can get a basic system up now. Maybe all agents can choose to be a predator based on how recently they've found food?

## Blocked by

- attack sytem
- multiple factions

## requirements

- A system for ants to win when they kill another ant
- Path finding allows predator agents to consistently find other ants.


# Resource Mechanics

Resources other than plants exist. The entites can do things with the resources. Entities take the resources home. Entities require resources to be spawned. 
This issue will not add other resources, but follow on work that adds new resources will depend on this one. The only resource we will add is plant matter.

## Requirements

- Agents can carry objects
- The faction requires resources to create new agents
- agents require resources to be created.
- Factions have a resource counter interface

## Blocked by

- trail entities
  - resource mechanics will require agents lives to
  be dictated by somthing other than a max trail length if they can only be created with resources being added
- reverse navigation home
  - Agents have to be able to make it home in order to find and return resources.


# Reverse navigation home

Agents need to be able to find their way home. This will be done by adding a new field, and/or reversing the ants relationship to the existing fields. 
They follow them in the reverse.

## Requirements

- Agents consistently make it to goals and back.
- A new agent is spawned only by returning back to the objective

## Blocked by

- Trail entities
- Multiple signal fields?


# Building system

Agents can create structures to perform their objectives.
Buildings allow for the creation of new units and adaptations.

## Requirements

- Units can create structures
- structures require resources to be brought to them to be constructed
- structures at least one worker unit to be working on them to progress
- structures build faster with more worker units

## Blocked by

- units
- resource system
- Mineral resources


# Metabolisim System

Agents need to slowly use resources they have consumed to survive.
Agent should starve to death to loose unless killed by another agent.

## Requirements

- Units consume plant matter to survive
- Units mass is based on how much food it has consumed.
- There is a maximum amount of food the agent can contain inside of them
- Once an agent is full they begin going home.
- Agents will not eat food they are carrying unless they get "hungry"
- Hungry means the amount of food the agent can store internally has gone below a certain threshhold upon previously being satiated.
- Agents are spawned hungry

## Blocked by

- trail entities
- Reverse navigation
- Resource system


# Multiple Signal Fields

Ants of the real world have a complex cocktail of pheremones they use to communicate different things. Different amounts of each pheremone can create varied behavior.

We want the agents to mimic this behavior. Agents should be able to use multiple fields to navigate. At first the fields will be given specific purposes, but later on when the agents have more complex decision making systems in the form of neural networks, they will just have a bunch of fields and the neural net will decide what each one means, how much to weight each one at any given time, etc.

## Requirements

- A system for handling multiple fields.
- A new field for satiated ants returning home with food
- A new field for satiated ants looking for food to bring home

## Blocked by

- Trail entities
- Reverse navigation home?
  - These two tickets may need to be worked on at the same time or merged into one.
  - Start by working on reverse navigation home using only the inverse of the existing field.
  - If agents cannot make it home, the ticket is blocked and we start work on this one.


# ground tiles

The ground needs to have different characteristics at different points, and different colorings. 
Some spots need to be easier to walk on, others need to be very hard to walk on.

## Requirements

- There is a matrix of tiles that are rendered to the screen
- Tiles have variable characteristics
- Tiles correspond to more than one coordinate point (They are larger than 1x1)


## Blockers

- camera
  - While not really a blocker, I would prefer to have a camera ready before this.
