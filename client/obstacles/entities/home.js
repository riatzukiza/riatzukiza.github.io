var { 
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
  Component,
  System,
  EntityGroup
 } = require("@shared/ecs.js"),
    { 
  Group
 } = require("@shared/data-structures/group.js"),
    { 
  List
 } = require("@shared/data-structures/list.js"),
    { 
  Vector
 } = require("@shared/vectors.js"),
    { 
  Collision
 } = require("@shared/systems/collision.js"),
    { 
  TreeMap
 } = require("tree-kit"),
    { 
  game,
  activeGameSystems
 } = require("@obstacles/game.js"),
    config = require("@obstacles/config.js"),
    { 
  rgba
 } = require("@obstacles/colors.js"),
    { 
  Friction,
  SignalField
 } = require("@obstacles/forces.js");
var entity = (function entity$(aspects) {
  /* entity eval.sibilant:16:0 */

  return game.ent.spawn(aspects);
});
var home = entity([ Dot, Position, Physics, Collision ]);
var homePos = game.systems.get(Position, home);
console.log({ 
  game,
  home,
  homePos
 });
game.systems.get(Dot, home).color = rgba(0, 255, 0, 255);
game.systems.get(Position, home).x = config.homeLocation[0];
game.systems.get(Position, home).y = config.homeLocation[1];
game.systems.get(Position, home).z = 1;
game.systems.get(Physics, home).scale = 1;
game.systems.get(Physics, home).mass = 1;
game.systems.get(Physics, home).forces = [];
game.systems.get(Collision, home).name = "home";
home.name = "home";
exports.home = home;
exports.homePos = homePos;