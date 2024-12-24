# Description

Weather effects how real plants [[../../docs/Pools/Dynamic/grow|grow]], we have an issue now where plants usually [[../../docs/Pools/Dynamic/grow|grow]] uncontrollably, or completely disappear due to consumption by the ants. The plants need a limiting growth factor other than the plants consuming them if they are to be able to [[../../docs/Pools/Dynamic/grow|grow]] enough to not disapear so the ants can actually find them.
## Related Epics
- [[Game Mechanics]]
## Requirements

- The weather changes over time in the game
- There are multiple weather types:
	- Cloudy
	- sunny
	- rainy
	- snowy
- There is a temperature system
- Water accumulates on the ground due to rainfall.
- Water evaporates in the sun
- plants use water to [[../../docs/Pools/Dynamic/grow|grow]]

## Tasks 

- [ ] Implement water system
- [ ] Implement evaporation
- [ ] Implement rainfall
- [ ] implement lighting system
## Blocked by 

- [[sprite lighting]]
- [[ground tiles]]
- [[Water resource]]
