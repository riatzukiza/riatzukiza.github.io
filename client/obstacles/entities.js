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
  List
 } = require("sibilant-game-engine/client/data-structures/list");
List.rotateUntil = (function List$rotateUntil$(predicate = this.predicate, t = 0) {
  /* List.rotate-until node_modules/kit/inc/core/function-expressions.sibilant:29:8 */

  return (function() {
    if (predicate(this.head.item)) {
      return this.head.item;
    } else if (t > (this.size - 1)) {
      return this.rotate().rotateUntil(predicate, ++(t));
    } else {
      return false;
    }
  }).call(this);
});
var { 
  Dot
 } = require("sibilant-game-engine/client/systems/rendering/dot"),
    { 
  Position
 } = require("sibilant-game-engine/client/systems/position"),
    { 
  Velocity
 } = require("sibilant-game-engine/client/systems/velocity"),
    { 
  Physics
 } = require("sibilant-game-engine/client/systems/physics"),
    { 
  Component,
  System,
  EntityGroup
 } = require("./ecs"),
    { 
  Group
 } = require("sibilant-game-engine/client/data-structures/group"),
    { 
  List
 } = require("sibilant-game-engine/client/data-structures/list"),
    { 
  game,
  activeGameSystems
 } = require("./game"),
    { 
  Collision
 } = require("./collision"),
    { 
  SignalField
 } = require("./forces/signal-field"),
    { 
  Friction
 } = require("./forces/friction"),
    { 
  TreeMap
 } = require("tree-kit"),
    config = require("./config");
var clear = (function() {
  /* eval.sibilant:35:11 */

  return arguments[0].clear();
});
TreeMap.get = (function TreeMap$get$(...args) {
  /* Tree-map.get eval.sibilant:41:0 */

  return this.find(...args).value;
});
var memoize = (function memoize$(f) {
  /* memoize eval.sibilant:44:0 */

  var cache = create(TreeMap)();
  return ((...args) => {
  	
    return (function() {
      if (cache.has(args)) {
        return cache.get(args);
      } else {
        return (function(value) {
          /* node_modules/kit/inc/scope.sibilant:12:9 */
        
          cache.set(args, value);
          return value;
        })((function() {
          /* node_modules/kit/inc/macros.sibilant:30:25 */
        
          return f(...args);
        }).call(this));
      }
    }).call(this);
  
  });
});
var rgba = memoize(((r, g, b, a) => {
	
  return { 
    r,
    g,
    b,
    a
   };

}));
var entity = (function entity$(aspects) {
  /* entity eval.sibilant:51:0 */

  return game.ent.spawn(aspects);
});
var home = entity([ Dot, Position, Physics, Collision ]);
var homePos = game.systems.get(Position, home);
game.systems.get(Dot, home).color = rgba(0, 255, 0, 255);
game.systems.get(Position, home).x = config.homeLocation[0];
game.systems.get(Position, home).y = config.homeLocation[1];
game.systems.get(Position, home).z = 1;
game.systems.get(Physics, home).scale = 1;
game.systems.get(Physics, home).mass = 1;
game.systems.get(Physics, home).forces = [];
game.systems.get(Collision, home).name = "home";
home.name = "home";
const ants=create(EntityGroup)("Ants", activeGameSystems, game.ent);
var spawnAnt = (function spawnAnt$(x_y$1, home, startingLife) {
  /* spawn-ant eval.sibilant:81:0 */

  var x = x_y$1[0],
      y = x_y$1[1];

  var ant = ants.spawn(activeGameSystems);
  game.systems.get(Dot, ant).color = rgba(255, 0, 0, 255);
  game.systems.get(Position, ant).x = x;
  game.systems.get(Position, ant).y = y;
  game.systems.get(Position, ant).z = 0;
  game.systems.get(Physics, ant).scale = 1;
  game.systems.get(Physics, ant).mass = 1;
  game.systems.get(Physics, ant).forces = [ SignalField, Friction ];
  var v = game.systems.get(Velocity, ant);
  (function() {
    if (!(config.spawnStatic === 0)) {
      return v.accelerate([ ((Math.random() * config.spawnStatic) * (function() {
        if (Math.random() <= 0.5) {
          return -1;
        } else {
          return 1;
        }
      }).call(this)), ((Math.random() * config.spawnStatic) * (function() {
        if (Math.random() <= 0.5) {
          return -1;
        } else {
          return 1;
        }
      }).call(this)) ]);
    }
  }).call(this);
  return ant;
});
const rocks=create(EntityGroup)("Rocks", [ Dot, Position, Physics, Collision, Velocity ], game.ent);
var spawnRock = (function spawnRock$(x_y$2, mass, scale) {
  /* spawn-rock eval.sibilant:113:0 */

  var x = x_y$2[0],
      y = x_y$2[1];

  var rock = rocks.spawn([ Dot, Position, Physics, Collision, Velocity ]);
  var hardness = Math.min(Math.round((0.01 * (mass / scale))), 255);
  game.systems.get(Dot, rock).color = rgba((hardness + 30), (hardness + 30), (hardness + 30), 255);
  game.systems.get(Physics, rock).mass = mass;
  game.systems.get(Physics, rock).scale = scale;
  game.systems.get(Physics, rock).forces = [ Friction ];
  game.systems.get(Position, rock).x = x;
  return game.systems.get(Position, rock).y = y;
});
const plants=create(EntityGroup)("Plants", [ Dot, Position, Physics, Collision, Velocity ], game.ent);
var spawnPlant = (function spawnPlant$(x_y$3, mass) {
  /* spawn-plant eval.sibilant:138:0 */

  var x = x_y$3[0],
      y = x_y$3[1];

  var plant = plants.spawn([ Dot, Position, Physics, Collision, Velocity ]);
  var hardness = Math.min(Math.round((0.1 * mass)), 255);
  game.systems.get(Dot, plant).color = rgba((hardness + 30), 255, (hardness + 30), 255);
  game.systems.get(Physics, plant).mass = mass;
  game.systems.get(Physics, plant).scale = mass;
  game.systems.get(Physics, plant).forces = [ Friction ];
  game.systems.get(Position, plant).x = x;
  return game.systems.get(Position, plant).y = y;
});
var number = 1;
var nextSpawn = (() => {
	
  return (function() {
    if (!(ants.group.size >= config.antLimit)) {
      spawnAnt([ homePos.x, homePos.y ], home);
      return setTimeout(nextSpawn, (1000 / config.spawnRate));
    }
  }).call(this);

});
exports.nextSpawn = nextSpawn;
var clearAnts = (function clearAnts$() {
  /* clear-ants eval.sibilant:160:0 */

  return ants.clear();
});
exports.spawnRock = spawnRock;
exports.spawnPlant = spawnPlant;
exports.spawnAnt = spawnAnt;
exports.ants = ants;
exports.plants = plants;
exports.rocks = rocks;
exports.home = home;
exports.homePos = homePos;
exports.clearAnts = clearAnts;