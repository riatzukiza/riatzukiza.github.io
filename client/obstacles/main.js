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
  Collision
 } = require("@shared/systems/collision.js"),
    config = require("@obstacles/config.js"),
    settings = require("@obstacles/settings.js"),
    entities = require("@obstacles/entities.js"),
    { 
  stage,
  container
 } = require("@obstacles/dom.js");
var { 
  game,
  activeGameSystems
 } = require("@obstacles/game.js");
Collision.setBounds(config.dimensions[0], config.dimensions[1], 10, 3);
game.start();
require("@obstacles/events/ant-collision.js");
require("@obstacles/events/ant-found-plant.js");
require("@obstacles/events/collision.js");
require("@obstacles/events/plant-colliding-with-spawn.js");
require("@obstacles/events/static-object-collision.js");
require("@obstacles/events/tick.js");
require("@obstacles/events/simple-collision.js");