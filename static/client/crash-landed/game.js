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
  Game
 } from "/shared/game.js";
import { 
  Physics
 } from "/shared/systems/physics.js";
import { 
  PlayerSprites
 } from "./systems/sprites/player.js";
import { 
  PropsSprites
 } from "./systems/sprites/basic-props.js";
import { 
  rendering
 } from "./rendering.js";
import { 
  Velocity
 } from "/shared/systems/velocity.js";
import { 
  Sight
 } from "./systems/sight.js";
import { 
  GroundTypes
 } from "./systems/floor-type.js";
import { 
  TileVisibility
 } from "./systems/visibility.js";
import { 
  PathFinding
 } from "./systems/path-finding.js";
import { 
  Metabolisim
 } from "./systems/metabolisim.js";
import { 
  Containers
 } from "./systems/containers.js";
import { 
  MentalState
 } from "./systems/mental-state.js";
import { 
  Item
 } from "./systems/item.js";
import { 
  config
 } from "./config.js";
import { 
  FloorSprites
 } from "./systems/sprites/floor.js";
import { 
  CliffSprites
 } from "./systems/sprites/cliff.js";
import { 
  Position
 } from "/shared/systems/position.js";
var activeGameSystems = [ Position, Physics, Velocity, TileVisibility, Sight, FloorSprites, CliffSprites, PlayerSprites, PropsSprites, GroundTypes, PathFinding, Metabolisim, Containers, MentalState, Item ];
var game = create(Game)(config, rendering, activeGameSystems, config.gameSpeed);
console.log({ 
  PlayerSprites,
  FloorSprites
 });
console.log("this is a game", game);
console.log("and these are it's entities", game.ent);
export { 
  game
 };
export { 
  activeGameSystems
 };