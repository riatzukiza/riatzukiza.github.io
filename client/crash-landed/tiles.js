Array.prototype.each = (function Array$prototype$each$(f) {
  /* Array.prototype.each inc/misc.sibilant:1:1121 */

  this.forEach(f);
  return this;
});
Object.prototype.each = (function Object$prototype$each$(f) {
  /* Object.prototype.each inc/misc.sibilant:1:1183 */

  return Object.keys(this).forEach(((k) => {
  	
    return f(this[k], k);
  
  }));
});
var Floor = TileComponent.define("Floor", { 
  
 });
var Flooring = TileSystem.define("Flooring", { 
  types:[ "dirt", "rock", "grass" ],
  interface:Floor
 });
var TileSprite = Sprite.define("TileSprite", { 
  
 });
var TileSprites = Sprites.define("TileSprites", { 
  interface:TileSprite
 });
var TileComponent = Component.define("TileComponent", { 
  
 });
var TileSystem = System.define("TileSystem", { 
  interface:TileData
 });
const tileSystems=[ Flooring, FloorSprite, Contents, Visibility, Temperature, Traversability, MovementSignals, MemoryLabels, Beauty ];
const tiles=TileGraph.spawn(tileSystems);