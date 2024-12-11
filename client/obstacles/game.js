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
 } = require("@obstacles/systems/position.js"),
    { 
  Velocity
 } = require("@obstacles/systems/velocity.js"),
    { 
  Physics
 } = require("@shared/systems/physics/index.js"),
    { 
  Collision
 } = require("@shared/systems/collision.js"),
    { 
  rendering
 } = require("@obstacles/rendering.js"),
    { 
  ViewPanel
 } = require("@obstacles/systems/property-view.js"),
    { 
  AntDots
 } = require("@obstacles/systems/ants/ant-dot.js"),
    { 
  AntTrails
 } = require("@obstacles/systems/ants/ant-trails.js"),
    { 
  AntLifeTimer
 } = require("@obstacles/systems/ants/ant-life-timer.js"),
    { 
  TrailDots
 } = require("@obstacles/systems/ants/trail-dots.js"),
    { 
  DecayingTrails
 } = require("@obstacles/systems/ants/trail-segments.js"),
    config = require("@obstacles/config.js");
var activeGameSystems = [ AntTrails, DecayingTrails, AntLifeTimer, Physics, Velocity, Collision, Position, Dot, TrailDots, AntDots, ViewPanel ];
var game = create(Game)(config, rendering, activeGameSystems, config.gameSpeed);
exports.game = game;
exports.activeGameSystems = activeGameSystems;