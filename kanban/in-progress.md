
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

## Update 12-11-24

The modules are started, but they are all over the place.
This has to be done, the field file is a mess that limits how far I can take this,
as it exists largely outside of the entity component framework.


### New component system interfaces

The new interfaces have been created, most of them at least. There may be more, but we are starting here.

- Timer
- Ant-dot
- Ant-life-timer
- Ant-trails
- Trail Dots
- Trail segments

#### Timer

The timer type is initialize with a duration and a callback.
When the duration has been reached, the callback is called and the timer is flagged as deactivated.
The call back can reset or despawn the timer.

The ant life and trail life components are durived from this.

#### Ant life
The ant life timer sets the entity back to spawn, increases the loose count, and resets the timer.

#### Trail segment
The trail life component encapsulates a vector, and its call back despawns the vector.

#### Ant dots

A simple sub class of the dot interface with a fixed color.
Using more than one instance of the dot interface will give us more layers of vertices, and a higher limit on the number of entities we can have.

#### Trail dot

Similar to the ant dot, it is also an instance of the dot interface with a fixed color.
It's alpha will vary with the remaining duration on the trail segment.


#### Trail segments

A new component for ants to associate it with the trail entities it spawns as it moves.

### New entity

A new entity is also being added for the trail segments.
It has a position, a rendering component, and an expiring vector.
Every tick the ant moves, a new trail segment is spawned.
When an ant either wins or looses, it will itterate through it's trail segments component,
applying the associated vectors to the signal field.

## Notes

While this is how I am choosing to implement this now, it is possible this could be done with out creating a new entity
by creating a new renderable interface containing a collection of vertices instead of just one vertex like the dot interface.

I've already started it this way, and what is most important right now is to move behavior out of the shared/field file, and into our
entity framework. Once the behaviors of the field are captured in ecs, it wil be easier to change how we interact with the fields.

I will comment further at the end of the day, trying not to leave the update for the morning after.

