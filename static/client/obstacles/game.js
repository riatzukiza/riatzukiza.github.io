Array.prototype.each = (function Array$prototype$each$(f) {
  /* Array.prototype.each inc/misc.sibilant:1:1831 */

  this.forEach(f);
  return this;
});
Object.prototype.each = (function Object$prototype$each$(f) {
  /* Object.prototype.each inc/misc.sibilant:1:1893 */

  return Object.keys(this).forEach(((k) => {
  	return f(this[k], k);
  }));
});
import '/bundles/external.js';
import { 
  mixin,
  create,
  extend
 } from "/shared/kit/core/util.js";
import { 
  Game
 } from "@shared/game.js";
import { 
  Dot
 } from "@shared/systems/rendering/dot.js";
import { 
  Sprites
 } from "@shared/systems/rendering/gl-sprites.js";
import { 
  Position
 } from "@obstacles/systems/position.js";
import { 
  Velocity
 } from "@obstacles/systems/velocity.js";
import { 
  Physics
 } from "@shared/systems/physics.js";
import { 
  Collision
 } from "@shared/systems/collision.js";
import { 
  rendering
 } from "@obstacles/rendering.js";
import { 
  ViewPanel
 } from "@obstacles/systems/property-view.js";
import { 
  AntDots
 } from "@obstacles/systems/ants/ant-dot.js";
import { 
  AntTrails
 } from "@obstacles/systems/ants/ant-trails.js";
import { 
  AntLifeTimer
 } from "@obstacles/systems/ants/ant-life-timer.js";
import { 
  TrailDots
 } from "@obstacles/systems/ants/trail-dots.js";
import { 
  AntPanel
 } from "@obstacles/systems/ants/ant-panel.js";
import { 
  TrailsPanel
 } from "@obstacles/systems/ants/trail-panel.js";
import { 
  DecayingTrails
 } from "@obstacles/systems/ants/trail-segments.js";
import { 
  AntSprites
 } from "@obstacles/systems/ant-sprites.js";
import { 
  RockSprites
 } from "@obstacles/systems/rock-sprites.js";
import { 
  config
 } from "@obstacles/config.js";
Position.wraps__QUERY = true;
var activeGameSystems = [ DecayingTrails, AntLifeTimer, Dot, TrailDots, AntDots, AntPanel, TrailsPanel, RockSprites, AntSprites, AntTrails, Physics, Velocity, Position, Collision ];
var game = create(Game)(config, rendering, activeGameSystems, config.gameSpeed);
export { 
  game
 };
export { 
  activeGameSystems
 };