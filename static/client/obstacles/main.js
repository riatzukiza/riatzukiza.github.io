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
  game,
  activeGameSystems
 } from "./game.js";
import { 
  Collision
 } from "@shared/systems/collision.js";
import { 
  config
 } from "@obstacles/config.js";
import { 
  entities
 } from "@obstacles/entities.js";
import { 
  startInterface
 } from "@obstacles/dom.js";
Collision.setBounds(config.dimensions[0], config.dimensions[1], 500, 1000);
game.start();
import "@obstacles/events/ant-collision.js";
import "@obstacles/events/ant-found-plant.js";
import "@obstacles/events/collision.js";
import "@obstacles/events/plant-colliding-with-spawn.js";
import "@obstacles/events/static-object-collision.js";
import "@obstacles/events/tick.js";
import "./events/simple-collision.js";
startInterface();