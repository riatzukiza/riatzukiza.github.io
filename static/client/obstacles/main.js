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
global.mixin = mixin;
global.create = create;
var { 
  game,
  activeGameSystems
 } = require("@obstacles/game.js");
var { 
  Collision
 } = require("@shared/systems/collision.js"),
    config = require("@obstacles/config.js"),
    entities = require("@obstacles/entities.js"),
    { 
  startInterface
 } = require("@obstacles/dom.js");
Collision.setBounds(config.dimensions[0], config.dimensions[1], 500, 1000);
game.start();
require("@obstacles/events/ant-collision.js");
require("@obstacles/events/ant-found-plant.js");
require("@obstacles/events/collision.js");
require("@obstacles/events/plant-colliding-with-spawn.js");
require("@obstacles/events/static-object-collision.js");
require("@obstacles/events/tick.js");
require("@obstacles/events/simple-collision.js");
startInterface();