
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

