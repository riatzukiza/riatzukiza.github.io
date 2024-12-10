
# Documentation

Some interfaces from the object pools have doc macros attached to them automaticly generating document markdown files from the source code. It started out as a bit of a hack, this task is centered around documenting existing code using that hack. A seperate piece of work will be genreated for enhancing the document macro system.

## Requirements

- Every major system has been documented
- The documents are published and viewable on the static github website.
- Every major system has an example associated with it.


## Started 12 10 24

I'm going to document everything I touch while I work on other things. We 
know the doc macro works, we just have to use it.


# Trail Entities

The signal field code has the most tech debt of all the systems.
I want to be able to visualize the  trails agents leave behind.
The agents should be able to live longer than their trail.
When a trail has reached its max size, the oldest trail segment
should despawn and contribute nothing to the win/loose field update.

## Requirements

- Trails can be seen
- Agents life is not dependent on the length of the trail
- Agents do not loose when the trail max length is met
- the oldest trail segment despawns when a trail reaches its max length.


## Started 12 10 24

We are going to start by breaking down the huge ass field function.
It is probably multiple systems.
It is currently where the trails are tracked, and they are outside of the ECS.
Agents will get a new component: Trail
The trail system will create a new entity for each tick of movement at the location of the agent.
The Trail segment will have: 
- position component
- dot component
- signal vector component
- experation component

The position and dot systems are already in place.
The signal vector component stores the velocity of the agent at the time of creation.
The experation component stores the time the agent created the signal.
The signal expires if the current tick is placement time + max-trai-length.
When expired the trail segment entity despawns.
If the agent succeeds, all non expired signal vectors are applied to the signal field.
If the agent fails, all non expired signal vectors are applied inversely to the signal field.
All trail segments associated with an agent that has succeeded or failed despawn 
after they are applied.
