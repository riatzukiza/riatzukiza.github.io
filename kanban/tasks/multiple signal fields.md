
# Multiple Signal Fields

Ants of the real world have a complex cocktail of pheremones they use to communicate different things. Different amounts of [each](../docs/Pools/Dynamic/each.md) pheremone can create varied behavior.

We want the agents to mimic this behavior. Agents should be able to use multiple fields to navigate. At first the fields will be given specific purposes, but later on when the agents have more complex decision making systems in the form of neural networks, they will just have a bunch of fields and the neural net will decide what [each](../docs/Pools/Dynamic/each.md) one means, how much to weight [each](../docs/Pools/Dynamic/each.md) one at any given time, etc.

## Requirements

- A system for handling multiple fields.
- A new field for satiated ants returning home with food
- A new field for satiated ants looking for food to bring home

## Blocked by

- Trail entities
- [[reverse navigation home]]?
  - These two tickets may need to be worked on at the same time or merged into one.
  - Start by working on [[reverse navigation home]] using only the inverse of the existing field.
  - If agents cannot make it home, the ticket is blocked and we start work on this one.
