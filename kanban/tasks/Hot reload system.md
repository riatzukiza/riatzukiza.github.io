
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
