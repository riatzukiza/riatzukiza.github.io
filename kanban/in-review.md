
# Simulation Reset

This feature will help me make sure that I am clearing the object pools correctly and let me change settings easier with out having to restart if I want to see the simulation from the start with a new set of settings.

## Requirements

- A button that resets the simulation without
  refreshing the page
- The simulation is not degraded in performance
  from memory leaks or other artifacts leftover
  from the previous simulation instance.

## Update 12-9-24

It seems to be working as it is now, we'll keep an eye on it as other work is introduced to make sure 
the button continues to work. it is possible that more complex features later on will end up requring more work, as it is possible that there are still despawning paths that have not been taken (Clearing all the entity groups is fine for what the game is now)
