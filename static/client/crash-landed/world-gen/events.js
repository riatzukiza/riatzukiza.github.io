Array.prototype.each = (function Array$prototype$each$(f) {
  /* Array.prototype.each inc/misc.sibilant:1:1692 */

  this.forEach(f);
  return this;
});
Object.prototype.each = (function Object$prototype$each$(f) {
  /* Object.prototype.each inc/misc.sibilant:1:1754 */

  return Object.keys(this).forEach(((k) => {
  	return f(this[k], k);
  }));
});
import { 
  mixin,
  create,
  extend
 } from "/shared/kit/core/util.js";
import { 
  TileGrid
 } from "/client/crash-landed/world-gen/tile-grid.js";
import { 
  field
 } from "/client/crash-landed/world-gen/modules.js";
console.log("world generator started");
const tileGrid=TileGrid.spawn();
var pos = { 
  x:0,
  y:0
 };
var sendMessage = (function sendMessage$(type, data) {
  /* send-message eval.sibilant:11:0 */

  return self.postMessage({ 
    type,
    ...data
   });
});
tileGrid.events.on("tile", ((data) => {
	return sendMessage("collapsedTile", { 
  tile:tileGrid.collapseCell(data)
 });
})).once("error", ((err) => {
	console.log("error on", "tile", "of", "tileGrid.events", "given", "data()");
return console.log(err);
}));
tileGrid.events.on("tiles", ((data) => {
	return sendMessage("collapsedTiles", { 
  tiles:tileGrid.collapseCells(data)
 });
})).once("error", ((err) => {
	console.log("error on", "tiles", "of", "tileGrid.events", "given", "data()");
return console.log(err);
}));
tileGrid.events.on("playerTilePos", ((data) => {
	return sendMessage("playerPosUpdate", { 
  success:true
 });
})).once("error", ((err) => {
	console.log("error on", "playerTilePos", "of", "tileGrid.events", "given", "data()");
return console.log(err);
}));
tileGrid.events.on("save", ((data) => {
	return tileGrid.save(("worker-" + data.saveName)).then(((nil) => {
	return sendMessage("saveSuccessful", {  });
}));
})).once("error", ((err) => {
	console.log("error on", "save", "of", "tileGrid.events", "given", "data()");
return console.log(err);
}));
tileGrid.events.on("load", ((data) => {
	return tileGrid.load(("worker-" + data.saveName)).then(((nil) => {
	return sendMessage("loadSuccessful", {  });
}));
})).once("error", ((err) => {
	console.log("error on", "load", "of", "tileGrid.events", "given", "data()");
return console.log(err);
}));
tileGrid.events.on("getLoadedTiles", ((data) => {
	tileGrid.updatePlayerPos(data);
return tileGrid.readyTiles.then(((tiles) => {
	console.log("ready tile", tiles);
return sendMessage("loadedTiles", { 
  tiles
 });
}));
})).once("error", ((err) => {
	console.log("error on", "getLoadedTiles", "of", "tileGrid.events", "given", "data()");
return console.log(err);
}));
tileGrid.events.on("chunksNear", ((data) => {
	return sendMessage("collapsedTiles", { 
  tiles:tileGrid.collapseNearestChunks(data.x, data.y, data.n)
 });
})).once("error", ((err) => {
	console.log("error on", "chunksNear", "of", "tileGrid.events", "given", "data()");
return console.log(err);
}));
tileGrid.events.on("pause", (() => {
	tileGrid.started__QUERY = false;
return sendMessage("paused", {  });
})).once("error", ((err) => {
	console.log("error on", "pause", "of", "tileGrid.events", "given", "null");
return console.log(err);
}));
tileGrid.events.on("unpause", (() => {
	return (function() {
  if (!(tileGrid.started__QUERY)) {
    tileGrid.started__QUERY = true;
    tileGrid.events.emit("_step");
    return sendMessage("unpaused");
  } else {
    throw (new Error("cannot unpause, tile grid is already running"))
  }
}).call(this);
})).once("error", ((err) => {
	console.log("error on", "unpause", "of", "tileGrid.events", "given", "null");
return console.log(err);
}));
tileGrid.events.on("_step", (() => {
	return (function() {
  if (tileGrid.started__QUERY) {
    return tileGrid.step().then((() => {
    	return tileGrid.events.emit("_step");
    }));
  }
}).call(this);
})).once("error", ((err) => {
	console.log("error on", "_step", "of", "tileGrid.events", "given", "null");
return console.log(err);
}));
tileGrid.events.once("getStartingTiles", ((data) => {
	console.log("generating tiles", data);
sendMessage("initialTiles", { 
  tiles:tileGrid.collapseNearestChunks(data.x, data.y, data.n)
 });
tileGrid.updatePlayerPos(data);
tileGrid.started__QUERY = true;
return tileGrid.events.emit("_step");
})).once("error", ((err) => {
	console.log("error on", "getStartingTiles", "of", "tileGrid.events", "given", "data()");
return console.log(err);
}));
export { 
  tileGrid
 };