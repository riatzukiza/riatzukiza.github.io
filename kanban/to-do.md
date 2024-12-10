

# Documentation

Some interfaces from the object pools have doc macros attached to them automaticly generating document markdown files from the source code. It started out as a bit of a hack, this task is centered around documenting existing code using that hack. A seperate piece of work will be genreated for enhancing the document macro system.

## Requirements

- Every major system has been documented
- The documents are published and viewable on the static github website.
- Every major system has an example associated with it.


# Trail Entities

The signal field code has the most tech debt of all the systems. I want to be able to visualize the  trails agents leave behind. The agents should be able to live longer than their trail. When a trail has reached its max size, the oldest trail segment should despawn and contribute nothing to the win/loose field update.

## Requirements

- Trails can be seen
- Agents life is not dependent on the length of the trail
- Agents do not loose when the trail max length is met
- the oldest trail segment despawns when a trail reaches its max length.
