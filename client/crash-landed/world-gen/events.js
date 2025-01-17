Array.prototype.each = (function Array$prototype$each$(f) {
  /* Array.prototype.each inc/misc.sibilant:1:1123 */

  this.forEach(f);
  return this;
});
Object.prototype.each = (function Object$prototype$each$(f) {
  /* Object.prototype.each inc/misc.sibilant:1:1185 */

  return Object.keys(this).forEach(((k) => {
  	
    return f(this[k], k);
  
  }));
});
var { 
  SuperPosition
 } = require("@crash-landed/world-gen/super-position.js");
const loader=self.loader;
var sendMessage = (function sendMessage$(type, data) {
  /* send-message eval.sibilant:3:0 */

  return self.postMessage({ 
    type,
    ...data
   });
});
var generateTile = (function generateTile$(data) {
  /* generate-tile eval.sibilant:6:0 */

  return .load();
});
loader.events.on("tile", ((data) => {
	
  const tile=loader.get(m.data.x, m.data.y);
  const s=SuperPosition.spawn(tile);
  s.collapse();
  s.despawn();
  return sendMessage("collapsedTile", tile.data);

})).once("error", ((err) => {
	
  console.log("error on", "tile", "of", "loader.events", "given", "data()");
  return console.log(err);

}));
loader.events.on("tiles", ((data) => {
	
  return sendMessage("collapsedTiles", m.data.tiles.map(((t) => {
  	
    return (function(s) {
      /* node_modules/kit/inc/scope.sibilant:12:9 */
    
      const tile=loader.get(t.x, t.y);
      s.collapse();
      const r=return tile.data;;
      SuperPosition.spawn(tile).despawn();
      return r;
    })(SuperPosition.spawn(tile));
  
  })));

})).once("error", ((err) => {
	
  console.log("error on", "tiles", "of", "loader.events", "given", "data()");
  return console.log(err);

}));