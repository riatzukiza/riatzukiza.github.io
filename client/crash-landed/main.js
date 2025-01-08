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
  Friction
 } = require("@crash-landed/forces.js"),
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
  CliffSprites
 } = require("@crash-landed/systems/sprites/cliff.js"),
    { 
  Sight
 } = require("@crash-landed/systems/sight.js"),
    { 
  TileVisibility
 } = require("@crash-landed/systems/visibility.js"),
    { 
  EntityGroup
 } = require("@shared/ecs/entity-group.js"),
    { 
  Vector
 } = require("@shared/vectors.js"),
    noise = require("@shared/noise.js"),
    config = require("@crash-landed/config.js");
console.log(config.dimensions);
var { 
  TileGraph,
  TileNode
 } = require("@shared/tiles.js");
game.start();
const gameScale=128;
const tiles=TileGraph.spawn(gameScale, [ FloorSprites, CliffSprites, TileVisibility ], game);
const player=create(EntityGroup)("player", [ Position, PlayerSprites, Physics, Velocity, Sight ], game.ent);
const p=player.spawn();
p.positionInterface.x = 300;
p.positionInterface.y = 300;
const v=p.velocityInterface.vector;
p.physicalProperties.scale = gameScale;
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
v.setLength(256);
v.setAngle(east);
console.log(v.getAngle());
const directions=[ east, southEast, south, southWest, west, northWest, north, northEast ];
const directionNames=[ "east", "southEast", "south", "southWest", "west", "northWest", "north", "northEast" ];
var getCardinalDirection = (function getCardinalDirection$(vector) {
  /* get-cardinal-direction eval.sibilant:73:0 */

  const angle=vector.getAngle();
  return directions[(Math.abs(Math.round((angle / eigthTurn))) % 8)];
});
var directionActions = Interface.define("directionActions", { 
  north:[ 0, 1 ],
  northEast:[ 1, 1 ],
  east:[ 1, 0 ],
  southEast:[ 1, -1 ],
  south:[ 0, -1 ],
  southWest:[ -1, -1 ],
  west:[ -1, 0 ],
  northWest:[ -1, 1 ]
 });
var getCardinalDirectionName = (function getCardinalDirectionName$(vector) {
  /* get-cardinal-direction-name eval.sibilant:90:0 */

  const angle=vector.getAngle();
  const i=(Math.abs(Math.round((angle / eigthTurn))) % 8);
  return directionNames[i];
});
Sight.registerTileGraph(tiles);
var getTileNoise = (function getTileNoise$(x = this.x, y = this.y, force = 16, v = Vector.spawn(1, 1)) {
  /* get-tile-noise node_modules/kit/inc/core/function-expressions.sibilant:29:8 */

  v.setAngle((noise.simplex3((x / config.angleZoom / 5), (y / config.angleZoom / 5), (config.noiseZ / 10000)) * Math.PI * 2));
  const length=noise.simplex3(((x / 50) + 40000), ((x / 50) + 40000), (config.noiseZ / 10000));
  v.setLength((length * force));
  return v;
});
var getMoveNoise = (function getMoveNoise$(x = this.x, y = this.y, t = this.t, force = 16, v = Vector.spawn(1, 1)) {
  /* get-move-noise node_modules/kit/inc/core/function-expressions.sibilant:29:8 */

  v.setAngle((noise.simplex3((x / config.angleZoom / 5), (y / config.angleZoom / 5), (t * (config.noiseZ / 10000))) * Math.PI * 2));
  const length=noise.simplex3(((x / 50) + 40000), ((x / 50) + 40000), (t * (config.noiseZ / 10000)));
  v.setLength((length * force));
  return v;
});
TileNode.setup = (function TileNode$setup$(x, y) {
  /* Tile-node.setup eval.sibilant:125:0 */

  const v=getTileNoise(x, y, 256);
  const x_=(Math.abs(Math.round(v.x)) % 16);
  const y_=(Math.abs(Math.round(v.y)) % 16);
  this.entity.floorSprite.selectTile((x_ % 8), (y_ % 8));
  return v.despawn();
});
p.physicalProperties.forces = [ Friction ];
game.events.on("tick", ((t) => {
	
  (function() {
    if ((t % 10) === 0) {
      return p.playerSprite.step();
    }
  }).call(this);
  return (function() {
    if ((t % 30) === 0) {
      const noiseV=getMoveNoise(p.positionInterface.x, p.positionInterface.y, t, gameScale);
      v.addTo(noiseV);
      v.setLength(gameScale);
      noiseV.despawn();
      const directionName=getCardinalDirectionName(v);
      const direction=getCardinalDirection(v);
      p.playerSprite.selectSequence(directionName);
      return v.setAngle(direction);
    }
  }).call(this);

})).once("error", ((err) => {
	
  console.log("error on", "tick", "of", "game.events", "given", "t()");
  return console.log(err);

}));
startInterface();