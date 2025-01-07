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
var R = require("ramda");
var { 
  create,
  extend,
  mixin,
  conditional,
  cond,
  partiallyApplyAfter
 } = require("@kit-js/core/js/util");
var { 
  Interface
 } = require("@kit-js/interface");
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
global.mixin = mixin;
global.create = create;
var { 
  game,
  activeGameSystems
 } = require("@crash-landed/game.js");
var { 
  startInterface
 } = require("@crash-landed/dom.js"),
    { 
  Physics
 } = require("@shared/systems/physics/index.js"),
    { 
  Position
 } = require("@shared/systems/position.js"),
    { 
  Velocity
 } = require("@shared/systems/velocity.js"),
    { 
  PlayerSprites
 } = require("@crash-landed/systems/sprites/player.js"),
    { 
  FloorSprites
 } = require("@crash-landed/systems/sprites/floor.js"),
    { 
  Sight
 } = require("@crash-landed/systems/sight.js"),
    { 
  TileVisibility
 } = require("@crash-landed/systems/visibility.js"),
    { 
  EntityGroup
 } = require("@shared/ecs/entity-group.js");
var { 
  TileGraph
 } = require("@shared/tiles.js");
game.start();
const tiles=TileGraph.spawn(60, [ FloorSprites, TileVisibility ], game);
const player=create(EntityGroup)("player", [ Position, PlayerSprites, Physics, Velocity, Sight ], game.ent);
const p=player.spawn();
p.positionInterface.x = 300;
p.positionInterface.y = 300;
const v=p.velocityInterface.vector;
p.physicalProperties.scale = 60;
p.playerSprite.selectSequence("east");
const eigthTurn=((Math.PI * 2) / 8);
const east=0;
const southEast=eigthTurn;
const south=(eigthTurn * 2);
const southWest=(eigthTurn * 3);
const west=(eigthTurn * 4);
const northWest=(eigthTurn * 5);
const north=(eigthTurn * 6);
const northEast=(eigthTurn * 7);
Position.wraps__QUERY = false;
v.setLength(10);
v.setAngle(east);
console.log(v.getAngle());
const directions=[ north, northEast, east, southEast, south, southWest, west, northWest ];
const directionNames=[ "north", "northEast", "east", "southEast", "south", "southWest", "west", "northWest" ];
var getCardinalDirection = (function getCardinalDirection$(vector) {
  /* get-cardinal-direction eval.sibilant:66:0 */

  const angle=vector.getAngle();
  return directions[Math.round((angle / eigthTurn))];
});
Sight.registerTileGraph(tiles);
var i = 2;
game.events.on("tick", ((t) => {
	
  (function() {
    if ((t % 10) === 0) {
      return p.playerSprite.step();
    }
  }).call(this);
  return (function() {
    if ((t % 180) === 0) {
      i = ((i + 1) % 8);
      const directionName=directionNames[i];
      const directionAngle=directions[i];
      p.playerSprite.selectSequence(directionName);
      return v.setAngle(directionAngle);
    }
  }).call(this);

})).once("error", ((err) => {
	
  console.log("error on", "tick", "of", "game.events", "given", "t()");
  return console.log(err);

}));
startInterface();