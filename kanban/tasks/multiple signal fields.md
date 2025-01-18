
# Multiple Signal Fields

Ants of the real world have a complex cocktail of pheremones they use to communicate different things. Different amounts of [each](../docs/Pools/Dynamic/each.md) pheremone can create varied behavior.

We want the agents to mimic this behavior. Agents should be able to use multiple fields to navigate. At first the fields will be given specific purposes, but later on when the agents have more complex decision making systems in the form of neural networks, they will just have a bunch of fields and the neural net will decide what [each](../docs/Pools/Dynamic/each.md) one means, how much to weight [each](../docs/Pools/Dynamic/each.md) one at any given time, etc.

## Requirements

- A system for handling multiple fields.
- A new field for satiated ants returning home with food
- A new field for satiated ants looking for food to bring home

## Tasks

- [ ] 

## Blocked by


## Notes

The first new field will be a collision field. I don't know if this is something I want to use in a real game, but I think that it is an easy target for implementing the mechanics of interacting fields.

The behavior of this field will be perpendicular to the direction of movement, to encourage entities to follow the outer permiter of collidable assets, and to prevent them from pushing rocks in the same direction as their objective, thus creating blockages for themselves. The idea is that this should make them either follow the edge of it, or push it to the side instead of pushing it into the direction of their goal.

noise also works.

I'm looking at the old algae code for inspiration and guidance regarding the implementation of interacting fields.
x`
I also found the work I did to handle any state space. As in fields who's values change over time. The logic here is to avoid updating values in place that other calculations on the same tick are going to be referencing. It is a semi immutable data structure, as in it has a component that is changing, and a prior which is not. It was implemented so that the arrays would swap places each tick. I can't take this work directly from there into here as it was a scalar field and most of the logic does not translate. I am not sure that a field of vectors can be called a matrix any more, I think this is a tensor.

yea, it isn't. Even though the position space is still 2 dimentional, the values being vectors adds another dimension. 1 for x, 1 for y, and 1 for the tuple of the vectors

so values are access `a[x][y][dx||dy]`