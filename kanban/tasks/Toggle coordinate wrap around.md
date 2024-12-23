# Description

Add a config/settings panel toggle for coordinate systems wrap around. The entities should bounce off the edge of the map like they do off other collisions.
## Related Epics
- [[Game Mechanics]]
## Requirements

- Wrap around can be toggled off by config file
- Wrap around can be toggled off in the settings panel
- Entities trigger an elastic collision (simple collision) when they encounter the edge when wrap around is toggled off.
- The toggle can be done without resetting the simulation

## Tasks 

- [ ] Modify position system to emit an elastic collision event when coordinates exceed the bounds of the map

## Blocked by 

- [[BUG Collision doesn't work correctly in some circumstances.]]
- [[Update physics engine to increase accuracy and performance]]
