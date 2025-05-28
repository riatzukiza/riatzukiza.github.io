# Description

The elevation at a given location will change the movement characteristics of that location. Water will fall down slope, units will have a harder time moving up them than down them, in some cases they will not be able to overcome the gravity.

## Related Epics
- [Game Mechanics](Game%20Mechanics.md)
- [Graphics](Graphics.md)
## Requirements

- Units move differently on locations with higher or lower slopes
- Fluids fall down slope
- static objects will slide down a slope if the static friction is overcome by the force of gravity given a slopes angle
- Elevation is visually distinguishable 

## Tasks 

- [ ] Implement elevation component system for tile entities
- [ ] Implement systems for units that interact with elevation
- [ ] Implement systems for fluids that interact with elevation
- [ ] Implement systems for static objects that interact with elevation

## Blocked by 

- [ground tiles](ground%20tiles.md)
- [unit system](unit%20system.md)
- [[static object system]]
- [Update physics engine to increase accuracy and performance](Update%20physics%20engine%20to%20increase%20accuracy%20and%20performance.md)

## Blocks

{{Blocks}}

- This task cannot be done until this one is done.
- neither can this one
- or this one