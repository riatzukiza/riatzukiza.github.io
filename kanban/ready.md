
# Config system

For component systems to leverage my config file I have to inject it manually and it is a little annoying to do. I want a more streamlined way of using config files that is integrated with the rest of the game systems.

This is pretty simple to do, and I think I've already kinda done it?

I had somthing a little different than the hack I did in mind though.

Like each component should be individually configurable, accepting a config interface as a parameter for initialization

## Requirements

- shared standardized config interface integrated with @shared component system.


# Settings interface

While I have a quick settings interface, it is just somthing I found when I found the code that inspired the signal vector field concept. In the same area as the entity inspecter and placement pallette will be located, there will be an interface for updating the simulation settings.

Sine I've already got work started on interface components it makes sense for me to add prioritize this.

## Requirements

- pairity with old quicksettings menu

# Home page

Any good website, especially the portfolio of a developer, needs a good home page.
it should have a nav panel, a brief synopsis of what it is I do and how I do it
it should have references to my work, somthing resembling my resume.

Basicly everything on my resume must be in some way present on this website.

## Requirements

- Uses MUI to look good
- Has a navagation menu
- Explains what I am about
- Has links to my github, linkedin, twitter, blue sky, etc
- Has links to the projects I have worked on


# Enhance Document Macros

The current document macros place simple markdown files into a "./docs" folder.
If I want them to be hosted on the website, they need to end up as html files.
In fact, since we are working with lisp we can make them go directly to html can't we?
We can make this documentation system pretty powerful. 

I'm going to sit on this for a bit, more ideas will come to mind after I have documented the esisting codebase.

## Requirements

- convert markdown files to html
- docs need links to the files they are from
- Runnable examples of the feature working
- Links to parent interface
- Documents that work for macros



# Placeable entities.

I could circumvent some issues with placing objects during initialization if I could place the objects with a gui. This will require a pallette interface to select entities from and edit the characteristics of placed entities.

## Requirements

- A pallete for placing entities from groups
- A pallete for creating custom entities from existing components
- A drop down menu featuring the games active component systems
- A drop down menu featuring the games active entity groups
- Mouse event handlers for choosing where to place the entity


# Github Readme

Pretty straight forward, github needs a readme to explain to everyone coming to the code from github to understand what this repository is. I want to generate the readme from a collection of documents like this one.

## Requirements

- introduction
- this kanban is a part of it
- A link to the home page
- A link to the projects
- A brief explaination of each project




# Camera System

A system that allows us to zoom in and out on the map. It allows us to scroll cross tile.


## Requirements

- Mouse click/hold events on the game canvas for dragging the view.
- Mouse wheel events that allow the camera to zoom in and out.
- No visual artifacts when viewing the edges of the map where the coordinate system tiles.


# Attack System

Entities are able to damage other entities, entities can die.

## Requirements

- Attack system
- Health system
- Entities Are despawned when they're health reaches zero


# Multiple Factions

There are several entity groups with different properties and their own signal fields.

## Requirements

- each faction has a food source/goal
- each faction has it's own set of hyper parameters
- each faction has its own signal/noise fields




# Sprites

Make the game look better with some sprite graphics, we have an existing sprite implementation. It may be worth investigating different graphics engines at this point?
I'm not sure if individually placing dots is the best way to be doing sprites. It should
work for now. We know we have cod e for 3d stuff in another repository.


## Requirements

- Create sprite sheets for agents and rocks
- Try existing sprite system, compare speed to vertex rendering mode speed.
- If speed is unreasonable, create a new task to look into other graphics 
  engine solutions, or write a new shader for sprites.


# Selection Box

We want to be able to drag a box around entities for selection. Selected entities will show up in a panel and be highlighted.

## Requirements

- Mouse click, hold, and release events for dragging a box
- A box appears when the mouse is held and dragged
- Entities with in the box are highlighted 
- When the mouse is release, the highlighted entities are displayed in a panel.
- There is a different highlighted color for entities that are selected and ones that are in a box to be highlighted upon mouse up event


# Hot reload server

In dev mode, when code for the server side is changed, the
server should be restarted with the new code

## Requirements

- Server restarts when server code is changed when in dev mode.

# hot reload client

In dev mode, when the client code is changed, the browser should referesh

## Requirements

- Browser refreshes when client code is changed

# Brain storm new projects

We need more than one project to call this a portfolio. I've already added a few possibilities to the board, we need to add a few more. We can brain storm a whole crap load of them. We don't need to do all of them, but we need an idea of what is possible and what isn't.

## Requirements

- At least 100 possible new projects are added to the board.


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

# unit system

We need an abstraction that allows us to describe and talk about agents abstractly with out manually creating them every time. We have "Entity Groups" right now, but that requires us to create a new entity group every time we have a new set of entities, and the way it is written there cannot be overlap between the groups.

If we wanted to say create multiple factions that each have the same set of units, just using entity groups as they are would be combersome.

## Requirements

- An abstraction is implemented for describing, creating, and managing complex multi 
  entity systems that compose a larger unit
- Units are easily clearable
- Units are selectable
- Units are all movable


# Simulation backend

The more I add to the game the more the browser is going to chug along.
If I move the simulation to the backend, and have the frontend just render a stream of objects from the backend..

The browser can afford to miss a few frames or packets,
as it will not actually affect the simulation. It will only
affect the rendering process.
This could be a neat chance to play around with webrtc udp like sockets.
It may be a bit more than we should fit into a single task though.
The first pass on this will be straightforward using a technology we are very familar with, socket.io

## Requirements

- The rendering system can run in the browser being fed data from the backend.
- The backend can run continuously, allowing users to leave,
  then comeback, and the simulation has progressed from where it was.
- The simulation can persist with server restarts.
- The simulation can still be run in the browser.
- The simulation state also persists if being run in the browser through local storage.


# Vector field visualizations

We have implemented an abstraction for trails segments that decoupled them
from the ants life cycle. This simplified our field file,
the primary source of our tech debt.
The way I was thinking of doing this was to have ghost entities that only
follow one field, and do not influence , or interact with other entities it by moving.

## Notes

Ghost entities are a good example of an entityt that is not a unit.
It represents a visual effect in the game, but it is not a part of the simulation.

Other examples of non unit entities would be like:
- tile
  - Not selectable, simple, static
- shadows
  - May be a part of a unit, but would be a simple entity.
  - it has a location, and a rendering component,
    but is not meaningful to the simulation.

## Requirements

- the @shared/field.sibilant file is factored out
- each field gets it's own system
- There are non interacting ghost entities that follow the fields
- The number of ghosts is configurable.
- The length of their trails is configurable.
