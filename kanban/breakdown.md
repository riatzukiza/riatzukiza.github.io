# unit system

We need an abstraction that allows us to describe and talk about agents abstractly with out manually creating them every time. We have "Entity Groups" right now, but that requires us to create a new entity group every time we have a new set of entities, and the way it is written there cannot be overlap between the groups.

If we wanted to say create multiple factions that each have the same set of units, just using entity groups as they are would be combersome.


# ground tiles

The ground needs to have different characteristics at different points, and different colorings. Some spots need to be easier to walk on, others need to be very hard to walk on.

# Simulation backend

The more I add to the game the more the browser is going to chug along.
If I move the simulation to the backend, and have the frontend just render a stream of objects from the backend..

The browser can afford to miss a few frames or packets, as it will not actually affect the simulation. It will only affect the rendering process.
This could be a neat chance to play around with webrtc udp like sockets.

# Hot reload system

I don't want to have to refresh the page every time I make a change, and I don't want to have to restart the server every time I want to change the server.
Initially this was added as two seperate tasks, but I've decided to merge therm 
into one that includes both the frontend and the backend.

This task will also encapsulate seperating the compiler(s) and the bundler(s)
into seperate processes.

## Requirements

- When in dev mode:
  - The frontend reloads when a change is made
  - The backend reloads when a change is made
  - each compiler runs in it's own process. Those compilers are:
    - templates
    - frontend
    - backend
      - This will become more than one part as we work on the simulation backend,
        so this feature should be set up to handle that.
    - Each bundler runs in it's own process.
- There should be seperate scripts for npm to run for each piece.
  - bundle x
  - compile x
  - start x
  - test x

## Vector field visualizations

We have implemented an abstraction for trails segments that decoupled them
from the ants life cycle. This simplified our field file, the primary source of our tech debt.

