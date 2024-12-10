
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
