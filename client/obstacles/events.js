var { 
  game
 } = require("./game"),
    { 
  Physics
 } = require("sibilant-game-engine/client/systems/physics"),
    { 
  Velocity
 } = require("sibilant-game-engine/client/systems/velocity"),
    { 
  Collision
 } = require("./collision"),
    { 
  spawnAnt,
  home,
  homePos,
  ants,
  plants
 } = require("./entities"),
    { 
  createParticleUpdater
 } = require("@shared/field.js"),
    { 
  SignalField
 } = require("./forces/signal-field"),
    config = require("./config");
const updateParticle=createParticleUpdater(config, game);
var isCollision = false;
var isWin = false;
var isLoose = false;
var getVelocity = (function getVelocity$(entity) {
  /* get-velocity eval.sibilant:22:0 */

  return game.systems.get(Velocity, entity);
});
var applyStatic = (function applyStatic$(c) {
  /* apply-static eval.sibilant:23:0 */

  return (function() {
    if (!(config.collisionStatic === 0)) {
      return getVelocity(c.entity).accelerate([ ((Math.random() * config.collisionStatic) * (function() {
        if (Math.random() <= 0.5) {
          return -1;
        } else {
          return 1;
        }
      }).call(this)), ((Math.random() * config.collisionStatic) * (function() {
        if (Math.random() <= 0.5) {
          return -1;
        } else {
          return 1;
        }
      }).call(this)) ]);
    }
  }).call(this);
});
var signalFood = (function signalFood$(v) {
  /* signal-food eval.sibilant:27:0 */

  updateParticle(c_v, c_v.pos, SignalField.field, SignalField.layer, game.ticker.ticks, true, true, homePos);
  c_v.pos.x = homePos.x;
  c_v.pos.y = homePos.y;
  return null;
});
game.events.on("tick", (() => {
	
  (function() {
    if (!(ants.group.size >= config.antLimit)) {
      return spawnAnt([ homePos.x, homePos.y ], home);
    }
  }).call(this);
  ants.group.each(((ant) => {
  	
    var v = game.systems.get(Velocity, c.entity);
    updateParticle(v, v.pos, SignalField.field, SignalField.layer, game.ticker.ticks, true, false, homePos);
    return null;
  
  }));
  return plants.group.each(((plant) => {
  	
    var physics = game.systems.get(Physics, plant);
    (function() {
      if (0 >= physics.mass) {
        return plants.despawn(plant);
      } else {
        physics.mass = (physics.mass + config.growthRate);
        physics.scale = (physics.scale + config.growthRate);
        return (function() {
          if (physics.mass > config.plantMassLimit) {
            physics.mass = (physics.mass / 2);
            return spawnPlant([ (((Math.random() * physics.mass) * (function() {
              if (Math.random() <= 0.5) {
                return -1;
              } else {
                return 1;
              }
            }).call(this)) + physics.position.x), (((Math.random() * physics.mass) * (function() {
              if (Math.random() <= 0.5) {
                return -1;
              } else {
                return 1;
              }
            }).call(this)) + physics.position.y) ], physics.mass);
          }
        }).call(this);
      }
    }).call(this);
    return null;
  
  }));

})).once("error", ((err) => {
	
  console.log("error on", "tick", "of", "game.events", "given", "null");
  return console.log(err);

}));
game.events.on("loose", (() => {
	
  return isLoose = true;

})).once("error", ((err) => {
	
  console.log("error on", "loose", "of", "game.events", "given", "null");
  return console.log(err);

}));
game.events.on("collision", (([ c, c_, d ]) => {
	
  var v = game.systems.get(Velocity, c.entity);
  var v_ = game.systems.get(Velocity, c_.entity);
  var p = game.systems.get(Physics, c.entity);
  var p_ = game.systems.get(Physics, c_.entity);
  (function() {
    if ((v && v_ && p && p_)) {
      return game.events.emit("simpleCollision", [ c_, c ]);
    }
  }).call(this);
  (function() {
    if (config.printCollisionEvent) {
      return console.log("collision event", c, c_, d, Collision.quads, { 
        home,
        homePos
       });
    }
  }).call(this);
  (function() {
    if ((c.entity === home && plants.has(c_.entity))) {
      return game.events.emit("plantCollidingWithSpawn", [ c, c_ ]);
    }
  }).call(this);
  (function() {
    if ((c_.entity === home && plants.has(c.entity))) {
      return game.events.emit("plantCollidingWithSpawn", [ c_, c ]);
    }
  }).call(this);
  (function() {
    if ((ants.has(c_.entity) && plants.has(c.entity))) {
      return game.events.emit("antFoundPlant", [ c_, c ]);
    }
  }).call(this);
  (function() {
    if ((ants.has(c.entity) && plants.has(c_.entity))) {
      return game.events.emit("antFoundPlant", [ c, c_ ]);
    }
  }).call(this);
  (function() {
    if ((ants.has(c.entity) && ants.has(c_.entity))) {
      return game.events.emit("antCollision", [ c, c_ ]);
    }
  }).call(this);
  var m = p.mass;
  var m_ = p_.mass;
  c_.colliding = false;
  return c.colliding = false;

})).once("error", ((err) => {
	
  console.log("error on", "collision", "of", "game.events", "given", "[ c, c_, d ]()");
  return console.log(err);

}));
game.events.on("plantCollidingWithSpawn", (([ home, plant ]) => {
	
  return applyStatic(plant);

})).once("error", ((err) => {
	
  console.log("error on", "plantCollidingWithSpawn", "of", "game.events", "given", "[ home, plant ]()");
  return console.log(err);

}));
game.events.on("antCollision", (([ c, c_ ]) => {
	
  var v = game.systems.get(Velocity, c.entity);
  var v_ = game.systems.get(Velocity, c_.entity);
  var p = game.systems.get(Physics, c.entity);
  var p_ = game.systems.get(Physics, c_.entity);
  applyStatic(c);
  applyStatic(c_);
  updateParticle(v, v.pos, SignalField.field, SignalField.layer, game.ticker.ticks, false, false, homePos);
  return updateParticle(v_, v_.pos, SignalField.field, SignalField.layer, game.ticker.ticks, false, false, homePos);

})).once("error", ((err) => {
	
  console.log("error on", "antCollision", "of", "game.events", "given", "[ c, c_ ]()");
  return console.log(err);

}));
game.events.on("antFoundPlant", (([ ant, plant ]) => {
	
  var av = game.systems.get(Velocity, ant.entity);
  isWin = true;
  updateParticle(av, av.pos, SignalField.field, SignalField.layer, game.ticker.ticks, true, true, homePos);
  var pp = game.systems.get(Physics, plant.entity);
  pp.mass = Math.max((pp.mass - 1), 0);
  av.pos.x = homePos.x;
  av.pos.y = homePos.y;
  return null;

})).once("error", ((err) => {
	
  console.log("error on", "antFoundPlant", "of", "game.events", "given", "[ ant, plant ]()");
  return console.log(err);

}));
game.events.on("simpleCollision", (([ c, c_ ]) => {
	
  var v = game.systems.get(Velocity, c.entity);
  var v_ = game.systems.get(Velocity, c_.entity);
  var p = game.systems.get(Physics, c.entity);
  var p_ = game.systems.get(Physics, c_.entity);
  var m = p.mass;
  var m_ = p_.mass;
  v.xd = (((v.xd * (m - m_)) + (2 * m_ * v_.xd)) / (m + m_));
  v.yd = (((v.yd * (m - m_)) + (2 * m * m_)) / (m + m_));
  v_.xd = (((v_.xd * (m_ - m)) + (2 * m * v.xd)) / (m_ + m));
  v_.yd = (((v_.yd * (m_ - m)) + (2 * m * v.yd)) / (m_ + m));
  return null;

})).once("error", ((err) => {
	
  console.log("error on", "simpleCollision", "of", "game.events", "given", "[ c, c_ ]()");
  return console.log(err);

}));