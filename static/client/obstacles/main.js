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
Collision.setBounds(config.dimensions[0], config.dimensions[1], 100, 4);
game.start();
require("@obstacles/events/ant-collision.js");
require("@obstacles/events/ant-found-plant.js");
require("@obstacles/events/collision.js");
require("@obstacles/events/plant-colliding-with-spawn.js");
require("@obstacles/events/static-object-collision.js");
require("@obstacles/events/tick.js");
require("@obstacles/events/simple-collision.js");
startInterface();