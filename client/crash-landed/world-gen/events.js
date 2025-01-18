var R = require("ramda");
var { 
  create,
  extend,
  mixin,
  conditional,
  cond,
  partiallyApplyAfter
 } = require("@kit-js/core/js/util");
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
const tileGrid=self.tileGrid;
var sendMessage = (function sendMessage$(type, data) {
  /* send-message eval.sibilant:2:0 */

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
tileGrid.events.on("chunksNear", ((data) => {
	
  return sendMessage("collapsedTiles", { 
    tiles:tileGrid.collapseNearestChunks(data.x, data.y, data.n)
   });

})).once("error", ((err) => {
	
  console.log("error on", "chunksNear", "of", "tileGrid.events", "given", "data()");
  return console.log(err);

}));