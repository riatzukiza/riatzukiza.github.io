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
  Game
 } = require("@shared/game.js"),
    { 
  Dot
 } = require("@shared/systems/rendering/dot.js"),
    { 
  Position
 } = require("@shared/systems/position.js"),
    { 
  Velocity
 } = require("@shared/systems/velocity.js"),
    { 
  Physics
 } = require("@shared/systems/physics/index.js"),
    { 
  Collision
 } = require("@shared/systems/collision.js"),
    { 
  rendering
 } = require("@obstacles/rendering.js"),
    config = require("@obstacles/config.js");
var activeGameSystems = [ Dot, Position, Physics, Velocity, Collision ];
var game = create(Game)(config, rendering, activeGameSystems, config.gameSpeed);
exports.game = game;
exports.activeGameSystems = activeGameSystems;